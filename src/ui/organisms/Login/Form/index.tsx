import { Flex, Stack, Switch } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import schema from '../validation';
import { useTranslation } from 'react-i18next';
import { AppDispatch, loginUser } from 'store';
import { EMAIL } from 'utils/costants/auth';
import { ROUTES, User } from 'utils';
import { darkModePalette } from 'ui/themes/colors';
import { ButtonForm, CheckboxForm, InputForm, Spacer, theme } from 'ui';
import i18n from 'i18n.config';

const defaultValues = {
  email: '',
  password: '',
};

const FormLogin = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [isItalianOn, setIsItalianOn] = useState(true);

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

  const handleClickAccess = async () => {
    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    !checked ? Cookies.remove(EMAIL) : Cookies.set(EMAIL, getValues(`${EMAIL}`));

    const response = await dispatch(loginUser(getValues()));

    if (response.payload === null) {
      setError('email', { message: 'Email non valida' });
      setError('password', { message: 'Password non valida' });
      return null;
    }

    handleReset();
    setIsOk(true);
    return navigate(ROUTES.home);
  };

  const handleClickPassword = () => {
    return navigate(ROUTES.recuperoPassword);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  const handleChange = () => {
    setChecked(!checked);
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
    Cookies.get(EMAIL) && setValue('email', Cookies.get(EMAIL) as string);

    if (Cookies.get(EMAIL)) {
      setChecked(true);
    }

    localStorage.getItem('lang') === 'it' ? setIsItalianOn(true) : setIsItalianOn(false);
  }, []);

  return (
    <Flex height='100vh' padding='7rem' flexDirection='column'>
      <Flex style={{ padding: '0 0 1.5rem 0', margin: '1rem' }}>
        <img src='./images/login-titolo.svg' alt='' />
      </Flex>
      <FormProvider {...methods}>
        <Stack
          spacing={3}
          style={{ border: `solid ${darkModePalette.purple40}`, borderWidth: '1px 0 0 0' }}
        >
          <Spacer width={'10px'} height={'10px'} />
          <InputForm
            name='email'
            placeholder={t('login.inserisci-email')}
            label={t('login.email')}
            fontWeight={theme.fontWeights.bold}
            fontSize={theme.fontSizes.xs}
            error={errors?.email?.message}
          />
          <InputForm
            name='password'
            placeholder={t('login.inserisci-password')}
            label={t('login.password')}
            type='password'
            fontWeight={theme.fontWeights.bold}
            fontSize={theme.fontSizes.xs}
            error={errors?.email?.message}
          />
        </Stack>
        <Spacer width={'20px'} height={'25px'} />
        <a
          style={{ textAlign: 'center', fontWeight: theme.fontWeights.bold }}
          onClick={handleClickPassword}
        >
          {t('login.hai-dimenticato-la-password')}
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
        <Spacer width={'20px'} height={'25px'} />
        <CheckboxForm onChange={handleChange} isChecked={checked}>
          {t('login.ricordami')}
        </CheckboxForm>
        <Spacer width={'20px'} height={'40px'} />
        <ButtonForm
          isLoading={isOk}
          onClick={handleClickAccess}
          backgroundColor={darkModePalette.pink100}
          _hover={{ bg: darkModePalette.pink70 }}
          fontSize={theme.fontSizes.xxs}
        >
          {t('login.accedi')}
        </ButtonForm>
      </FormProvider>
    </Flex>
  );
};

export default FormLogin;
