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
    containerWidth?: string;
    error?: string
    disabled?: boolean
}

const InputForm = ({placeholder, label, fontWeight, fontSize, name, type, error, containerWidth, disabled, ...rest}: Props) =>
{
    const { register } = useFormContext();
    
    return (
        <div style={{width: containerWidth? containerWidth : 'fit-content'}}>
            <label style={{fontWeight: fontWeight ? fontWeight : '100px'}}>{label}</label>
            <Input disabled={disabled} placeholder={placeholder} fontSize={fontSize ? fontSize : '18px'} type={type ? type : 'text'} {...register(name)} {...rest}/>
            <div style={{color: 'red', height: fontSize ? fontSize : '24px'}}>{error}</div>
        </div>
    )
}

export default InputForm;