
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Logout({setUser}){
    const history = useNavigate();

    function logOut() {
        setUser(null)
        history('/login')
    }

    return(
        <>
        <NavLink>
            <h1 onClick={() => logOut()}>Logout</h1>
        </NavLink>
        </>
    )
}


Logout.propTypes = {
    setUser: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
  };