import { Input, InputProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form';

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

const InputForm = ({placeholder, label, fontWeight, fontSize, name, type, error, ...rest}: Props) =>
{
    const { register } = useFormContext();
    
    return (
        <div>
            <label style={{fontWeight: fontWeight ? fontWeight : '100px'}}>{label}</label>
            <Input placeholder={placeholder} fontSize={fontSize ? fontSize : '18px'} type={type ? type : 'text'} {...register(name)} {...rest}/>
            <div style={{color: 'red'}}>{error}</div>
        </div>
    )
}

export default InputForm;