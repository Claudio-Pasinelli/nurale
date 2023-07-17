import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SettingsTypeOfPayment } from '../Types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import schema from '../validation';
import { createTypeOfPayment, editTypeOfPayment, fetchTypeOfPayments, useAppDispatch } from 'store';
import { ButtonForm, InputForm, Modal, SwitchForm, TextAreaForm, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { TypeOfPayment } from 'utils';
import { useTranslation } from 'react-i18next';

interface Props {
  show: boolean;
  skip: number;
  take: number;
  typeOfPayment: TypeOfPayment | null;
  selectList: any[];
  handleShow: () => void;
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

const Form = ({ show, skip, take, typeOfPayment, selectList, handleShow }: Props) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const methods = useForm<SettingsTypeOfPayment>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const {
    formState: { errors },
    reset,
    trigger,
    setValue,
    getValues,
    setError,
  } = methods;

  const handleReset = () => {
    setValue('daysOffsetPayments', undefined);
    setValue('daysToFirstPayment', undefined);
    reset(defaultValues);
  };

  const handleNew = async () => {
    // converto a numero i valori (stringa) ottenuti dagli input
    setValue('daysBetweenPayments', Number(getValues('daysBetweenPayments')));
    setValue('daysOffsetPayments', Number(getValues('daysOffsetPayments')));
    setValue('daysToFirstPayment', Number(getValues('daysToFirstPayment')));
    setValue('numberOfPayments', Number(getValues('numberOfPayments')));

    getValues('daysOffsetPayments') ? null : setValue('daysOffsetPayments', 0);
    getValues('daysToFirstPayment') ? null : setValue('daysToFirstPayment', 0);

    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    if (typeOfPayment) {
      await dispatch(
        editTypeOfPayment({
          name: getValues('name'),
          note: getValues('note'),
          daysBetweenPayments: getValues('daysBetweenPayments'),
          daysOffsetPayments: getValues('daysOffsetPayments'),
          daysToFirstPayment: getValues('daysToFirstPayment'),
          movePaymentsToTheEndOfMonth: getValues('movePaymentsToTheEndOfMonth'),
          numberOfPayments: getValues('numberOfPayments'),
          id: typeOfPayment.id,
        }),
      );
    }

    if (!typeOfPayment) {
      await dispatch(
        createTypeOfPayment({
          name: getValues('name'),
          note: getValues('note'),
          daysBetweenPayments: getValues('daysBetweenPayments'),
          daysOffsetPayments: getValues('daysOffsetPayments'),
          daysToFirstPayment: getValues('daysToFirstPayment'),
          movePaymentsToTheEndOfMonth: getValues('movePaymentsToTheEndOfMonth'),
          numberOfPayments: getValues('numberOfPayments'),
        }),
      );
    }

    await dispatch(
      fetchTypeOfPayments({
        skip: skip,
        take: take,
      }),
    );

    setValue('daysOffsetPayments', undefined);
    setValue('daysToFirstPayment', undefined);

    handleReset();
    handleShow();
    return;
  };

  const handleGenerateName = () => {
    return setValue('name', selectList[Math.floor(Math.random() * (selectList.length - 1))].name);
  };

  useEffect(() => {
    if (typeOfPayment) {
      setValue('name', typeOfPayment.name);
      setValue('note', typeOfPayment.note);
      setValue('daysBetweenPayments', typeOfPayment.daysBetweenPayments);
      setValue('daysOffsetPayments', typeOfPayment.daysOffsetPayments);
      setValue('daysToFirstPayment', typeOfPayment.daysToFirstPayment);
      setValue('movePaymentsToTheEndOfMonth', typeOfPayment.movePaymentsToTheEndOfMonth);
      return setValue('numberOfPayments', typeOfPayment.numberOfPayments);
    }

    setValue('movePaymentsToTheEndOfMonth', false);
    return handleReset();
  }, [typeOfPayment]);

  // DA RIVEDERE LO SWITCH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (
    <Modal show={show}>
      <FormProvider {...methods}>
        <Flex width='100%' direction='row' alignItems='center'>
          <Flex width='100%' direction='column'>
            <Flex justifyContent='space-between'>
              <InputForm
                label={t('typeOfPayments.form.nome')}
                name='name'
                placeholder={t('typeOfPayments.form.nome-placeholder')}
                containerWidth='70%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.name?.message && t(`${errors?.name?.message}`)}
              />
              <ButtonForm
                margin='auto 0'
                width='25%'
                onClick={handleGenerateName}
                backgroundColor={darkModePalette.pink100}
                _hover={{ bg: darkModePalette.pink70 }}
                fontSize={theme.fontSizes.xxs}
              >
                {t('typeOfPayments.genera-nome')}
              </ButtonForm>
            </Flex>
          </Flex>
        </Flex>
        <Flex width='100%' direction='column'>
          <Flex justifyContent='space-between'>
            <InputForm
              type='number'
              label={t('typeOfPayments.form.giorni-al-primo-pagamento')}
              name='daysToFirstPayment'
              placeholder={t('typeOfPayments.form.giorni-al-primo-pagamento-placeholder')}
              containerWidth='49%'
              fontWeight={theme.fontWeights.bold}
              error={
                errors?.daysToFirstPayment?.message && t(`${errors?.daysToFirstPayment?.message}`)
              }
            />
            <InputForm
              type='number'
              label={t('typeOfPayments.form.giorni-tra-i-pagamenti')}
              name='daysBetweenPayments'
              placeholder={t('typeOfPayments.form.giorni-tra-i-pagamenti-placeholder')}
              containerWidth='49%'
              fontWeight={theme.fontWeights.bold}
              error={
                errors?.daysBetweenPayments?.message && t(`${errors?.daysBetweenPayments?.message}`)
              }
            />
          </Flex>
        </Flex>
        <Flex width='100%' direction='column'>
          <Flex justifyContent='space-between'>
            <InputForm
              type='number'
              label={t('typeOfPayments.form.numero-di-pagamenti')}
              name='numberOfPayments'
              placeholder={t('typeOfPayments.form.numero-di-pagamenti-placeholder')}
              containerWidth='49%'
              fontWeight={theme.fontWeights.bold}
              error={errors?.numberOfPayments?.message && t(`${errors?.numberOfPayments?.message}`)}
            />
            <InputForm
              type='number'
              label={t('typeOfPayments.form.giorni-scostamento-pagamento')}
              name='daysOffsetPayments'
              placeholder={t('typeOfPayments.form.giorni-scostamento-pagamento-placeholder')}
              containerWidth='49%'
              fontWeight={theme.fontWeights.bold}
              error={
                errors?.daysOffsetPayments?.message && t(`${errors?.daysOffsetPayments?.message}`)
              }
            />
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='100%'>
            <TextAreaForm
              label={t('typeOfPayments.form.note')}
              name='note'
              placeholder={t('typeOfPayments.form.note-placeholder')}
              containerWidth='100%'
              error={errors?.note?.message && t(`${errors?.note?.message}`)}
            />
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='100%'>
            <SwitchForm
              defaultChecked={false}
              label={t('typeOfPayments.form.spostare-i-pagamenti-alla-fine-del-mese')}
              name='movePaymentsToTheEndOfMonth'
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
              {typeOfPayment ? t('form.salva') : t('form.conferma')}
            </ButtonForm>
          </Stack>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default Form;
