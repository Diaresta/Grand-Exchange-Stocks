export const ALPHABET = (): string[] => {
  return Array.from({ length: 26 }, (_e, i) => String.fromCharCode(65 + i));
};

const AlphabetSearchContainer = () => {
  return (
    <div id='alphabet-container' data-testid='alphabet-search-container'>
      <ul className='fixed text-sm'>
        <li key={0}>
          <a href='#3' className='hover:text-blue-700 hover:font-bold'>
            0
          </a>
        </li>
        {ALPHABET().map((letter: string) => (
          <li key={letter}>
            <a
              href={'#' + letter}
              className='hover:text-blue-700 hover:font-bold'
            >
              {letter}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlphabetSearchContainer;
