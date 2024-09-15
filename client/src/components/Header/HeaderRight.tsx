import {
  CounterClockwiseClockIcon,
  EnterIcon,
  ExitIcon,
  MoonIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { checkLoginToken } from '../../scripts/Utilities';
import { Button, buttonVariants } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const HeaderRight = ({ loggedIn }: { loggedIn: boolean }) => {
  // TODO: Implement account info call. Replace token name with actual account name
  const accountInfoCall = () => {
    if (checkLoginToken()) {
      if (localStorage.getItem('name')) {
        return localStorage.getItem('name');
      } else {
        return '';
      }
    }
  };

  return loggedIn ? (
    <div className='flex gap-4' data-testid={'header-right-container'}>
      <div data-testid={'dropdown-menu-container'}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='secondary'
              size='icon'
              className='rounded-full'
              name='toggle-menu'
            >
              <PersonIcon className='h-5 w-5' />
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>{accountInfoCall()}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to='/account' className='flex items-center'>
                <PersonIcon className='pr-1' />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to='/history' className='flex items-center'>
                <CounterClockwiseClockIcon className='pr-1' />
                Item History
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <MoonIcon className='pr-1' />
              Dark Mode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>
              <ExitIcon className='pr-1' />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ) : (
    <div className='flex gap-4' data-testid={'header-right-container'}>
      <div className='flex w-full items-center justify-end md:ml-auto md:gap-2 lg:gap-4'>
        <Link to='/login' className={buttonVariants({ variant: 'default' })}>
          Log In
        </Link>
        <Link to='/register' className={buttonVariants({ variant: 'default' })}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default HeaderRight;
