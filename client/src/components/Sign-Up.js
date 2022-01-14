import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import { emailValidate } from '../static/scripts/Utilities';

const SignUp = ({ loggedIn }) => {
  const [accountFirstName, setAccountFirstName] = useState('');
  const [accountLastName, setAccountLastName] = useState('');
  const [accountUsername, setAccountUsername] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [alertText, setAlertText] = useState('');
  const [alertStyle, setAlertStyle] = useState();

  const fadeOutAlert = (background, border) => {
    setAlertStyle({
      display: 'flex',
      opacity: '1',
      backgroundColor: background,
      borderColor: border,
    });

    setTimeout(() => {
      setAlertStyle({
        display: 'flex',
        opacity: '0',
        backgroundColor: background,
        borderColor: border,
        transition: 'opacity .75s linear',
      });
    }, 750);

    setTimeout(() => {
      setAlertStyle({
        display: 'none',
      });
    }, 1500);
  };

  const accountSignUp = async (e) => {
    // set conditions if inputs are empty

    e.preventDefault();
    axios
      .post('http://localhost:8000/api/account/create', {
        username: accountUsername.toLowerCase(),
        password: accountPassword,
        firstName: accountFirstName,
        lastName: accountLastName,
        email: accountEmail.toLowerCase(),
        signUpDate: new Date().toLocaleDateString(),
      })
      .then((res) => {
        setAlertText('Account Created!');
        fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green');

        // Alert 'Account Created!'
        // Redirect to home logged in
      })
      .catch((err) => {
        setAlertText(err.response.data.error);
        fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');

        console.error(err.response.data.error);
      });
  };

  return loggedIn ? (
    (window.location.href = '/')
  ) : (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h1>Create Account</h1>
          <span id='calc-alert' style={alertStyle}>
            {alertText}
          </span>
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
