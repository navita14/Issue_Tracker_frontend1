from flask import Flask, request, jsonify, session
from flask_migrate import Migrate
from models import *
from flask_cors import CORS
# from flask_restful import Api, Resource
import os
# from flask_login import LoginManager
from flask_login import login_required, current_user



BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "App_jfwehjkfbwj"
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)

excluded_endpoints = ['login', 'signup', 'check_session', 'root']



# @app.route('/dashboard')
# @login_required
# def dashboard():
#     permission_level = current_user.permission_level
#     return jsonify({'permission_level': permission_level})


# @app.before_request
# def check_logged_in():
#     # import pdb
#     # pdb.set_trace()
#     if request.endpoint not in excluded_endpoints:
#         user_id = session.get('user_id')
#         user = User.query.filter(User.id == user_id).first()

#         # print(user_id)
#         # print(user)

#         if not user:
#             # invalid cookie
#             return {'message': 'invalid session'}, 401
        

@app.route('/checksession', methods=['GET'])
def check_sesh():
    user_id = session.get('user_id')
    user = User.query.filter(User.id == user_id).first()
    print(user_id)
    print(user)
    if not user:
        # invalid cookie
        return {'message': 'invalid session'}, 401
    else:
        return user.to_dict(), 200


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    new_user = User(username=data['username'])
    new_user.password_hash = data['_password_hash']
    new_user.email_address = data['email_address']
    new_user.full_name = data['full_name']
    db.session.add(new_user)
    db.session.commit()
    return {'message': 'user added'}, 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # check if user exists
    user = User.query.filter(User.username == data['username']).first()

    if not user:
        return {'message': 'user not found'}, 404
    
    if user.authenticate(data['_password_hash']):
        # passwords matched, add cookie
        session['user_id'] = user.id
        print(session["user_id"])
        
        # Create a response object
        response = jsonify({'message': 'login success'})
        response.set_cookie('user_id', str(user.id), httponly=True, secure=False)
        
        return user.to_dict(), 201
    else:
        # password did not match, send error resp
        return {'message': 'login failed'}, 401

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()

#     # check if user exists
#     user = User.query.filter(User.username == data['username']).first()

#     if not user:
#         return {'message': 'user not found'}, 404
    
#     if user.authenticate(data['_password_hash']):
#         # passwords matched, add cookie
#         session['user_id'] = user.id
#         print(session["user_id"])
#         return {'message': 'login success'}, 201
#     else:
#         # password did not match, send error resp
#         return {'message': 'login failed'}, 401
    

# @app.route('/check_session')
# def check_session():
#     user_id = session.get('user_id')
#     user = User.query.filter(User.id == user_id).first()

#     if not user:
#         # invalid cookie
#         return {'message': 'invalid session'}, 401
    
#     # valid cookie
#     return {'message': 'valid session'}, 200

@app.route('/logout', methods=['DELETE'])
def logout():
    # delete cookie
    session.pop('user_id')
    return {'message': 'logged out'}, 200


@app.route('/tickets', methods=['GET', 'POST'])
def all_tickets():
    if request.method == 'GET':
        tickets = Ticket.query.all()
        body = [ticket.to_dict() for ticket in tickets]
        return body, 200
    elif request.method == 'POST':
        ticket_data = request.get_json()

        if 'title' not in ticket_data:
            return {'message': "title is required"}, 403
        
        try:
            new_ticket = Ticket(
                title = ticket_data.get('title'), 
                description = ticket_data.get('description'), 
                priority = ticket_data.get('priority'),
                name = ticket_data.get('name'),
                duedate = ticket_data.get('duedate')
            )
        except ValueError as e:
            return {'errors': [str(e)]}, 400

        db.session.add(new_ticket)
        db.session.commit()
        return new_ticket.to_dict(), 201


@app.route('/tickets/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def tickets_by_id(id):
    ticket = Ticket.query.filter(Ticket.id == id).first()

    if not ticket:
        return {'error': 'Ticket not found'}, 404
    
    if request.method == 'GET':
        return ticket.to_dict(), 200
    
    if request.method == 'PATCH':
        ticket_data = request.get_json()
        for field in ticket_data:
            try:
                setattr(ticket, field, ticket_data[field])
            except ValueError as e:
                return {'errors': [str(e)]}, 400
            
        db.session.add(ticket)
        db.session.commit()
        return ticket.to_dict(), 202

    if request.method == 'DELETE':
        db.session.delete(ticket)
        db.session.commit()
        return {}, 204

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    body = [user.to_dict() for user in users]
    return body, 200


@app.route('/users/<int:id>', methods=['GET'])
def get_user_id(id):
    user = User.query.filter(User.id == id).first()

    if not user:
        return {'error': 'User not found'}, 404
    return user.to_dict(), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)