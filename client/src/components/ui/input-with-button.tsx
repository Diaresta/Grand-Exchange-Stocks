import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from './button';
import { Input } from './input';

const InputWithButton = ({
  inputType,
  inputPlaceholder,
  inputName,
  btnType,
  btnText,
}: {
  inputType: string;
  inputPlaceholder: string;
  inputName: string;
  btnType: any;
  btnText: string;
}) => {
  return (
    <div className='flex w-full max-w-sm items-center space-x-2'>
      <Input type={inputType} placeholder={inputPlaceholder} name={inputName} />
      <Button type={btnType}>
        <MagnifyingGlassIcon className='mr-2 h-4 w-4' />
        {btnText}
      </Button>
    </div>
  );
};

export default InputWithButton;
