import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div id='Not-found-container'>
      <h1>Page Not Found</h1>
      <p>
        Sorry about that. <br />
        Try searching somewhere else
      </p>
      <img
        id='death-rune'
        src='/images/death-rune.png'
        alt='Death Rune 404 Image'
      />
      <Link to='/'>
        <button>Return home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
