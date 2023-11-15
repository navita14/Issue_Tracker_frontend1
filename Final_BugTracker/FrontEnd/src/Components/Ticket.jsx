import Navbar from './Navbar'
import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';



export default function Ticket({loggedInUserId}) {
  const [ticks, setTickets] = useState([])
  // const location = useLocation();
  // const username = location.state && location.state.username;
  // const [loggedInUsersId, setLoggedInUsersId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tickets")
    .then(res => res.json())
    .then(data => {
      setTickets(data)
    })
    .catch((error) => {
      console.error('Error fetching tickets:', error);
    });
    // Fetch the logged-in user's information and store their ID
  //   fetch('http://127.0.0.1:5000/users')
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       // Assuming you can identify the logged-in user based on their username
  //       const loggedInUser = data.find((user) => user.username === username);
  //       if (loggedInUser) {
  //         setLoggedInUsersId(loggedInUser.id);
  //         console.log(`Logged in user: ${username}, user_id: ${loggedInUser.id}, Is logged in`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching users:', error);
  //     });
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    // Create a new ticket object
    const newTicket = {
      'title': event.target.title.value,
      'description': event.target.description.value,
      'priority': event.target.priority.value,
      'name': event.target.name.value,
      'duedate': event.target.duedate.value,
      'user_id': loggedInUserId
    };


    // Save the updated data back to the JSON file
    await fetch('http://127.0.0.1:5000/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTickets((prevTicks) => [...prevTicks, data]);
      })
      .catch((error) => {
        console.error('Error during fetch:', error.message);
      });
  }
  return (
    <div>
      <Navbar loggedInUserId={loggedInUserId}/>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <h1 className="card-header text-center">New Ticket</h1>
              <div className="card-body">
                <form onSubmit={handleSubmit} action="submit_ticket.php">
                  {/* Update the action attribute to specify where the request will be sent */}
                  <div className="form-group">
                    <label htmlFor="title">Ticket Title:</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select
                      name="priority"
                      className="form-control"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="assignee">Name:</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duedate">Due Date:</label>
                    <input
                      type="date"
                      name="duedate"
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit Ticket
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-header text-center">
        <p>Total Tickets Submitted: {ticks.length}</p>
      </div>
    </div>
  );
}

Ticket.propTypes = {
  loggedInUserId: PropTypes.string.isRequired,
};
