import { Flex, Stack } from '@chakra-ui/react'
import { Spacer, ButtonForm, CheckboxForm } from '../../../atoms';
import { InputForm } from '../../../molecules';
import { ROUTES, User } from '../../../../utils';
import { FormProvider, useForm } from 'react-hook-form';
import schema from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { InputPwdForm } from '../../../organisms';
import { theme } from '../../../themes';
import { darkModePalette } from '../../../themes/colors';

const defaultValues = {
    email: '',
    password: '',
  };

  const FormLogin = () =>
  {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false); 
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

        // altro
        handleReset();
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
        // altro
    }; 

    return(
        <Flex height='100vh' padding='7rem' flexDirection='column'>
            <Flex style={{padding: '0 0 1.5rem 0', margin: '1rem'}}>
                <img src="./images/login-titolo.svg" alt=""/>
            </Flex>
            <FormProvider {...methods}>
                <Stack spacing={3} style={{border: 'solid rgba(81, 70, 137, 0.7)', borderWidth: '1px 0 0 0'}}>
                    <Spacer width={'10px'} height={'10px'} />
                    <InputForm name='email' placeholder='Inserisci Email' label='Email' fontWeight={theme.fontWeights.bold} fontSize={theme.fontSizes.xs} error={errors?.email?.message}/>
                    <InputPwdForm type='password' name='password' placeholder='Inserisci Password' label='Password' fontWeight={theme.fontWeights.bold} fontSize={theme.fontSizes.xs} error={errors?.password?.message}/>
                </Stack>
                <Spacer width={'20px'} height={'25px'} />
                <a style={{textAlign:'center', fontWeight:theme.fontWeights.bold}} onClick={handleClickPassword}>Hai dimenticato la password?</a>
                <Spacer width={'20px'} height={'25px'} />
                <CheckboxForm onChange={handleChange}>Ricordami</CheckboxForm>
                <Spacer width={'20px'} height={'40px'} />
                <ButtonForm onClick={handleClickAccess} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Accedi</ButtonForm>
            </FormProvider>
        </Flex>
    )
}

export default FormLogin;
