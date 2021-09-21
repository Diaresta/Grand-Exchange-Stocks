import { Link } from 'react-router-dom';
import NavbarRight from './Navbar-Right';

const Header = ({ loggedIn }) => {
  return (
    <header>
      <div id='navbar-left'>
        <Link to='/home'>
          <img id='logo' src='/images/coins.png' alt='site logo' />
          <img id='name-logo' src='/images/gelogo.png' alt='site name logo' />
          {/* <h1>GE Teller</h1> */}
        </Link>
        <form id='header-form' action='/search/' method='GET'>
          <input type='text' placeholder='Search...' name='s'></input>
          <button id='input-btn' type='submit'>
            <i className='fas fa-search'></i>Search
          </button>
        </form>
      </div>

      <div id='navbar-right'>
        <NavbarRight loggedIn={loggedIn} />
      </div>
    </header>
  );
};

export default Header;
