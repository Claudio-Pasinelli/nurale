import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SettingsUser } from '../Types';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from '../validation';
import { useEffect, useState } from 'react';
import { createUser, editUser, fetchUsers, getResources, useAppDispatch } from 'store';
import { ButtonForm, InputForm, Modal, SelectForm, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { User } from 'utils';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface Props {
  show: boolean;
  selectList: any[];
  take: number;
  skip: number;
  user: User | null;
  handleShow: () => void;
}

const defaultValues = {
  email: '',
  risorsa: undefined,
  nome: '',
  cognome: '',
  password: '',
  passwordConfirm: '',
  phone: '',
};

const Form = ({ show, selectList, skip, take, user, handleShow }: Props) => {
  const { t } = useTranslation();

  const resources = useSelector(getResources);

  const [currentResourceName, setCurrentResourceName] = useState<string | undefined>('');

  const dispatch = useAppDispatch();
  const initialPwd = `Nurale${new Date().getFullYear()}!`;
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<SettingsUser>({
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
    unregister,
  } = methods;

  const handleNew = async () => {
    setIsLoading(true);

    for (const resource of resources) {
      getValues('risorsa') === `${resource.firstName} ${resource.lastName}`
        ? setValue('risorsa', resource.id)
        : null;
    }

    const hasErrors = await trigger();

    if (user) {
      setValue('password', '');
      setValue('passwordConfirm', '');
    }

    if (!hasErrors) {
      setIsLoading(false);
      return hasErrors;
    }

    if (user) {
      await dispatch(
        editUser({
          email: getValues('email'),
          firstName: getValues('nome'),
          lastName: getValues('cognome'),
          phone: getValues('phone'),
          resourceId: user.resourceId,
          id: user.id,
        }),
      );
    }

    if (!user) {
      await dispatch(
        createUser({
          email: getValues('email'),
          password: getValues('password'),
          passwordConfirm: getValues('passwordConfirm'),
          firstName: getValues('nome'),
          lastName: getValues('cognome'),
          resourceId: Number(getValues('risorsa')),
        }),
      );
    }
    await dispatch(
      fetchUsers({
        skip: skip,
        take: take,
      }),
    );

    handleReset();
    handleShow();
    setIsLoading(false);
    return;
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  const generatePassword = () => {
    setValue('password', Math.random().toString(36).slice(-9));
    setValue('passwordConfirm', getValues('password'));
  };

  const handleResetPassword = () => {
    return;
  };

  const handleDeleteFirstName = () => {
    setValue('nome', '');
  };

  const handleDeleteLastName = () => {
    setValue('cognome', '');
  };

  const handleDeletePhone = () => {
    setValue('phone', '');
  };

  useEffect(() => {
    if (user) {
      setValue('email', user.email);
      setValue('nome', user.firstName);
      setValue('cognome', user.lastName);
      user.phone && setValue('phone', user.phone);

      for (const resource of resources) {
        user.resourceId === resource.id
          ? setCurrentResourceName(`${resource.firstName} ${resource.lastName}`)
          : null;
      }

      setValue('risorsa', user.resourceId);
      return;
    }

    setCurrentResourceName('');
    unregister('phone');
    setValue('email', '');
    setValue('password', initialPwd);
    setValue('passwordConfirm', initialPwd);
    setValue('nome', '');
    setValue('cognome', '');
    return;
  }, [user]);

  console.log(selectList);

  return (
    <Modal show={show}>
      <Flex width='100%' direction='column'>
        <FormProvider {...methods}>
          <Flex justifyContent='space-between'>
            <InputForm
              isDisabled={!!user}
              label={t('users.form.aggiungi.email')}
              name='email'
              placeholder={t('users.form.aggiungi.email-placeholder')}
              containerWidth='48%'
              fontWeight={theme.fontWeights.bold}
              error={errors?.email?.message && t(`${errors?.email?.message}`)}
            />
            <SelectForm
              objectName={currentResourceName}
              options={selectList}
              name='risorsa'
              label={t('users.form.aggiungi.risorsa')}
              fontWeight={theme.fontWeights.bold}
              containerWidth='48%'
              error={errors?.risorsa?.message && t(`${errors?.risorsa?.message}`)}
            />
          </Flex>
          <Flex justifyContent='space-between'>
            <InputForm
              handleDelete={handleDeleteFirstName}
              label={t('users.form.aggiungi.nome')}
              name='nome'
              placeholder={t('users.form.aggiungi.nome-placeholder')}
              containerWidth={user ? '33%' : '48%'}
              fontWeight={theme.fontWeights.bold}
              error={errors?.nome?.message && t(`${errors?.nome?.message}`)}
            />
            <InputForm
              handleDelete={handleDeleteLastName}
              label={t('users.form.aggiungi.cognome')}
              name='cognome'
              placeholder={t('users.form.aggiungi.cognome-placeholder')}
              containerWidth={user ? '33%' : '48%'}
              fontWeight={theme.fontWeights.bold}
              error={errors?.cognome?.message && t(`${errors?.cognome?.message}`)}
            />
            {user ? (
              <InputForm
                handleDelete={handleDeletePhone}
                label={t('users.form.modifica.telefono')}
                name='phone'
                placeholder={t('users.form.modifica.telefono-placeholder')}
                containerWidth={user ? '33%' : '48%'}
                fontWeight={theme.fontWeights.bold}
                error={errors?.phone?.message && t(`${errors?.phone?.message}`)}
              />
            ) : null}
          </Flex>
          {user ? null : (
            <Flex justifyContent='space-between'>
              <InputForm
                label={t('users.form.aggiungi.password')}
                name='password'
                placeholder={t('users.form.aggiungi.password-placeholder')}
                containerWidth='35%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.password?.message && t(`${errors?.password?.message}`)}
              />
              <ButtonForm
                margin='auto 0'
                width='fit-content'
                onClick={generatePassword}
                backgroundColor={darkModePalette.pink100}
                _hover={{ bg: darkModePalette.pink70 }}
                fontSize={theme.fontSizes.xxs}
              >
                {t('users.form.aggiungi.genera')}
              </ButtonForm>
              <InputForm
                label={t('users.form.aggiungi.conferma-password')}
                name='passwordConfirm'
                placeholder={t('users.form.aggiungi.conferma-password-placeholder')}
                containerWidth='48%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.passwordConfirm?.message && t(`${errors?.passwordConfirm?.message}`)}
              />
            </Flex>
          )}
          {user ? (
            <ButtonForm
              width='fit-content'
              onClick={handleResetPassword}
              backgroundColor={darkModePalette.pink100}
              _hover={{ bg: darkModePalette.pink70 }}
              fontSize={theme.fontSizes.xxs}
            >
              {t('users.form.modifica.reset-password')}
            </ButtonForm>
          ) : null}
        </FormProvider>
      </Flex>
      <Flex width='100%' justifyContent='right'>
        <Flex>
          <Stack spacing={3} direction='row'>
            <ButtonForm
              backgroundColor={darkModePalette.purple40}
              color={darkModePalette.purple}
              leftIcon={<CloseIcon />}
              width='fit-content'
              onClick={() => {
                handleShow();
                handleReset();
              }}
              _hover={{ bg: darkModePalette.violet10 }}
              fontSize={theme.fontSizes.xxs}
            >
              {t('form.annulla')}
            </ButtonForm>
            <ButtonForm
              leftIcon={<CheckIcon />}
              width='fit-content'
              onClick={handleNew}
              backgroundColor={darkModePalette.pink100}
              _hover={{ bg: darkModePalette.pink70 }}
              fontSize={theme.fontSizes.xxs}
              isLoading={isLoading}
            >
              {user ? t('form.salva') : t('form.conferma')}
            </ButtonForm>
          </Stack>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default Form;
