import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SignUp = () => {
  return (
    <div id='log-sign-page'>
      <div class='log-sign-container'>
        <div class='form-container'>
          <h1>Create Account</h1>
          <form>
            <div class='form-input-div'>
              <input type='text' placeholder='First Name' required />
              <input type='text' placeholder='Last Name' required />
            </div>

            <div class='form-input-div'>
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
            <button class=''>Sign Up</button>
          </form>
        </div>
      </div>
      <div class='log-sign-footer'>
        <a href='/account-recovery'>Forgot Password?</a>
        <Link to='/login'>Log In</Link>
        <Link to='/privacy-policy'>Privacy Policy</Link>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;