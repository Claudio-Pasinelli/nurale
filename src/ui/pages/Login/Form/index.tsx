import { Flex, Stack } from '@chakra-ui/react'
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Spacer, ButtonForm } from '../../../atoms';
import { InputForm } from '../../../molecules';
import { ROUTES, User } from '../../../../utils';
import { FormProvider, useForm } from 'react-hook-form';
import schema from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const defaultValues = {
    email: '',
    password: '',
  };

  const FormLogin = () =>
  {
    const navigate = useNavigate();
      const methods = useForm<Partial<User>>({
        defaultValues,
        resolver: zodResolver(schema),
      });
      const {
        formState: { errors },
        trigger,
        reset,
        setValue,
        getValues,
    } = methods;

    const handleClickAccess = async () =>
    {
        const hasErrors = await trigger();
        if (!hasErrors) {
          return;
        }
        // setValue('email', )
        handleReset();
    }

    const handleClickPassword = () =>
    {
        return navigate(ROUTES.recuperoPassword);
    }

    const handleReset = () => {
        reset(defaultValues);
      };

    return(
        <Flex height='100vh' padding='5rem' flexDirection='column'>
            <Flex style={{border: 'solid rgba(81, 70, 137, 0.7)', borderWidth: '0 0 1px 0', padding: '0 0 2rem 0'}}>
                <img src="./images/login-titolo.svg" alt=""/>
            </Flex>
            <FormProvider {...methods}>
                <Stack spacing={3}>
                    <Spacer width={'10px'} height={'10px'} />
                    <InputForm name='email' placeholder='Inserisci Email' label='Email' fontWeight='bold' fontSize='20px' error={errors?.email?.message}/>
                    <InputForm name='password' placeholder='Inserisci Password' label='Password' fontWeight='bold' fontSize='20px' error={errors?.password?.message}/>
                </Stack>
                <a style={{textAlign:'center', fontWeight:'bold'}} onClick={handleClickPassword}>Hai dimenticato la password?</a>
                <Spacer width={'20px'} height={'50px'} />
                <ButtonForm onClick={handleClickAccess} backgroundColor='#EF426F' _hover={{bg: '#d73e65'}} fontSize='25px'>Accedi</ButtonForm>
            </FormProvider>
            <Flex style={{justifyContent:'center', fontWeight:'bold'}} justifyContent='center'>
                <Spacer width={'20px'} height={'50px'} />
                <p>Non sei ancora registrato?</p><Spacer width={'5px'} height={'5px'} /><p style={{color: '#EF426F'}}> Registrati</p>
            </Flex>
            <Spacer width={'20px'} height={'50px'} />
            <Stack spacing={3}>
                <ButtonForm onClick={handleClickAccess} variant='outline' color='black' leftIcon={<FcGoogle />}>Accedi con Google</ButtonForm>
                <ButtonForm onClick={handleClickAccess} variant='outline' color='black' leftIcon={<FaFacebook />}>Accedi con Facebook</ButtonForm>
            </Stack>
        </Flex>
    )
}

export default FormLogin;
