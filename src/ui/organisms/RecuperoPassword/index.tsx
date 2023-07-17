import { Flex, Stack, Switch } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from './validation';
import { ROUTES, User } from 'utils';
import { ButtonForm, InputForm, Spacer, theme } from 'ui';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import i18n from 'i18n.config';

const defaultValues = {
  email: '',
};

const RecuperoPassword = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [isItalianOn, setIsItalianOn] = useState(true);

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

  const handleChangeLanguage = () => {
    let lang;

    if (localStorage.getItem('lang') === 'it') {
      lang = 'en';
      localStorage.setItem('lang', lang);
      setIsItalianOn(false);
      return i18n.changeLanguage(lang);
    } else if (localStorage.getItem('lang') === 'en') {
      lang = 'it';
      localStorage.setItem('lang', lang);
      setIsItalianOn(true);
      return i18n.changeLanguage(lang);
    }
  };

  useEffect(() => {
    localStorage.getItem('lang') === 'it' ? setIsItalianOn(true) : setIsItalianOn(false);
  }, []);

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
        <Flex cursor='pointer' margin='24px 0 0 0'>
          <Flex>
            <span style={{ padding: '0 1.3rem 0 0', fontWeight: theme.fontWeights.bold }}>
              {isItalianOn ? 'Italiano' : 'English'}
            </span>
            <Stack align='center' direction='row' justifyContent='space-between'>
              <Switch size='md' onChange={handleChangeLanguage} />
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RecuperoPassword;
