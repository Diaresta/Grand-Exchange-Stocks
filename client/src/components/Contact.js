import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

const Contact = ({ checkToken }) => {
  let [username, setUsername] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [contactMessage, setContactMessage] = useState('');
  const [alertText, setAlertText] = useState('');
  const [btnDisable, setDisabled] = useState();
  const [alertStyle, setAlertStyle] = useState();
  const [btnCursor, setCursor] = useState('');

  // Pops up and fades out alerts
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

  // Submits contact form to db
  const contactSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/contact/create', {
        username: username.toLowerCase(),
        email: userEmail.toLowerCase(),
        message: contactMessage,
        contactDate: new Date().toLocaleDateString(),
      })
      .then((res) => {
        setAlertText('Message Submitted!');
        fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green');
        setCursor('not-allowed');
        setDisabled(true);

        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      })
      .catch((err) => {
        setAlertText(err.response.data.error);
        fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
      });
  };

  useEffect(() => {
    document.title = 'ge.teller - Contact Us';
  }, []);

  return checkToken ? (
    <div id='log-sign-page'>
      <div class='log-sign-container'>
        <div class='form-container'>
          <h1>Contact Us</h1>
          <span id='calc-alert' style={alertStyle}>
            {alertText}
          </span>
          <form>
            <div class='form-input-div'>
              <input
                id='email-input'
                type='text'
                placeholder='Username'
                required
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                id='email-input'
                type='email'
                placeholder='E-Mail'
                required
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <textarea
              placeholder='Messsage...'
              required
              onChange={(e) => setContactMessage(e.target.value)}
            />
            <br />
            <button
              disabled={btnDisable}
              style={{ cursor: `${btnCursor}` }}
              type='submit'
              onClick={contactSubmit}
            >
              Submit
            </button>
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
  ) : (
    (window.location.href = '/login')
  );
};

export default Contact;
