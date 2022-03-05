import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogFooter from '../components/Log-footer';
import axios from 'axios';

const SignUp = ({ checkToken }) => {
  const [accountFirstName, setAccountFirstName] = useState('');
  const [accountLastName, setAccountLastName] = useState('');
  const [accountUsername, setAccountUsername] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [recoveryPrompt, setRecoveryPrompt] = useState('');
  const [accountRecovery, setAccountRecovery] = useState('');
  const [alertText, setAlertText] = useState('');
  const [alertStyle, setAlertStyle] = useState();

  // Pop up alert for forms/input elements
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

  // Calls api to authenticate account data and creates account
  const accountSignUp = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/account/create', {
        username: accountUsername.toLowerCase(),
        password: accountPassword,
        firstName: accountFirstName,
        lastName: accountLastName,
        email: accountEmail.toLowerCase(),
        recoveryQuestion: recoveryPrompt,
        recoveryAnswer: accountRecovery.toLowerCase(),
        signUpDate: new Date().toLocaleDateString(),
      })
      .then((res) => {
        setAlertText('Account Created!');
        fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green');

        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
      })
      .catch((err) => {
        setAlertText(err.response.data.error);
        fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
      });
  };

  useEffect(() => {
    document.title = 'ge.teller - Sign Up';
  }, []);

  return checkToken ? (
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
                spellCheck='false'
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

            <select
              id='email-input'
              onChange={(e) => {
                setRecoveryPrompt(e.target.value);
              }}
            >
              <option disabled selected>
                Select Recovery Question
              </option>
              <option value="What is your mother's maiden name?">
                What is your mother's maiden name?
              </option>
              <option value='What is the name of your first pet?'>
                What is the name of your first pet?
              </option>
              <option value='What elementary school did you attend?'>
                What elementary school did you attend?
              </option>
              <option value='What is the name of the town where you were born?'>
                What is the name of the town where you were born?
              </option>
              <option value='What was your favorite class in school?'>
                What was your favorite class in school?
              </option>
              <option value='What was your favorite food as a child?'>
                What was your favorite food as a child?
              </option>
              <option value='What was the name of your first pet?'>
                What was the name of your first pet?
              </option>
            </select>
            <input
              id='email-input'
              type='text'
              placeholder='Recovery Answer'
              onChange={(e) => {
                setAccountRecovery(e.target.value);
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

      <LogFooter />
    </div>
  );
};

export default SignUp;
