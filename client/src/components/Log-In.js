import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LogIn = () => {
  return (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h1>Log In</h1>
          <form>
            <input type='text' placeholder='Username' required></input>
            <input type='password' placeholder='Password' required></input>
            <br />
            <button className=''>Log In</button>
          </form>
        </div>
      </div>
      <div className='log-sign-footer'>
        <a href='/account-recovery'>Forgot Password?</a>
        <Link to='/signup'>Sign Up!</Link>
        <Link to='/privacy-policy'>Privacy Policy</Link>
      </div>

      <Footer />
    </div>
  );
};

export default LogIn;
