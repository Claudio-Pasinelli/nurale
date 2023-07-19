import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from '../validation';
import { useEffect, useState } from 'react';
import { ButtonForm, InputForm, Modal, SelectForm, TextAreaForm, theme } from 'ui';
import { createCustomer, editCustomer, fetchCustomers, useAppDispatch } from 'store';
import { SettingsCustomer } from '../Types';
import { Customer } from 'utils';
import { darkModePalette } from 'ui/themes/colors';
import { useTranslation } from 'react-i18next';
interface Props {
  show: boolean;
  selectList: any[];
  customer: Customer | null;
  handleShow: () => void;
}

const defaultValues = {
  name: '',
  typeOfPaymentId: undefined,
  note: '',
};

const Form = ({ show, selectList, customer, handleShow }: Props) => {
  const { t } = useTranslation();

  const [currentCustomerName, setCurrentCustomerName] = useState<string | undefined>('');

  const dispatch = useAppDispatch();

  const methods = useForm<SettingsCustomer>({
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

  const handleNew = async () => {
    if (getValues('typeOfPaymentId')) {
      const typeOfPayment = getValues('typeOfPaymentId');

      for (const typeOfPaymentObj of selectList) {
        typeOfPayment === typeOfPaymentObj.name
          ? setValue('typeOfPaymentId', typeOfPaymentObj.id)
          : null;
      }
    }

    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    if (customer) {
      await dispatch(
        editCustomer({
          name: getValues('name'),
          typeOfPaymentId: getValues('typeOfPaymentId'),
          note: getValues('note'),
          id: customer.id,
        }),
      );
    }

    if (!customer) {
      await dispatch(
        createCustomer({
          name: getValues('name'),
          typeOfPaymentId: getValues('typeOfPaymentId'),
          note: getValues('note'),
        }),
      );
    }

    await dispatch(fetchCustomers());

    handleReset();
    handleShow();
    return;
  };

  const handleReset = () => {
    setValue('typeOfPaymentId', '');
    reset(defaultValues);
  };

  useEffect(() => {
    if (customer) {
      setValue('name', customer.name);
      setValue('note', customer.note);

      for (const typeOfPaymentObj of selectList) {
        customer.typeOfPaymentId === typeOfPaymentObj.id
          ? setCurrentCustomerName(typeOfPaymentObj.name)
          : null;
      }
      return setValue('typeOfPaymentId', customer.typeOfPaymentId);
    }

    setCurrentCustomerName('');
    return handleReset();
  }, [customer]);

  return (
    <Modal show={show}>
      <FormProvider {...methods}>
        <Flex width='100%' direction='row' alignItems='center'>
          <Flex width='100%' direction='column'>
            <Flex>
              <InputForm
                label={t('customers.form.nome')}
                name='name'
                placeholder={t('customers.form.nome-placeholder')}
                containerWidth='90%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.name?.message && t(`${errors?.name?.message}`)}
              />
            </Flex>
          </Flex>
          <Flex width='100%' direction='column'>
            <SelectForm
              objectName={currentCustomerName}
              containerWidth='100%'
              options={selectList}
              name='typeOfPaymentId'
              label={t('customers.form.tipo-di-pagamento')}
              fontWeight={theme.fontWeights.bold}
              error={errors?.typeOfPaymentId?.message && t(`${errors?.typeOfPaymentId?.message}`)}
            />
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='100%'>
            <TextAreaForm
              label={t('customers.form.note')}
              name='note'
              placeholder={t('customers.form.note-placeholder')}
              fontWeight={theme.fontWeights.bold}
              containerWidth='100%'
              error={errors?.note?.message && t(`${errors?.note?.message}`)}
            />
          </Flex>
        </Flex>
      </FormProvider>
      <Flex width='100%' justifyContent='right'>
        <Flex>
          <Stack spacing={3} direction='row'>
            <ButtonForm
              leftIcon={<CloseIcon />}
              backgroundColor={darkModePalette.purple40}
              color={darkModePalette.purple}
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
            >
              {customer ? t('form.salva') : t('form.conferma')}
            </ButtonForm>
          </Stack>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default Form;
