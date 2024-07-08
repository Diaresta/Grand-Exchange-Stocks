import { describe, expect, test } from 'vitest';
import { ALPHABET } from './AlphabetSearchContainer';

describe('ALPHABET():', () => {
  test('Should return an array of length 26', () => {
    const alphabet = ALPHABET();

    expect(alphabet.length).toBe(26);
  });

  test('Should return an array where first index is A and last index is Z', () => {
    const alphabet = ALPHABET();

    expect(alphabet[0]).toBe('A');
    expect(alphabet[25]).toBe('Z');
  });

  test('Should return an array containing letters A through Z', () => {
    const alphabet = ALPHABET();
    const expected = Array.from(Array(26))
      .map((_e, i) => i + 65)
      .map((x) => String.fromCharCode(x));

    expect(alphabet).toEqual(expected);
  });

  test('Should return an array that only contains letters A through Z', () => {
    const alphabet = ALPHABET();

    alphabet.forEach((letter) => {
      expect(letter).toMatch(/[A-Z]/);
    });
  });

  test('Should return an array where all elements are strings', () => {
    const alphabet = ALPHABET();

    alphabet.forEach((letter) => {
      expect(typeof letter).toBe('string');
    });
  });
});
