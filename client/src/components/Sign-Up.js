import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

const SignUp = ({ loggedIn }) => {
  const [accountFirstName, setAccountFirstName] = useState('');
  const [accountLastName, setAccountLastName] = useState('');
  const [accountUsername, setAccountUsername] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [accountEmail, setAccountEmail] = useState('');

  const accountSignUp = async (e) => {
    // set conditions if inputs are empty
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/account', {
        username: accountUsername,
        password: accountPassword,
        firstName: accountFirstName,
        lastName: accountLastName,
        email: accountEmail,
        signUpDate: new Date().toLocaleDateString(),
      })
      .then((res) => {
        console.log('Account created!');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return loggedIn ? (
    (window.location.href = '/')
  ) : (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h1>Create Account</h1>
          <form>
            <div className='form-input-div'>
              <input
                type='text'
                placeholder='First Name'
                onChange={(e) => {
                  setAccountFirstName(e.target.value);
                }}
                required
              />
              <input
                type='text'
                placeholder='Last Name'
                onChange={(e) => {
                  setAccountLastName(e.target.value);
                }}
                required
              />
            </div>

            <div className='form-input-div'>
              <input
                type='text'
                placeholder='Username'
                onChange={(e) => {
                  setAccountUsername(e.target.value);
                }}
                required
              />
              <input
                type='password'
                placeholder='Password'
                onChange={(e) => {
                  setAccountPassword(e.target.value);
                }}
                required
              />
            </div>

            <input
              id='email-input'
              type='email'
              placeholder='E-Mail'
              onChange={(e) => {
                setAccountEmail(e.target.value);
              }}
              required
            />
            <br />
            <button className='' type='submit' onClick={accountSignUp}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className='log-sign-footer'>
        <a href='/account-recovery'>Forgot Password?</a>
        <Link to='/login'>Log In</Link>
        <Link to='/privacy-policy'>Privacy Policy</Link>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
