import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LogIn = () => {
  return (
    <div id='log-sign-page'>
      <div class='log-sign-container'>
        <div class='form-container'>
          <h1>Log In</h1>
          <form>
            {/* <input type='text' placeholder='First Name...'></input>
        <input type='text' placeholder='Last Name...'></input> */}
            <input type='text' placeholder='Username'></input>
            <input type='password' placeholder='Password'></input>
            <br />
            <button class=''>Log In</button>
          </form>
        </div>
      </div>
      <div class='log-sign-footer'>
        <a href='/account-recovery'>Forgot Password?</a>
        <Link to='/signup'>Sign Up!</Link>
        <Link to='/privacy/privacy-policy'>Privacy Policy</Link>
      </div>

      <Footer />
    </div>
  );
};

export default LogIn;
