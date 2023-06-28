import { useSelector } from 'react-redux';
import { fetchUsers, getUsers, getUsersPagination } from '../../../store';
import { useEffect, useState } from 'react';
import { UsersCols, usersList } from '../../../utils';
import { InputForm, PageLayout, SelectForm, Table } from '../../molecules';
import { Flex, Stack } from '@chakra-ui/react';
import { ButtonForm, Icons, Modal } from '../../atoms';
import { darkModePalette } from '../../themes/colors';
import { theme } from '../../themes';
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SettingsUser } from './Types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from './validation';
import '../../../utils/index.css';
import InputPage from '../../molecules/InputPage';
import { useAppDispatch } from '../../../store/applicationStore';
import { createUser } from '../../../store/user';
import { Pagination } from '../../organisms';

const defaultValues = {
    email: '',
    risorsa: '',
    nome: '',
    cognome: '',
    password: '',
    confirmPwd: '',
  };
interface Props
{
    name?: string;
}

const Users = ({name}:Props) =>
{
    const initialPwd = `Nurale${new Date().getFullYear()}!`;

    const dispatch = useAppDispatch();
    const users = useSelector(getUsers);
    const [show, setShow] = useState(false);
    const take = 10;

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
    } = methods;

    const handlShow = () =>
    {
        setShow(!show);
        setValue('password', initialPwd);
        setValue('confirmPwd', initialPwd);
        handleReset();
    }

    const generatePassword = () =>
    {
        setValue('password', Math.random().toString(36).slice(-9));
        setValue('confirmPwd', getValues('password'));
    }

    const handleNew= async () =>
    {
        const hasErrors = await trigger();

        if (!hasErrors)
        {
          return;
        }

        if(getValues('password') !== getValues('confirmPwd'))
        {
            setError('confirmPwd',{message: 'Le password non corrispondono'});
            return null;
        }

        await dispatch(createUser(
            {
                email: getValues('email'),
                password: getValues('password'),
                passwordConfirm: getValues('confirmPwd'),
                firstName: getValues('nome'),
                lastName: getValues('cognome'),
                resourceId: 10,
            }
        ));

        await dispatch(fetchUsers(
                {
                    search: '',
                    skip: 0,
                    take: 10,
                }
        ));

        handleReset();
        handlShow();
        return;
    }

    const handleReset = () => {
        reset(defaultValues);
    };

    useEffect(()=>
    {
        dispatch(fetchUsers(
            {
                search: '',
                skip: 0,
                take: 10,
            }
        ));

        setValue('password', initialPwd);
        setValue('confirmPwd', initialPwd);
    },[]);

    return (
        <PageLayout name={name}>
            <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} leftIcon={<AddIcon />} width='fit-content' onClick={handlShow} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Aggiungi nuovo</ButtonForm>
            <Flex direction='column'>
                <Table data={users} columns={UsersCols} display={show ? 'none' : 'block'}/>
                <p style={{display: show ? 'block' : 'none', color: `${darkModePalette.pink100}`, fontSize: theme.fontSizes.lg }}>Aggiungi nuovo utente</p>
                <Modal show={show}>
                    <Flex width='100%' direction='row'>
                        <FormProvider {...methods}>
                            <Flex width='100%' direction='column'>
                                <Flex>
                                    <InputForm label='Email' name='email' placeholder='Email' containerWidth='90%' fontWeight={theme.fontWeights.bold} error={errors?.email?.message}/>
                                </Flex>
                                <Flex>
                                    <InputForm label='Nome' name='nome' placeholder='Nome' containerWidth='90%' fontWeight={theme.fontWeights.bold} error={errors?.nome?.message}/>
                                </Flex>
                                <Flex alignItems='center' justifyContent='space-around'>
                                    <InputForm label='Password' name='password' placeholder='Password' containerWidth='69999uiwi                                                                                                                                                                             0%' fontWeight={theme.fontWeights.bold} error={errors?.password?.message}/>
                                    <ButtonForm margin='auto' width='fit-content' onClick={generatePassword} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Genera</ButtonForm>
                                </Flex>
                            </Flex>
                            <Flex width='100%' direction='column'>
                                <Flex>
                                    <SelectForm options={usersList} name='risorsa' label='Risorsa' fontWeight={theme.fontWeights.bold} error={errors?.risorsa?.message}/>
                                </Flex>
                                <Flex>
                                    <InputForm label='Cognome' name='cognome' placeholder='Cognome' containerWidth='100%' fontWeight={theme.fontWeights.bold} error={errors?.cognome?.message}/>
                                </Flex>
                                <Flex alignItems='center'>
                                    <InputForm label='Conferma Password' name='confirmPwd' placeholder='Conferma Password' containerWidth='100%' fontWeight={theme.fontWeights.bold} error={errors?.confirmPwd?.message}/>
                                </Flex>
                            </Flex>
                        </FormProvider>
                    </Flex>
                    <Flex width='100%' justifyContent='right'>
                        <Flex>
                            <Stack spacing={3} direction='row'>
                                <ButtonForm backgroundColor={darkModePalette.purple40} color={darkModePalette.purple} leftIcon={<CloseIcon />} width='fit-content' onClick={handlShow}_hover={{bg: darkModePalette.violet10}} fontSize={theme.fontSizes.xxs}>Annulla</ButtonForm>
                                <ButtonForm leftIcon={<CheckIcon />} width='fit-content' onClick={handleNew} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Conferma</ButtonForm>
                            </Stack>
                        </Flex>
                    </Flex> 
                </Modal>
                <Pagination take={take} fetch={fetchUsers} show={show} getPagination={getUsersPagination}/>
            </Flex>
        </PageLayout>
    )
}

export default Users;