import { useSelector } from 'react-redux';
import { fetchUsers, getUsers } from '../../../store';
import { useEffect, useState } from 'react';
import { UsersCols } from '../../../utils';
import { InputForm, PageLayout, Table } from '../../molecules';
import { Flex, Stack } from '@chakra-ui/react';
import { ButtonForm, Icons, Modal } from '../../atoms';
import { darkModePalette } from '../../themes/colors';
import { theme } from '../../themes';
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SettingsUser } from './Types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from './validation';
import './index.css'
import InputPage from '../../molecules/InputPage';
import { useAppDispatch } from '../../../store/applicationStore';
import { createUser } from '../../../store/user';

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
    const initialPwd = 'Nurale2023!';

    const dispatch = useAppDispatch();
    const users = useSelector(getUsers);
    const [show, setShow] = useState(false);
    const [numPage, setNumPage] = useState<number>(1);

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
                resourceId: 0,
            }
        ));

        await dispatch(fetchUsers(
                {
                    search: '',
                    skip: numPage * 10,
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

    const handleIncreasePage = () =>
    {
        let page = numPage;
        page++;
        
        setNumPage(numPage && page);
    }

    const handleDecreasePage = () =>
    {
        let page = numPage;
        page--;

        (numPage >= 2) ? setNumPage(numPage && page) : null;
    }

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

    // useEffect(()=>
    // {
    //     dispatch(fetchUsers(
    //         {
    //             search: '',
    //             skip: numPage * 10,
    //             take: 10,
    //         }
    //     ));
    // },[numPage]);

    return (
        <PageLayout name={name}>
            <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} leftIcon={<AddIcon />} width='fit-content' onClick={handlShow} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Aggiungi nuovo</ButtonForm>
            <Flex direction='column'>
                <Table data={users} columns={UsersCols} display={show ? 'none' : 'block'}/>
                <p style={{display: show ? 'block' : 'none', color: `${darkModePalette.pink100}`, fontSize: theme.fontSizes.lg }}>Aggiungi nuovo utente</p>
                <Modal show={show}>
                    <Flex width='100%' direction='column'>
                        <FormProvider {...methods}>
                            <Flex width='100%' direction='column'>
                                <Flex placeContent='space-between'>
                                    <InputForm label='Email' name='email' placeholder='Email' containerWidth='48%' fontWeight={theme.fontWeights.bold} error={errors?.email?.message}/>
                                    <InputForm label='Risorsa' name='risorsa' placeholder='Risorsa' containerWidth='50%' fontWeight={theme.fontWeights.bold} error={errors?.risorsa?.message}/>
                                </Flex>
                                <Flex placeContent='space-between'>
                                    <InputForm label='Nome' name='nome' placeholder='Nome' containerWidth='48%' fontWeight={theme.fontWeights.bold} error={errors?.nome?.message}/>
                                    <InputForm label='Cognome' name='cognome' placeholder='Cognome' containerWidth='50%' fontWeight={theme.fontWeights.bold} error={errors?.cognome?.message}/>
                                </Flex>
                                <Flex placeContent='space-between' alignItems='center'>
                                    <InputForm label='Password' name='password' placeholder='Password' containerWidth='35%' fontWeight={theme.fontWeights.bold} error={errors?.password?.message}/>
                                    <ButtonForm width='fit-content' onClick={generatePassword} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Genera</ButtonForm>
                                    <InputForm label='Conferma Password' name='confirmPwd' placeholder='Conferma Password' containerWidth='46%' fontWeight={theme.fontWeights.bold} error={errors?.confirmPwd?.message}/>
                                </Flex>
                            </Flex>
                            <Flex width='100%' justifyContent='right'>
                                <Flex>
                                    <Stack spacing={3} direction='row'>
                                        <ButtonForm backgroundColor={darkModePalette.purple40} color={darkModePalette.purple} leftIcon={<CloseIcon />} width='fit-content' onClick={handlShow}_hover={{bg: darkModePalette.violet10}} fontSize={theme.fontSizes.xxs}>Annulla</ButtonForm>
                                        <ButtonForm leftIcon={<CheckIcon />} width='fit-content' onClick={handleNew} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Conferma</ButtonForm>
                                    </Stack>
                                </Flex>
                            </Flex> 
                        </FormProvider>
                    </Flex>
                </Modal>
                <Flex justifyContent='right' marginTop='2rem' display={show ? 'none' : 'flex'}>
                    <InputPage containerWidth='10%' value={numPage} type='number' label='Pagina' name='Pagina' placeholder='Num. pagina' fontWeight={theme.fontWeights.bold}/>
                    <ButtonForm background={darkModePalette.gray} margin='0 5px 0 15px' padding='0' width='fit-content' onClick={handleDecreasePage}>
                        <Icons name='btnTriangoloSn' size={1}/>
                    </ButtonForm>
                    <ButtonForm background={darkModePalette.gray} padding='0' width='fit-content' onClick={handleIncreasePage}>
                        <Icons name='btnTriangoloDx' size={1}/>
                    </ButtonForm>
                </Flex>
            </Flex>
        </PageLayout>
    )
}

export default Users;