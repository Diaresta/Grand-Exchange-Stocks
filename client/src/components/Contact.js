import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div id='log-sign-page'>
      <div class='log-sign-container'>
        <div class='form-container'>
          <h1>Contact Us</h1>
          <form>
            <div class='form-input-div'>
              <input type='text' placeholder='First Name' required />
              <input type='text' placeholder='Last Name' required />
            </div>

            <input
              id='email-input'
              type='email'
              placeholder='E-Mail'
              required
            />
            <textarea placeholder='Messsage...' />
            <br />
            <button class=''>Submit</button>
          </form>
        </div>
      </div>
      <div class='log-sign-footer'>
        <Link to='/signup'>Sign Up!</Link>
        <Link to='/login'>Log In</Link>
        <Link to='/privacy-policy'>Privacy Policy</Link>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
