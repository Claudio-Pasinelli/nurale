import { Flex } from '@chakra-ui/react'
import FormLogin from './Form';
import ImmagineLogin from './ImmagineLogin';

const Login = () =>
{
    return(
        <Flex width='100vw' height='100vh' overflowX='hidden'>
           <FormLogin/> 
           <ImmagineLogin/>
        </Flex>
    )
}

export default Login;