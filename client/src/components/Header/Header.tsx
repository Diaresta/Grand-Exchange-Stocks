import InputWithButton from '../ui/input-with-button';
import HeaderRight from './HeaderRight';

const Header = () => {
  // TODO - Implement login check
  const loggedIn: boolean = false;
  return (
    <header
      className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'
      data-testid={'header-container'}
    >
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <a href='/'>ge.teller</a>
        <form id='header-form' action='/search/' method='GET'>
          <InputWithButton
            inputType='text'
            inputPlaceholder='Search...'
            inputName='s'
            btnType='Submit'
            btnText='Search'
          />
        </form>
      </div>
      <HeaderRight loggedIn={loggedIn} />
    </header>
  );
};

export default Header;
