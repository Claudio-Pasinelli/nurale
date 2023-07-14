import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from './validation';
import { ROUTES, User } from 'utils';
import { ButtonForm, InputForm, Spacer, theme } from 'ui';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  email: '',
};

const RecuperoPassword = () => {
  const { t } = useTranslation();
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

  const handleClickAccess = async () => {
    const hasErrors = await trigger();
    if (!hasErrors) {
      return;
    }

    // altro
  };

  const handleClickLogin = () => {
    return navigate(ROUTES.login);
  };
  // fontWeight={theme.fontWeights.bold} fontSize={theme.fontSizes.xs}

  return (
    <Flex
      flexDirection='column'
      width='100vw'
      height='100vh'
      background='linear-gradient(299.92deg, #514689 18.26%, #EF426F 117.31%)'
      alignItems='center'
      justifyContent='center'
    >
      <Flex
        flexDirection='column'
        height='500px'
        backgroundColor='white'
        borderRadius='38px'
        padding='5.5rem 3rem 0 3rem'
      >
        <Flex
          style={{
            border: 'solid rgba(81, 70, 137, 0.7)',
            borderWidth: '0 0 1px 0',
            padding: '0 0 2rem 0',
          }}
        >
          <img src='./images/login-titolo.svg' alt='' />
          <Spacer width={'20px'} height={'20px'} />
        </Flex>
        <Spacer width={'20px'} height={'20px'} />
        <FormProvider {...methods}>
          <InputForm
            name='email'
            placeholder={t('recupero-password.inserisci-email')}
            label={t('recupero-password.email')}
            fontWeight={theme.fontWeights.bold}
            fontSize={theme.fontSizes.xs}
            error={errors?.email?.message}
          />
          <Spacer width={'20px'} height={'20px'} />
          <ButtonForm
            onClick={handleClickAccess}
            backgroundColor='#EF426F'
            fontWeight={theme.fontWeights.bold}
            fontSize={theme.fontSizes.sm}
            _hover={{ bg: '#d73e65' }}
          >
            {t('recupero-password.recupera-password')}
          </ButtonForm>
        </FormProvider>
        <a
          style={{
            textAlign: 'center',
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes.xss,
            color: '#514689',
            marginTop: '1.8rem',
          }}
          onClick={handleClickLogin}
        >
          {t('recupero-password.torna-al-login')}
        </a>
      </Flex>
    </Flex>
  );
};

export default RecuperoPassword;
