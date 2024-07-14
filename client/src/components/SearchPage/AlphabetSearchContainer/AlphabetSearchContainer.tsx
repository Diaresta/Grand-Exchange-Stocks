export const ALPHABET = (): string[] => {
  return Array.from({ length: 26 }, (_e, i) => String.fromCharCode(65 + i));
};

const AlphabetSearchContainer = () => {
  return (
    <div id='alphabet-container' data-testid='alphabet-search-container'>
      <ul>
        <li key={0}>
          <a href='#3'>0</a>
        </li>
        {ALPHABET().map((letter: string) => (
          <li key={letter}>
            <a href={'#' + letter}>{letter}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlphabetSearchContainer;
