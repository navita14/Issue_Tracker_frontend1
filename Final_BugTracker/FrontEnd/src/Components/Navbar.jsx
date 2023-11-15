import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import Logout from "./Logout";

export default function Navbar({setUser}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="justify-content-end collapse navbar-collapse"
          id="navbar"
        >

          <div className="navbar-nav">  
            <NavLink className="nav-item nav-link" to="/home">
              Dashboard 
            </NavLink>
            <NavLink className="nav-item nav-link" exact to="/ticket">
              Ticket
            </NavLink>
            {/* <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink> */}
            {/* <NavLink className="nav-item nav-link" to="/signup">
              Sign Up
            </NavLink> */}
         <Logout setUser={setUser} />
          </div>
        </div>
      </nav>


    );
}

Navbar.propTypes = {
  username: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};
