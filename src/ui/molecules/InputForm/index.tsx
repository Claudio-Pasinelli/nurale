import { CloseIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react'
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
    deletable?: boolean
    handleDelete?: () => void
}

const InputForm = ({placeholder, label, fontWeight, fontSize, name, type, error, containerWidth, disabled, deletable, handleDelete, ...rest}: Props) =>
{
    const { register } = useFormContext();
    
    return (
        <div style={{width: containerWidth? containerWidth : 'fit-content'}}>
            <label style={{fontWeight: fontWeight ? fontWeight : '100px'}}>{label}</label>
            {
                deletable ?
                <InputGroup>
                    <Input disabled={disabled} placeholder={placeholder} fontSize={fontSize ? fontSize : '18px'} type={type ? type : 'text'} {...register(name)} {...rest}/>
                    <InputRightElement>
                        <CloseIcon width='0.8rem' onClick={handleDelete} cursor='pointer'/>
                    </InputRightElement>
                </InputGroup>
                :
                <Input disabled={disabled} placeholder={placeholder} fontSize={fontSize ? fontSize : '18px'} type={type ? type : 'text'} {...register(name)} {...rest}/>
            }
            <div style={{color: 'red', height: fontSize ? fontSize : '24px'}}>{error}</div>
        </div>
    )
}

export default InputForm;