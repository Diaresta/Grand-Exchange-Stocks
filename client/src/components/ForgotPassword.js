import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ForgotPassword = ({ loggedIn }) => {
  const [passwordAccept, setpasswordAccept] = useState(false);
  const [passValue, setpassValue] = useState('');

  const passwordboys = (e) => {
    e.preventDefault();
    setpasswordAccept(true);
    setpassValue('');
  };

  return loggedIn ? (
    (window.location.href = '/')
  ) : (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h1>Forgot Password?</h1>
          <form id='password-reset-form'>
            <input
              id='email-input'
              type='email'
              placeholder='E-Mail'
              value={passValue}
              onChange={(e) => setpassValue(e.target.value)}
              required
            />

            <br />
            <button
              id='reset-btn'
              onClick={passwordboys}
              disabled={!passValue.includes('@')}
            >
              Reset Password
            </button>
            {passwordAccept ? (
              <div id='password-reset-alert'>
                <p>Password reset link sent to your e-mail!</p>
              </div>
            ) : null}
          </form>
        </div>
      </div>
      <div className='log-sign-footer'>
        <Link to='/signup'>Sign Up!</Link>
        <Link to='/login'>Log In</Link>
        <Link to='/privacy-policy'>Privacy Policy</Link>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
