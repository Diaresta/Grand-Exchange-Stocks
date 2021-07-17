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
              <input type='text' placeholder='First Name'></input>
              <input type='text' placeholder='Last Name'></input>
            </div>

            <div class='form-input-div'>
              <input type='text' placeholder='Username'></input>
              <input type='password' placeholder='Password'></input>
            </div>

            <input id='email-input' type='email' placeholder='E-Mail'></input>
            {/* <input type='date' placeholder='birthday'></input> */}
            <br />
            <button class=''>Sign Up</button>
          </form>
        </div>
      </div>
      <div class='log-sign-footer'>
        <a href='/account-recovery'>Forgot Password?</a>
        <Link to='/login'>Log In</Link>
        <Link to='/privacy/privacy-policy'>Privacy Policy</Link>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
