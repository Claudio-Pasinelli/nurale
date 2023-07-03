import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputForm, SwitchForm, TextAreaForm } from '../../../molecules';
import { ButtonForm, Modal } from '../../../atoms';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { darkModePalette } from '../../../themes/colors';
import { theme } from '../../../themes';
import { SettingsTypeOfPayment } from '../Types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../../store/applicationStore';
import { useEffect } from 'react';
import { TypeOfPayment } from '../../../../utils';
import { fetchTypeOfPayments } from '../../../../store/typeOfPayments';
import schema from '../validation';
import { createTypeOfPayment, editTypeOfPayment } from '../../../../store';

interface Props
{
    show: boolean;
    skip: number;
    take: number;
    typeOfPayment: TypeOfPayment | null;
    modalConfirmButton: string;
    handleShow: ()=> void;
}

const defaultValues = {
    name: '',
    daysBetweenPayments: 30,
    daysOffsetPayments: undefined,
    daysToFirstPayment: undefined,
    movePaymentsToTheEndOfMonth: false,
    numberOfPayments: 1,
    note: '',
  };

const Form = ({show, skip, take, typeOfPayment, modalConfirmButton, handleShow}: Props) =>
{
    const dispatch = useAppDispatch();
    
    const methods = useForm<SettingsTypeOfPayment>({
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
        console.log(getValues('daysToFirstPayment'));
        console.log(typeof(getValues('daysToFirstPayment')));

        (getValues('daysToFirstPayment')) ? null : setValue('daysToFirstPayment', 0);
        (getValues('daysOffsetPayments')) ? null : setValue('daysOffsetPayments', 0);
        const hasErrors = await trigger();
        
        console.log(getValues('daysToFirstPayment'));
        console.log(typeof(getValues('daysToFirstPayment')));

        if (!hasErrors)
        {
            console.log(errors)
          return hasErrors;
        }

        if(typeOfPayment)
        {
            await dispatch(editTypeOfPayment(
                {
                    name: getValues('name'),
                    note: getValues('note'),
                    daysBetweenPayments: getValues('daysBetweenPayments'),
                    daysOffsetPayments: getValues('daysOffsetPayments'),
                    daysToFirstPayment: getValues('daysToFirstPayment'),
                    movePaymentsToTheEndOfMonth: getValues('movePaymentsToTheEndOfMonth'),
                    numberOfPayments: getValues('numberOfPayments'),
                    id: typeOfPayment.id,
                }
            ));
        }

        if(!typeOfPayment)
        {
            await dispatch(createTypeOfPayment(
                {
                    name: getValues('name'),
                    note: getValues('note'),
                    daysBetweenPayments: getValues('daysBetweenPayments'),
                    daysOffsetPayments: getValues('daysOffsetPayments'),
                    daysToFirstPayment: getValues('daysToFirstPayment'),
                    movePaymentsToTheEndOfMonth: getValues('movePaymentsToTheEndOfMonth'),
                    numberOfPayments: getValues('numberOfPayments'),
                }
            ));
        }

        await dispatch(fetchTypeOfPayments(
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

    const handleClick = () =>
    {
        return
    }
    useEffect(()=>
    {
        if(typeOfPayment)
        {
            setValue('name', typeOfPayment.name);
            setValue('note', typeOfPayment.note);
            setValue('daysBetweenPayments', typeOfPayment.daysBetweenPayments);
            setValue('daysOffsetPayments', typeOfPayment.daysOffsetPayments);
            setValue('daysToFirstPayment', typeOfPayment.daysToFirstPayment);
            setValue('movePaymentsToTheEndOfMonth', typeOfPayment.movePaymentsToTheEndOfMonth);
            return setValue('numberOfPayments', typeOfPayment.numberOfPayments);
        }

        return handleReset();

    },[typeOfPayment])

    return(
        <Modal show={show}>
            <FormProvider {...methods}>
                <Flex width='100%' direction='row' alignItems='center'>
                    <Flex width='100%' direction='column'>
                        <Flex justifyContent='space-between'>
                            <InputForm label='Nome' name='name' placeholder='Nome' containerWidth='70%' fontWeight={theme.fontWeights.bold} error={errors?.name?.message}/>
                            <ButtonForm margin='auto 0' width='25%' onClick={handleClick} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                                Genera nome
                            </ButtonForm>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex width='100%' direction='column'>
                    <Flex justifyContent='space-between'>
                        <InputForm type='number' label='Giorni al primo pagamento' name='daysToFirstPayment' placeholder='Giorni al primo pagamento' containerWidth='49%' fontWeight={theme.fontWeights.bold} error={errors?.daysToFirstPayment?.message}/>
                        <InputForm type='number' label='Giorni tra i pagamenti' name='daysBetweenPayments' placeholder='Giorni tra i pagamenti' containerWidth='49%' fontWeight={theme.fontWeights.bold} error={errors?.daysBetweenPayments?.message}/>
                    </Flex>
                </Flex>
                <Flex width='100%' direction='column'>
                    <Flex justifyContent='space-between'>
                        <InputForm type='number' label='Numero di pagamenti' name='numberOfPayments' placeholder='Giorni al primo pagamento' containerWidth='49%' fontWeight={theme.fontWeights.bold} error={errors?.numberOfPayments?.message}/>
                        <InputForm type='number' label='Giorni scostamento pagamento' name='daysOffsetPayments' placeholder='Giorni scostamento pagamento' containerWidth='49%' fontWeight={theme.fontWeights.bold} error={errors?.daysOffsetPayments?.message}/>
                    </Flex>
                </Flex>
                <Flex width='100%'>
                    <Flex width='100%'>
                        <TextAreaForm label='Note' name='note' placeholder='Note' containerWidth='100%' error={errors?.note?.message}/>
                    </Flex>
                </Flex>
                <Flex width='100%'>
                    <Flex width='100%'>
                        <SwitchForm label='Spostare i pagamenti alla fine del mese' name='movePaymentsToTheEndOfMonth' />
                    </Flex>
                </Flex>
            </FormProvider>
            <Flex width='100%' justifyContent='right'>
                <Flex>
                    <Stack spacing={3} direction='row'>
                        <ButtonForm leftIcon={<CloseIcon />} backgroundColor={darkModePalette.purple40} color={darkModePalette.purple} width='fit-content' onClick={handleShow}_hover={{bg: darkModePalette.violet10}} fontSize={theme.fontSizes.xxs}>Annulla</ButtonForm>
                        <ButtonForm leftIcon={<CheckIcon />} width='fit-content' onClick={handleNew} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>{modalConfirmButton}</ButtonForm>
                    </Stack>
                </Flex>
            </Flex> 
        </Modal>
    )
}

export default Form;