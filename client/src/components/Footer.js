import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div id='footer'>
      {/* <hr /> */}
      <Link to='/copyright'>
        <p>&copy; ge.teller</p>
      </Link>
      <Link to='/contact'>
        <p>Contact Us</p>
      </Link>
      <Link to='/privacy-policy'>
        <p>Privacy Policy</p>
      </Link>
    </div>
  );
};

export default Footer;
