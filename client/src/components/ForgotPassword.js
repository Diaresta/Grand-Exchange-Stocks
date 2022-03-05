import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogFooter from '../components/Log-footer';

const ForgotPassword = ({ checkToken }) => {
  const [emailSearch, setEmailSearch] = useState('');
  const [AD, setAD] = useState('');
  const [recoveryAnswer, setRecoveryAnswer] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passAlertText, setPassAlertText] = useState('');
  const [alertStyle, setAlertStyle] = useState({});

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

  // Searches for account by email and returns data
  const accountEmailSearch = (e) => {
    e.preventDefault();

    return axios
      .get(`http://localhost:8000/api/account/email/search/${emailSearch}`)
      .then(({ data }) => {
        setAD(data);
      })
      .catch((err) => {
        console.error(err);
        fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
        setPassAlertText('Email Not Found');
      });
  };

  // Checks if given recovery answer matches the answer in db
  const recoveryAnswerCheck = (e) => {
    e.preventDefault();
    if (AD.recoveryAnswer === recoveryAnswer) {
      console.log(recoveryAnswer, AD.recoveryAnswer);
    } else {
      fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
      setPassAlertText('Wrong Recovery Answer');
    }
  };

  // Searches for account by id and updates email
  const updatePassword = (e, newPass, confirmPass) => {
    e.preventDefault();
    if (newPass === confirmPass) {
      axios
        .post(`http://localhost:8000/api/account/password/recover`, {
          newPassword: newPass,
          accountID: AD._id,
        })
        .then((res) => {
          if (res.data.success === false) {
            fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
            setPassAlertText(res.data.text);
          } else if (res.data.success === true) {
            fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green');
            setPassAlertText(res.data.text);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    document.title = 'ge.teller - Forgot Password';
  }, []);

  return checkToken ? (
    (window.location.href = '/')
  ) : (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h1>Forgot Password?</h1>
          <span id='calc-alert' style={alertStyle}>
            {passAlertText}
          </span>
          <form id='password-reset-form'>
            <input
              id='email-input'
              type='email'
              placeholder='E-Mail'
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              required
            />

            <br />
            <button
              id='reset-btn'
              type='submit'
              onClick={accountEmailSearch}
              disabled={!emailSearch.includes('@')}
            >
              Reset Password
            </button>
          </form>

          <form id='password-reset-form'>
            <p>{AD.recoveryQuestion}</p>
            <input
              id='email-input'
              type='text'
              placeholder='Recovery Answer'
              onChange={(e) => setRecoveryAnswer(e.target.value.toLowerCase())}
              required
            />

            <br />
            <button id='reset-btn' type='submit' onClick={recoveryAnswerCheck}>
              Reset Password
            </button>
          </form>

          <form id='password-reset-form'>
            <p>Set New Password</p>
            <input
              id='email-input'
              type='password'
              placeholder='New Password'
              onChange={(e) => setNewPass(e.target.value)}
              required
            />

            <input
              id='email-input'
              type='password'
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />

            <br />
            <button
              id='reset-btn'
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                if (AD.recoveryAnswer === recoveryAnswer) {
                  if (newPass === '' || confirmPass === '') {
                    setPassAlertText('Password(s) Missing');
                    fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'pass');
                  } else if (newPass.length < 5 || confirmPass.length < 5) {
                    setPassAlertText('Password must be >5 characters');
                    fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'pass');
                  } else if (newPass !== confirmPass) {
                    setPassAlertText(`New Passwords Don't Match`);
                    fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'pass');
                  } else {
                    updatePassword(e, newPass, confirmPass);

                    setTimeout(() => {
                      window.location.href = '/login';
                    }, 1500);
                  }
                } else {
                  fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
                  setPassAlertText('Wrong Recovery Answer');
                }
              }}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <div className='log-sign-footer'>
        <Link to='/signup'>Sign Up!</Link>
        <Link to='/login'>Log In</Link>
        <Link to='/privacy-policy'>Privacy Policy</Link>
      </div>

      <LogFooter />
    </div>
  );
};

export default ForgotPassword;
