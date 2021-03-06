import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavbarRight = ({ checkToken }) => {
  const [accountUsername, setAccountUsername] = useState('');

  // Gets account info from server by account
  const accountInfoCall = async () => {
    if (checkToken === false) {
    } else {
      axios
        .post(`http://localhost:8000/api/account/search/`, {
          token: localStorage.getItem('token'),
        })
        .then(({ data }) => {
          setAccountUsername(data.username);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    accountInfoCall();
  }, []);

  return checkToken ? (
    <div id='navbar-right'>
      <Link to='/account'>
        <i className='fas fa-user-circle fa-2x' />
      </Link>
      <Link to='/account' id='account-name-link'>
        {accountUsername}
      </Link>
    </div>
  ) : (
    <div id='navbar-right'>
      <Link to='/login' className='log-in log-btn'>
        Log In
      </Link>
      <Link to='/signup' className='sign-up log-btn'>
        Sign Up
      </Link>
    </div>
  );
};

export default NavbarRight;
