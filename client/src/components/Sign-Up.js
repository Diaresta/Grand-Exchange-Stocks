import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SignUp = ({ loggedIn }) => {
  return loggedIn ? (
    (window.location.href = '/')
  ) : (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h1>Create Account</h1>
          <form>
            <div className='form-input-div'>
              <input type='text' placeholder='First Name' required />
              <input type='text' placeholder='Last Name' required />
            </div>

            <div className='form-input-div'>
              <input type='text' placeholder='Username' required />
              <input type='password' placeholder='Password' required />
            </div>

            <input
              id='email-input'
              type='email'
              placeholder='E-Mail'
              required
            />
            {/* <input type='date' placeholder='birthday'/> */}
            <br />
            <button className='' type='submit'>
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
