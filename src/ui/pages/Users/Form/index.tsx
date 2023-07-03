import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputForm, SelectForm } from '../../../molecules';
import { ButtonForm, Modal } from '../../../atoms';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { darkModePalette } from '../../../themes/colors';
import { theme } from '../../../themes';
import { SettingsUser } from '../Types';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from '../validation';
import { useAppDispatch } from '../../../../store/applicationStore';
import { User } from '../../../../utils';
import { useEffect } from 'react';
import { createUser, editUser } from '../../../../store/user';
import { fetchUsers } from '../../../../store';

interface Props
{
    show: boolean;
    selectList:any[];
    take: number;
    skip: number;
    user: User | null;
    modalConfirmButton: string;
    handleShow: ()=> void;
}

const defaultValues = {
    email: '',
    risorsa: '',
    nome: '',
    cognome: '',
    password: '',
    confirmPwd: '',
    phone: '',
  };

const Form = ({show, selectList, skip, take, user, modalConfirmButton, handleShow}: Props) =>
{
    const dispatch = useAppDispatch();
    const initialPwd = `Nurale${new Date().getFullYear()}!`;
    
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

    const handleNew= async () =>
    {
        const hasErrors = await trigger();

        if(user)
        {
            setValue('password', '');
            setValue('confirmPwd', '');
        }
        
        if (!hasErrors && user)
        {
          return hasErrors;
        }

        if(getValues('password') !== getValues('confirmPwd') && !user)
        {
            setError('confirmPwd',{message: 'Le password non corrispondono'});
            return null;
        }

        if(user)
        {
            await dispatch(editUser(
                {
                    email: getValues('email'),
                    firstName: getValues('nome'),
                    lastName: getValues('cognome'),
                    phone: getValues('phone'),
                    resourceId: user.resourceId,
                    id: user.id,
                }
            ));
        }

        if(!user)
        {
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
        }
        await dispatch(fetchUsers(
            {
                search: '',
                skip: skip,
                take: take,
            }
        ));

        handleReset();
        handleShow();
        return;
    }

    const handleReset = () => {
        reset(defaultValues);
    };

    const generatePassword = () =>
    {
        setValue('password', Math.random().toString(36).slice(-9));
        setValue('confirmPwd', getValues('password'));
    }

    const handleResetPassword = () =>
    {
        return;
    }

    const handleDeleteFirstName = () =>
    {
        setValue('nome', '');
    }

    const handleDeleteLastName = () =>
    {
        setValue('cognome', '');
    }
    
    const handleDeletePhone = () =>
    {
        setValue('phone', '');
    }

    useEffect(()=>
    {
        if(user)
        {
            setValue('email', user.email);
            setValue('nome', user.firstName);
            setValue('cognome', user.lastName);
            setValue('risorsa', 'Caio Caio'); // DA RIVEDERE !!!!!!!!!!!!!!!!!!!!!!!!!
            return 
        }

        setValue('email', '');
        setValue('password', initialPwd);
        setValue('confirmPwd', initialPwd);
        setValue('nome', '');
        setValue('cognome','');
        return

    },[user])

    return(
        <Modal show={show}>
        <Flex width='100%' direction='column'>
            <FormProvider {...methods}>
                <Flex justifyContent='space-between'>
                    <InputForm disabled={user? true : false} label='Email' name='email' placeholder='Email' containerWidth='48%' fontWeight={theme.fontWeights.bold} error={errors?.email?.message}/>
                    <SelectForm options={selectList} name='risorsa' label='Risorsa' fontWeight={theme.fontWeights.bold} containerWidth='48%' error={errors?.risorsa?.message}/>
                </Flex>
                <Flex justifyContent='space-between'>
                    <InputForm deletable={user ? true : false} handleDelete={handleDeleteFirstName} label='Nome' name='nome' placeholder='Nome' containerWidth={user ? '33%' : '48%'} fontWeight={theme.fontWeights.bold} error={errors?.nome?.message}/>
                    <InputForm deletable={user ? true : false} handleDelete={handleDeleteLastName} label='Cognome' name='cognome' placeholder='Cognome' containerWidth={user ? '33%' : '48%'} fontWeight={theme.fontWeights.bold} error={errors?.cognome?.message}/>
                    {
                        user ? <InputForm deletable={user ? true : false} handleDelete={handleDeletePhone} label='Telefono' name='phone' placeholder='Telefono' containerWidth={user ? '33%' : '48%'} fontWeight={theme.fontWeights.bold} error={errors?.phone?.message}/>
                        : null
                    }
                </Flex>
                {
                    user ? null : 
                    <Flex justifyContent='space-between'>
                        <InputForm label='Password' name='password' placeholder='Password' containerWidth='25%' fontWeight={theme.fontWeights.bold} error={errors?.password?.message}/>
                        <ButtonForm margin='auto 0' width='fit-content' onClick={generatePassword} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Genera</ButtonForm>
                        <InputForm label='Conferma Password' name='confirmPwd' placeholder='Conferma Password' containerWidth='48%' fontWeight={theme.fontWeights.bold} error={errors?.confirmPwd?.message}/>
                    </Flex>
                }
                {
                    user ? <ButtonForm width='fit-content' onClick={handleResetPassword} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                                Reset Password
                            </ButtonForm>
                    : null
                }
            </FormProvider>
        </Flex>
        <Flex width='100%' justifyContent='right'>
            <Flex>
                <Stack spacing={3} direction='row'>
                    <ButtonForm backgroundColor={darkModePalette.purple40} color={darkModePalette.purple} leftIcon={<CloseIcon />} width='fit-content' onClick={handleShow} _hover={{bg: darkModePalette.violet10}} fontSize={theme.fontSizes.xxs}>
                        Annulla
                    </ButtonForm>
                    <ButtonForm leftIcon={<CheckIcon />} width='fit-content' onClick={handleNew} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                        {modalConfirmButton}
                    </ButtonForm>
                </Stack>
            </Flex>
        </Flex> 
    </Modal>
    )
}

export default Form;