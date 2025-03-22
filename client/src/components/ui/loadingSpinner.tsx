import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size = 30 }: LoadingSpinnerProps) => {
  return (
    <div
      className='h-screen flex flex-row justify-center items-center'
      data-testid='loading-spinner'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={cn('animate-spin')}
      >
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
