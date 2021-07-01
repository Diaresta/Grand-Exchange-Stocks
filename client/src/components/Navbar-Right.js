const NavbarRight = ({ loggedIn }) => {
  return loggedIn ? (
    <div id='navbar-right'>
      <a href='/login' className='log-in log-btn'>
        Log In
      </a>
      <a href='/signup' className='sign-up log-btn'>
        Sign Up
      </a>
    </div>
  ) : (
    <div id='navbar-right'>
      <i class='fas fa-user-circle fa-2x' />
      <p>Username</p>
    </div>
  );
};

export default NavbarRight;
