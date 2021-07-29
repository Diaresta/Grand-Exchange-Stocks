import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ForgotPassword = () => {
  const [passwordAccept, setpasswordAccept] = useState(false);

  const passwordboys = () => {
    console.log('asdasdasd');
    setpasswordAccept(true);
  };

  return (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h1>Forgot Password?</h1>
          <form>
            <input
              id='email-input'
              type='email'
              placeholder='E-Mail'
              required
            />

            <br />
            <button id='reset-btn' onSubmit={passwordboys}>
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

      <Footer />
    </div>
  );
};

export default ForgotPassword;
