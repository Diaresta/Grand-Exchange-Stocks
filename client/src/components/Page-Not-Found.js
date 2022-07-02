import { useEffect } from 'react';

const PageNotFound = () => {
  useEffect(() => {
    document.title = 'ge.teller - 404 Not Found';
  }, []);

  return (
    <div id='Not-found-container'>
      <h1>Page Not Found</h1>
      <p>
        Sorry about that. <br />
        Try searching somewhere else
      </p>
      <img id='death-rune' src='/images/death-rune.png' alt='Death Rune 404' />
      <a href='/'>
        <button>Return home</button>
      </a>
    </div>
  );
};

export default PageNotFound;
