import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogFooter from '../components/Log-footer';

const LogIn = ({ checkToken, setToken }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
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

  const loginBoys = async (e, username, password) => {
    e.preventDefault();

    const logResult = await fetch('http://localhost:8000/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (logResult.user) {
      setAlertText('Logging In!');
      fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green');

      setToken(logResult.token);

      setTimeout(() => {
        window.location.href = '/';
      }, 750);
    } else {
      setAlertText(logResult.error);
      fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
    }
  };

  return checkToken ? (
    (window.location.href = '/')
  ) : (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h1>Log In</h1>
          <span id='calc-alert' style={alertStyle}>
            {alertText}
          </span>
          <form onSubmit={(e) => loginBoys(e, username, password)}>
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

      <LogFooter />
    </div>
  );
};

// LogIn.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

export default LogIn;
