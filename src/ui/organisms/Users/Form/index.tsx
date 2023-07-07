import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SettingsUser } from '../Types';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from '../validation';
import { useEffect, useState } from 'react';
import { createUser, editUser, fetchUsers, useAppDispatch } from 'store';
import { ButtonForm, InputForm, Modal, SelectForm, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { User } from 'utils';

interface Props {
  show: boolean;
  selectList: any[];
  take: number;
  skip: number;
  user: User | null;
  modalConfirmButton: string;
  handleShow: () => void;
}

const defaultValues = {
  email: '',
  risorsa: '',
  nome: '',
  cognome: '',
  password: '',
  passwordConfirm: '',
  phone: '',
};

const Form = ({ show, selectList, skip, take, user, modalConfirmButton, handleShow }: Props) => {
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
          resourceId: 10,
        }),
      );
    }
    await dispatch(
      fetchUsers({
        search: '',
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
      setValue('risorsa', 'Caio Caio'); // DA RIVEDERE !!!!!!!!!!!!!!!!!!!!!!!!!
      return;
    }

    unregister('phone');
    setValue('email', '');
    setValue('password', initialPwd);
    setValue('passwordConfirm', initialPwd);
    setValue('nome', '');
    setValue('cognome', '');
    return;
  }, [user]);

  return (
    <Modal show={show}>
      <Flex width='100%' direction='column'>
        <FormProvider {...methods}>
          <Flex justifyContent='space-between'>
            <InputForm
              isDisabled={!!user}
              label='Email'
              name='email'
              placeholder='Email'
              containerWidth='48%'
              fontWeight={theme.fontWeights.bold}
              error={errors?.email?.message}
            />
            <SelectForm
              options={selectList}
              name='risorsa'
              label='Risorsa'
              fontWeight={theme.fontWeights.bold}
              containerWidth='48%'
              error={errors?.risorsa?.message}
            />
          </Flex>
          <Flex justifyContent='space-between'>
            <InputForm
              handleDelete={handleDeleteFirstName}
              label='Nome'
              name='nome'
              placeholder='Nome'
              containerWidth={user ? '33%' : '48%'}
              fontWeight={theme.fontWeights.bold}
              error={errors?.nome?.message}
            />
            <InputForm
              handleDelete={handleDeleteLastName}
              label='Cognome'
              name='cognome'
              placeholder='Cognome'
              containerWidth={user ? '33%' : '48%'}
              fontWeight={theme.fontWeights.bold}
              error={errors?.cognome?.message}
            />
            {user ? (
              <InputForm
                handleDelete={handleDeletePhone}
                label='Telefono'
                name='phone'
                placeholder='Telefono'
                containerWidth={user ? '33%' : '48%'}
                fontWeight={theme.fontWeights.bold}
                error={errors?.phone?.message}
              />
            ) : null}
          </Flex>
          {user ? null : (
            <Flex justifyContent='space-between'>
              <InputForm
                showEye={false}
                label='Password'
                name='password'
                placeholder='Password'
                type='password'
                containerWidth='35%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.password?.message}
              />
              <ButtonForm
                margin='auto 0'
                width='fit-content'
                onClick={generatePassword}
                backgroundColor={darkModePalette.pink100}
                _hover={{ bg: darkModePalette.pink70 }}
                fontSize={theme.fontSizes.xxs}
              >
                Genera
              </ButtonForm>
              <InputForm
                showEye={false}
                label='Conferma Password'
                name='passwordConfirm'
                placeholder='Conferma Password'
                type='password'
                containerWidth='48%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.passwordConfirm?.message}
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
              Reset Password
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
              Annulla
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
              {modalConfirmButton}
            </ButtonForm>
          </Stack>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default Form;
