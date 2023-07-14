import { CloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
interface Props extends InputProps {
  placeholder: string;
  label: string;
  fontWeight?: string;
  fontSize?: string;
  name: string;
  containerWidth?: string;
  error?: string | any;
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
  containerWidth,
  handleDelete,
  ...rest
}: Props) => {
  const { register, control } = useFormContext();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  // const {
  //   field: { value },
  // } = useController({ control, name });

  // const formatValue = (value: any) => {
  //   return type === 'number' ? parseInt(value) : value;
  // };

  useEffect(() => {
    type === 'password' ? setShow(true) : null;
  }, [type]);

  return (
    <div style={{ width: containerWidth ? containerWidth : '100%' }}>
      <label style={{ fontWeight: fontWeight ? fontWeight : '100px' }}>{label}</label>
      <InputGroup>
        <Input
          placeholder={placeholder}
          fontSize={fontSize ? fontSize : '18px'}
          // type={show ? 'password' : type}
          type={show ? 'password' : 'text'}
          cursor={rest.isDisabled ? 'not-allowed' : 'pointer'}
          // value={formatValue(value)}
          textAlign={type === 'number' ? 'right' : 'left'}
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
            <Button
              onClick={handleClick}
              leftIcon={show ? <ViewIcon /> : <ViewOffIcon />}
              variant='ghost'
              _hover={{ bg: 'none' }}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <div style={{ color: 'red', height: fontSize ? fontSize : '24px' }}>{error}</div>
    </div>
  );
};

export default InputForm;
