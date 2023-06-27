import { Flex, Stack } from '@chakra-ui/react'
import { Spacer, ButtonForm, CheckboxForm } from '../../../atoms';
import { InputForm } from '../../../molecules';
import { ROUTES, User } from '../../../../utils';
import { FormProvider, useForm } from 'react-hook-form';
import schema from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InputPwdForm } from '../../../organisms';
import { theme } from '../../../themes';
import { darkModePalette } from '../../../themes/colors';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../../store';
import { AppDispatch } from '../../../../store/applicationStore';
import { EMAIL } from '../../../../utils/costants/auth';
import Cookies from 'js-cookie';
import { error } from 'console';

const defaultValues = {
    email: '',
    password: '',
  };

  const FormLogin = () =>
  {
    const dispatch:AppDispatch = useDispatch();

    const navigate = useNavigate();
    const [checked, setChecked] = useState(false); 
    const [isOk, setIsOk] = useState(false);

      const methods = useForm<User>({
        defaultValues,
        resolver: zodResolver(schema),
      });
      const {
        formState: { errors },
        trigger,
        reset,
        setValue,
        getValues,
        setError,
    } = methods;

    const handleClickAccess = async () =>
    {
        const hasErrors = await trigger();
        if (!hasErrors) {
          return;
        }
        
        if(!checked)
        {
            Cookies.remove(EMAIL);
        }

        Cookies.set(EMAIL, getValues(`${EMAIL}`));
        
        const response = await dispatch(loginUser(getValues()));

        if(response.payload === null)
        {
            setError('email',{message: 'Email non valida'});
            setError('password',{message: 'Password non valida'});
            return null;
        }

        handleReset();
        setIsOk(true);
        return navigate(ROUTES.home);
    }

    const handleClickPassword = () =>
    {
        return navigate(ROUTES.recuperoPassword);
    }
    
    const handleReset = () => {
        reset(defaultValues);
    };

    const handleChange = () =>
    { 
        setChecked(!checked);
    }; 

    useEffect(()=>
    {
        Cookies.get(EMAIL) && setValue('email', Cookies.get(EMAIL) as string);

        if(Cookies.get(EMAIL))
        {
            setChecked(true);
        }
    },[]);

    return(
        <Flex height='100vh' padding='7rem' flexDirection='column'>
            <Flex style={{padding: '0 0 1.5rem 0', margin: '1rem'}}>
                <img src="./images/login-titolo.svg" alt=""/>
            </Flex>
            <FormProvider {...methods}>
                <Stack spacing={3} style={{border: `solid ${darkModePalette.purple40}`, borderWidth: '1px 0 0 0'}}>
                    <Spacer width={'10px'} height={'10px'} />
                    <InputForm name='email' placeholder='Inserisci Email' label='Email' fontWeight={theme.fontWeights.bold} fontSize={theme.fontSizes.xs} error={errors?.email?.message}/>
                    <InputPwdForm type='password' name='password' placeholder='Inserisci Password' label='Password' fontWeight={theme.fontWeights.bold} fontSize={theme.fontSizes.xs} error={errors?.password?.message}/>
                </Stack>
                <Spacer width={'20px'} height={'25px'} />
                <a style={{textAlign:'center', fontWeight:theme.fontWeights.bold}} onClick={handleClickPassword}>Hai dimenticato la password?</a>
                <Spacer width={'20px'} height={'25px'} />
                <CheckboxForm onChange={handleChange} isChecked={checked}>Ricordami</CheckboxForm>
                <Spacer width={'20px'} height={'40px'} />
                <ButtonForm isLoading={isOk} onClick={handleClickAccess} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Accedi</ButtonForm>
            </FormProvider>
        </Flex>
    )
}

export default FormLogin;
