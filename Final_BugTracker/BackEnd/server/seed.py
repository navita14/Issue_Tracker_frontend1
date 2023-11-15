from faker import Faker
from models import db, User, Ticket, bcrypt
from app import app

fake = Faker()

# Function to create fake users with different permission levels
def create_fake_users(num_users=5):
    users = []
    for _ in range(num_users):
        user = User(
            email_address=fake.email(),
            username=fake.user_name(),
            full_name=fake.name(),
            password_hash='123',
            permission_level=fake.random_int(min=1, max=3)  # Adjust the range as needed
        )
        users.append(user)
    return users

# Function to create fake tickets
def create_fake_tickets(users, num_tickets=10):
    tickets = []
    for _ in range(num_tickets):
        ticket = Ticket(
            title=fake.sentence(),
            description=fake.paragraph(),
            priority=fake.random_element(elements=('High', 'Medium', 'Low')),
            name=fake.name(),
            duedate=fake.date_this_decade(),
            status=fake.random_element(elements=('Open', 'Closed', 'In Progress')),
            user=fake.random_element(elements=users)
        )
        tickets.append(ticket)
    return tickets


if __name__ == '__main__':

    with app.app_context():
        User.query.delete()
        Ticket.query.delete()
        fake_users = create_fake_users()
        fake_tickets = create_fake_tickets(fake_users)

        # Add users and tickets to the database
        db.session.add_all(fake_users)
        db.session.add_all(fake_tickets)
        db.session.commit()