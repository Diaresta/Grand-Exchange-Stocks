import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AlphabetSearchContainer, { ALPHABET } from './AlphabetSearchContainer';

describe('ALPHABET():', () => {
  it('Should return an array of length 26', () => {
    const alphabet = ALPHABET();

    expect(alphabet.length).toBe(26);
  });

  it('Should return an array where first index is A and last index is Z', () => {
    const alphabet = ALPHABET();

    expect(alphabet[0]).toBe('A');
    expect(alphabet[25]).toBe('Z');
  });

  it('Should return an array containing letters A through Z', () => {
    const alphabet = ALPHABET();
    const expected = Array.from(Array(26))
      .map((_e, i) => i + 65)
      .map((x) => String.fromCharCode(x));

    expect(alphabet).toEqual(expected);
  });

  it('Should return an array that only contains letters A through Z', () => {
    const alphabet = ALPHABET();

    alphabet.forEach((letter) => {
      expect(letter).toMatch(/[A-Z]/);
    });
  });

  it('Should return an array where all elements are strings', () => {
    const alphabet = ALPHABET();

    alphabet.forEach((letter) => {
      expect(typeof letter).toBe('string');
    });
  });
});

describe('AlphabetSearchContainer Component:', () => {
  it('Should render AlphabetSearchContainer component', () => {
    render(<AlphabetSearchContainer />);
  });

  it('Should render the correct number of list items', () => {
    render(<AlphabetSearchContainer />);
    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(ALPHABET().length + 1);
  });

  it('Should render the 0 list item with the correct link', () => {
    render(<AlphabetSearchContainer />);
    const linkElement = screen.getByText('0');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '#3');
  });

  it('Should render each letter list item with the correct link', () => {
    render(<AlphabetSearchContainer />);
    const alphabet = ALPHABET();
    alphabet.forEach((letter) => {
      const linkElement = screen.getByText(letter);

      expect(linkElement).toBeInTheDocument();
      expect(linkElement.closest('a')).toHaveAttribute('href', `#${letter}`);
    });
  });

  it('Should render the 0 list item as first element', () => {
    render(<AlphabetSearchContainer />);
    const listItems = screen.getAllByRole('listitem');

    expect(listItems[0]).toHaveTextContent('0');
  });

  it('Should render each letter list item in order after 0', () => {
    render(<AlphabetSearchContainer />);
    const alphabet = ALPHABET();
    const listItems = screen.getAllByRole('listitem');

    alphabet.forEach((letter, i) => {
      expect(listItems[i + 1]).toHaveTextContent(letter);
    });
  });
});
