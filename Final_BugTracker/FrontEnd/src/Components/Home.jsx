import { useEffect, useState } from "react";
import Navbar from "./Navbar";
// import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Ticket from './singleComponents/Ticket'

export default function Home({user, setUser}) {
  const [userTicks, setUserTicks] = useState([])
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    console.log(user);
    if (user && user.tickets) {
      setUserTicks(user?.tickets)
    }
    else {
      const userIdNum = localStorage.getItem('user')
      setUserId(userIdNum)
      fetch(`http://127.0.0.1:5000/users/${userIdNum}`)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data)
        setUserTicks(data?.tickets)
      })
    }
    console.log(userTicks)
  },[userTicks])

  return (
    <div>
      <Navbar setUser={setUser} />
      <h3>Hello {user?.full_name} {userId} </h3>
    {user && userTicks && <Ticket userTicks={userTicks}/>}
    </div>
  );
}


Home.propTypes = {
    user: PropTypes.string.isRequired,
    setUser: PropTypes.string.isRequired
  };