import { Link } from 'react-router-dom';
import NavbarRight from './Navbar-Right';

const Header = ({ checkToken }) => {
  return (
    <header>
      <div id='navbar-left'>
        <Link to='/home'>
          <img id='logo' src='/images/coins.png' alt='site logo' />
          <img id='name-logo' src='/images/gelogo.png' alt='site name logo' />
        </Link>
        <form id='header-form' action='/search/' method='GET'>
          <input type='text' placeholder='Search...' name='s'></input>
          <button id='input-btn' type='submit'>
            <i className='fas fa-search'></i>
            <span id='search-text'>Search</span>
          </button>
        </form>
      </div>

      <div id='navbar-right'>
        <NavbarRight checkToken={checkToken} />
      </div>
    </header>
  );
};

export default Header;
