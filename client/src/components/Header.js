import NavbarRight from './Navbar-Right';

const Header = ({ loggedIn }) => {
  return (
    <header>
      <div id='navbar-left'>
        <a href='/'>
          <img id='logo' src='/images/coins.png' alt='site logo' />
        </a>
        <a href='/'>
          <h1>GE Teller</h1>
        </a>
        <form id='header-form'>
          <div>
            <input type='search\' placeholder='Search...'></input>
            <button id='input-btn'>
              <i className='fas fa-search'></i>Search
            </button>
          </div>
        </form>
      </div>

      <div id='navbar-right'>
        <NavbarRight loggedIn={loggedIn} />
      </div>
    </header>
  );
};

export default Header;
