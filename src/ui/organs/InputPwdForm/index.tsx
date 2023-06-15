import { Button, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { InputForm } from '../../molecules';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface Props extends InputProps
{
    placeholder: string;
    label: string;
    fontWeight?: string;
    fontSize?: string;
    name: string;
    type?: string;
    error?: string
}

const InputPwdForm = ({placeholder, label, fontWeight, fontSize, name, type, error, ...rest}: Props) =>
{
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <InputForm label={label} fontWeight={fontWeight}  placeholder={placeholder} fontSize={fontSize} name={name} type={show ? 'text' : 'password'} error={error} {...rest}/>
        <InputRightElement width='4.5rem'>
          <Button onClick={handleClick} top='60%' leftIcon={show ? <ViewOffIcon/> : <ViewIcon/>} variant='ghost' _hover={{bg: 'none'}}/>
        </InputRightElement>
      </InputGroup>
    )
}

export default InputPwdForm;