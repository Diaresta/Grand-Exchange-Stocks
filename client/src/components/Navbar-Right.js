import { Link } from 'react-router-dom';

const NavbarRight = ({ loggedIn }) => {
  return loggedIn ? (
    <div id='navbar-right'>
      <i class='fas fa-user-circle fa-2x' />
      <Link to='/account'>Username</Link>
    </div>
  ) : (
    <div id='navbar-right'>
      <Link to='/login' className='log-in log-btn'>
        Log In
      </Link>
      <Link to='/signup' className='sign-up log-btn'>
        Sign Up
      </Link>
    </div>
  );
};

export default NavbarRight;
