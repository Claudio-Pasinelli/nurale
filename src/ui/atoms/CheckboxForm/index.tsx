import { Checkbox, CheckboxProps } from '@chakra-ui/react'

interface Props extends CheckboxProps
{
    children: any;
    fontSize?: string
    fontWeight?: string
    onChange: ()=> void;
}

const CheckboxForm = ({children, fontSize, fontWeight, onChange, ...rest}: Props) =>
{
    // #514689

    return  <Checkbox size='md' onChange={onChange} {...rest}>
                <div style={{fontSize: fontSize ? fontSize : '16px', fontWeight: fontWeight ? fontWeight : '700'}}>
                    {children}
                </div>
            </Checkbox>
}

export default CheckboxForm;