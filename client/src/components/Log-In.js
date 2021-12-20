import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

const appLogin = async (creds) => {
  return fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  })
    .then((data) => data.json())
    .then(console.log(creds));
};

const LogIn = ({ loggedIn, setToken }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = async (e) => {
    e.preventDefault();

    const token = await appLogin({
      username,
      password,
    });

    setToken(token);

    console.log('login test');
    console.log(token);

    // button onSubmit
    // if (username/password match) }
    // window.location.href = '/';}
    // else {'wrong password@@@'}
  };

  return loggedIn ? (
    (window.location.href = '/')
  ) : (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h1>Log In</h1>
          <form onSubmit={loginSubmit}>
            <input
              type='text'
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
            <input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <br />
            <button className='' type='submit'>
              Log In
            </button>
          </form>
        </div>
      </div>
      <div className='log-sign-footer'>
        <a href='/account-recovery'>Forgot Password?</a>
        <Link to='/signup'>Sign Up!</Link>
        <Link to='/privacy-policy'>Privacy Policy</Link>
      </div>

      <Footer />
    </div>
  );
};

LogIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LogIn;
