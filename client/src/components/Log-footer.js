import { Link } from 'react-router-dom';

const LogFooter = () => {
  return (
    <div className='footer log-footer'>
      {/* <hr /> */}
      <Link to='/privacy-policy'>
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

export default LogFooter;
