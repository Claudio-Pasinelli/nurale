import { Flex } from '@chakra-ui/react';
import { InputForm } from '../../molecules';
import { ButtonForm, Spacer } from '../../atoms';
import { ROUTES } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const RecuperoPassword = () =>
{
    const navigate = useNavigate();

    const handleClickAccess = () =>
    {
        return;
    }

    const handleClickLogin = () =>
    {
        return navigate(ROUTES.login);
    }

    return(
        <Flex flexDirection='column' width='100vw' height='100vh' background='linear-gradient(299.92deg, #514689 18.26%, #EF426F 117.31%)' alignItems='center' justifyContent='center'>
            <Flex flexDirection='column' backgroundColor='white' borderRadius='38px' padding='3rem'>
                <Flex style={{border: 'solid rgba(81, 70, 137, 0.7)', borderWidth: '0 0 1px 0', padding: '0 0 2rem 0'}}>
                    <img src="./images/login-titolo.svg" alt=""/>
                </Flex>
                <Spacer width={'20px'} height={'20px'} />
                <h1 style={{textAlign:'center', fontWeight:'bold', fontSize: '27px'}}>Password dimenticata</h1>
                <Spacer width={'20px'} height={'20px'} />
                <InputForm name='email' placeholder='Inserisci Email' label='Email' fontWeight='bold' fontSize='20px'/>
                <Spacer width={'20px'} height={'20px'} />
                <ButtonForm onClick={handleClickAccess} backgroundColor='#EF426F' fontSize='25px' fontWeight='700px'>Recupera password</ButtonForm>
                <Spacer width={'20px'} height={'20px'} />
                <a style={{textAlign:'center', fontWeight:'bold'}} onClick={handleClickLogin}>Torna alla pagina di login</a>
            </Flex>
        </Flex>
    )
}

export default RecuperoPassword;