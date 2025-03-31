import '@testing-library/jest-dom/vitest';
import { act, render, screen } from '@testing-library/react';
import routeData from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest';
import SearchPage from './SearchPage';

describe('SearchPage Component:', () => {
  beforeEach(() => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve([
          {
            name: 'Dragon scimitar',
            id: 4587,
          },
          {
            name: 'Rune 2h sword',
            id: 1319,
          },
        ]),
      statusText: 'OK',
    };

    vitest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() => Promise.resolve(mockResponse as Response));
  });

  afterEach(() => {
    vitest.restoreAllMocks();
  });

  it('Should render SearchPage component', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('search-container')).toBeInTheDocument();
    expect(document.title).toBe('ge.teller - Search:');
  });

  it('Should render SearchPage, ItemSearchList, and AlphabetSearchContainer components', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('search-container')).toBeInTheDocument();
    expect(
      screen.getByTestId('item-search-list-container')
    ).toBeInTheDocument();
    expect(screen.getByTestId('alphabet-search-container')).toBeInTheDocument();
  });

  it('Should render the correct number of search results (2) when no query present', async () => {
    const mockLocation = vitest.spyOn(routeData, 'useLocation');
    mockLocation.mockReturnValue({ search: '?s=' } as any);
    await act(async () => {
      render(
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      );
    });

    expect(document.title).toBe('ge.teller - Search:');
    expect(screen.getByText('2 Results')).toBeInTheDocument();
    expect(screen.getByText('Dragon scimitar')).toBeInTheDocument();
    expect(screen.getByText('Rune 2h sword')).toBeInTheDocument();
  });

  it('Should render the correct number of search results (1) when query is present and matches item name', async () => {
    const mockLocation = vitest.spyOn(routeData, 'useLocation');
    mockLocation.mockReturnValue({ search: '?s=dragon+scimitar' } as any);
    await act(async () => {
      render(
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      );
    });

    expect(document.title).toBe('ge.teller - Search: dragon scimitar');
    expect(screen.getByText('1 Results')).toBeInTheDocument();
    expect(screen.getByText('Dragon scimitar')).toBeInTheDocument();
  });

  it('Should render the correct number of search results (1) when query is present and partially matches item name', async () => {
    const mockLocation = vitest.spyOn(routeData, 'useLocation');
    mockLocation.mockReturnValue({ search: '?s=2h' } as any);
    await act(async () => {
      render(
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      );
    });

    expect(document.title).toBe('ge.teller - Search: 2h');
    expect(screen.getByText('1 Results')).toBeInTheDocument();
    expect(screen.getByText('Rune 2h sword')).toBeInTheDocument();
  });

  it('Should render the correct number of search results (0) when query is present and does not match item name', async () => {
    const mockLocation = vitest.spyOn(routeData, 'useLocation');
    mockLocation.mockReturnValue({ search: '?s=Item+Not+Found' } as any);
    await act(async () => {
      render(
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      );
    });

    expect(document.title).toBe('ge.teller - Search: item not found');
    expect(screen.getByText('0 Results')).toBeInTheDocument();
  });

  it('Should show loading spinner while fetching data', async () => {
    vitest.stubGlobal('fetch', () => new Promise(() => {}));
    await act(async () => {
      render(
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('Should not show loading spinner when data fetching has completed', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      );
    });

    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('Should show error message when fetch fails', async () => {
    vitest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() =>
        Promise.reject(new Error('Error fetching item list'))
      );

    await act(async () => {
      render(
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      );
    });

    expect(screen.getByText('Error fetching item list')).toBeInTheDocument();
    expect(screen.getByText('0 Results')).toBeInTheDocument();
  });
});
