import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { ThemeProvider } from '../components/theme-provider';
import '../styles/App.scss';

const Root = () => {
  return (
    <ThemeProvider defaultTheme='light' storageKey='ge-teller-themex'>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
};

export default Root;
