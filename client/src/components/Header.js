const Header = () => {
  return (
    <header>
      <div id='navbar-left'>
        <a href='/'>
          <p className='logo-placeholder'>logo</p>
        </a>
        <h1>Site Name</h1>
        <form>
          <div>
            <input type='search\' placeholder='Search...'></input>
            <button>Search</button>
          </div>
        </form>
      </div>

      <div id='navbar-right'>
        <p className='logo-placeholder'>logo</p>
        <p>Username</p>
      </div>
    </header>
  );
};

export default Header;
