import { Input, InputProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form';

interface Props extends InputProps
{
    placeholder: string;
    label: string;
    fontWeight?: string;
    fontSize?: string;
    name: string;
    error?: string
}

const InputForm = ({placeholder, label, fontWeight, fontSize, name, error, ...rest}: Props) =>
{
    const { register } = useFormContext();
    
    return (
        <div>
            <label style={{fontWeight: fontWeight ? fontWeight : '100px', fontSize: fontSize ? fontSize : '18px'}}>{label}</label>
            <Input placeholder={placeholder} fontSize={fontSize ? fontSize : '18px'} {...register(name)} {...rest}/>
            <div style={{color: 'red'}}>{error}</div>
        </div>
    )
}

export default InputForm;