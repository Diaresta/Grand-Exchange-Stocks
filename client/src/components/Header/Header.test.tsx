import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from './Header';

describe('Header Component:', () => {
  it('Should render Header component', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('header-container')).toBeInTheDocument();
  });

  it('Should render Header component with ge.teller home link', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    });

    const homeLink = screen.getByRole('link', { name: /ge.teller/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('Should render InputWithButton component', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    const submitButton = screen.getByRole('button', { name: /Search/i });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'Submit');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
  });

  it('Should render HeaderRight component', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('header-right-container')).toBeInTheDocument;
  });
});
