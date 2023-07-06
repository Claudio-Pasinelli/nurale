import { CloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
interface Props extends InputProps {
  placeholder: string;
  label: string;
  fontWeight?: string;
  fontSize?: string;
  name: string;
  containerWidth?: string;
  error?: string | any;
  showEye?: boolean;
  isInputForAForm?: boolean;
  handleDelete?: () => void;
}

const InputForm = ({
  placeholder,
  label,
  fontWeight,
  fontSize,
  name,
  type = 'text',
  error,
  showEye = true,
  isInputForAForm = true,
  containerWidth,
  handleDelete,
  ...rest
}: Props) => {
  const { register } = useFormContext();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div style={{ width: containerWidth ? containerWidth : '100%' }}>
      <label style={{ fontWeight: fontWeight ? fontWeight : '100px' }}>{label}</label>
      <InputGroup>
        <Input
          placeholder={placeholder}
          fontSize={fontSize ? fontSize : '18px'}
          type={show ? 'password' : 'text'}
          cursor={rest.isDisabled ? 'not-allowed' : 'pointer'}
          {...register(name)}
          {...rest}
        />
        {handleDelete ? (
          <InputRightElement>
            <CloseIcon width='0.8rem' onClick={handleDelete} cursor='pointer' />
          </InputRightElement>
        ) : null}
        {type === 'password' && (
          <InputRightElement>
            {showEye ? (
              <Button
                onClick={handleClick}
                leftIcon={show ? <ViewIcon /> : <ViewOffIcon />}
                variant='ghost'
                _hover={{ bg: 'none' }}
              />
            ) : null}
          </InputRightElement>
        )}
      </InputGroup>
      <div style={{ color: 'red', height: fontSize ? fontSize : '24px' }}>{error}</div>
    </div>
  );
};

export default InputForm;
