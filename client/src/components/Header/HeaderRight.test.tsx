import '@testing-library/jest-dom/vitest';
import { act, render, screen } from '@testing-library/react';
import { randomUUID } from 'crypto';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import HeaderRight from './HeaderRight';

describe('HeaderRight Component:', () => {
  let localStorageMock: any;

  beforeEach(() => {
    localStorageMock = {
      token: randomUUID(),
      name: 'TestUsername',
    };
    localStorage.setItem('token', localStorageMock.token);
    localStorage.setItem('name', localStorageMock.name);
  });

  it('Should render HeaderRight component', async () => {
    render(<HeaderRight loggedIn={true} />);

    expect(screen.getByTestId('header-right-container')).toBeInTheDocument();
  });

  it('Should render HeaderRight component with user menu when logged in', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <HeaderRight loggedIn={true} />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('header-right-container')).toBeInTheDocument();
    expect(screen.queryByTestId('dropdown-menu-container')).toBeInTheDocument();
    expect(() => screen.getByText('Log In')).toThrow();
    expect(() => screen.getByText('Register')).toThrow();
  });

  it('Should render HeaderRight component without user menu when logged out', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <HeaderRight loggedIn={false} />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('header-right-container')).toBeInTheDocument();
    expect(
      screen.queryByTestId('dropdown-menu-container')
    ).not.toBeInTheDocument();
  });

  it('Should render HeaderRight component with Log In and Register buttons when logged out', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <HeaderRight loggedIn={false} />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('header-right-container')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Log In').closest('a')).toHaveAttribute(
      'href',
      '/login'
    );
    expect(screen.getByText('Register').closest('a')).toHaveAttribute(
      'href',
      '/register'
    );
    expect(screen.queryByText(localStorageMock.name)).not.toBeInTheDocument();
  });
});
