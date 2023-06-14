import { Button, ButtonProps } from '@chakra-ui/react';
// import { forwardRef } from 'react';

interface Props extends ButtonProps
{
    children?: any;
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    fontSize?: string;
    variant?: 'solid' | 'ghost' | 'outline' | 'link';
    onClick:()=> void;
}

// const ButtonLogin = forwardRef<ButtonProps, 'button'>((props, ref) =>
// {
//     <Button

//     />
// })

const ButtonForm = ({children, backgroundColor, color, borderRadius, variant, fontSize, onClick, ...rest}: Props) =>
{
    return (
        <Button fontSize={fontSize ? fontSize : '18px'} borderRadius={borderRadius ? borderRadius : '10px'} variant={variant} backgroundColor={backgroundColor? backgroundColor : 'white'} onClick={onClick} style={{color: color ? color : 'white'}} {...rest}>
            {children}
        </Button>
    )
}

export default ButtonForm;