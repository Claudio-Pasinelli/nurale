import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputForm, SelectForm, TextAreaForm } from '../../../molecules';
import { ButtonForm, Modal } from '../../../atoms';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { darkModePalette } from '../../../themes/colors';
import { theme } from '../../../themes';
import { SettingsCustomer } from '../Types';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from '../validation';
import { useAppDispatch } from '../../../../store/applicationStore';
import { fetchSkills } from '../../../../store/skills';
import { Customer } from '../../../../utils';
import { useEffect } from 'react';
import { createCustomer } from '../../../../store/Customer';

interface Props {
  show: boolean;
  selectList: any[];
  skip: number;
  take: number;
  customer: Customer | null;
  modalConfirmButton: string;
  handleShow: () => void;
}

const defaultValues = {
  name: '',
  typeOfPaymentId: undefined,
  note: '',
};

const Form = ({
  show,
  selectList,
  skip,
  take,
  customer,
  modalConfirmButton,
  handleShow,
}: Props) => {
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
    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    // if (customer) {
    //   await dispatch(
    //     editCustomer({
    //       name: getValues('name'),
    //       typeOfPaymentId: getValues('typeOfPaymentId'),
    //       note: getValues('note'),
    //       id: customer.id,
    //     }),
    //   );
    // }

    if (!customer) {
      await dispatch(
        createCustomer({
          name: getValues('name'),
          typeOfPaymentId: getValues('typeOfPaymentId'),
          note: getValues('note'),
        }),
      );
    }

    await dispatch(
      fetchSkills({
        search: '',
        skip: skip,
        take: take,
      }),
    );

    handleReset();
    handleShow();
    return;
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  useEffect(() => {
    if (customer) {
      setValue('name', customer.name);
      setValue('note', customer.note);
      return setValue('typeOfPaymentId', customer.typeOfPaymentId);
    }

    return handleReset();
  }, [customer]);

  return (
    <Modal show={show}>
      <FormProvider {...methods}>
        <Flex width='100%' direction='row' alignItems='center'>
          <Flex width='100%' direction='column'>
            <Flex>
              <InputForm
                label='Nome'
                name='name'
                placeholder='Nome'
                containerWidth='90%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.name?.message}
              />
            </Flex>
          </Flex>
          <Flex width='100%' direction='column'>
            <SelectForm
              containerWidth='100%'
              options={selectList}
              name='skillType'
              label='Tipo di skill'
              fontWeight={theme.fontWeights.bold}
            />
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='100%'>
            <TextAreaForm
              label='Note'
              name='note'
              placeholder='Note'
              containerWidth='100%'
              error={errors?.note?.message}
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
              Annulla
            </ButtonForm>
            <ButtonForm
              leftIcon={<CheckIcon />}
              width='fit-content'
              onClick={handleNew}
              backgroundColor={darkModePalette.pink100}
              _hover={{ bg: darkModePalette.pink70 }}
              fontSize={theme.fontSizes.xxs}
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
