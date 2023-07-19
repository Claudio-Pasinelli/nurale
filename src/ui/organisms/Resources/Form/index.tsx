import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SettingsResource } from '../Types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import schema from '../validation';
import { fetchResources, useAppDispatch } from 'store';
import { ButtonForm, InputForm, Modal, SelectForm, TextAreaForm, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { Resource } from 'utils';
import { useTranslation } from 'react-i18next';
import { createResource, editResource } from 'store/Resource';

interface Props {
  show: boolean;
  resource: Resource | null;
  selectList: any[];
  handleShow: () => void;
}

const defaultValues = {
  firstName: '',
  lastName: '',
  curriculumVitae: '',
  note: '',
  hourCost: 0,
  dailyCost: 0,
  hourRevenue: 0,
  dailyRevenue: 0,
  supplierId: undefined,
};

const Form = ({ show, resource, selectList, handleShow }: Props) => {
  const { t } = useTranslation();

  const [currentSupplierName, setCurrentSupplierName] = useState<string | undefined>('');

  const dispatch = useAppDispatch();

  const methods = useForm<SettingsResource>({
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
    watch,
  } = methods;

  const handleReset = () => {
    setValue('supplierId', undefined);
    reset(defaultValues);
  };

  const handleNew = async () => {
    // converto a numero i valori (stringa) ottenuti dagli input
    setValue('hourCost', Number(getValues('hourCost')));
    setValue('dailyCost', Number(getValues('dailyCost')));
    setValue('hourRevenue', Number(getValues('hourRevenue')));
    setValue('dailyRevenue', Number(getValues('dailyRevenue')));

    for (const supplier of selectList) {
      getValues('supplierId') === supplier.name ? setValue('supplierId', supplier.id) : null;
    }

    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    if (resource) {
      await dispatch(
        editResource({
          firstName: getValues('firstName'),
          lastName: getValues('lastName'),
          curriculumVitae: getValues('curriculumVitae'),
          note: getValues('note'),
          hourCost: getValues('hourCost'),
          hourRevenue: getValues('hourRevenue'),
          supplierId: getValues('supplierId'),
          id: resource.id,
        }),
      );
    }

    if (!resource) {
      await dispatch(
        createResource({
          firstName: getValues('firstName'),
          lastName: getValues('lastName'),
          curriculumVitae: getValues('curriculumVitae'),
          note: getValues('note'),
          hourCost: getValues('hourCost'),
          hourRevenue: getValues('hourRevenue'),
          supplierId: getValues('supplierId'),
        }),
      );
    }

    await dispatch(fetchResources());

    handleReset();
    handleShow();
    return;
  };

  useEffect(() => {
    setValue('dailyCost', Number(getValues('hourCost')) * 8);
    setValue('dailyRevenue', Number(getValues('hourRevenue')) * 8);
  }, [watch('hourCost'), watch('hourRevenue')]);

  useEffect(() => {
    setValue('hourCost', Number(getValues('dailyCost')) / 8);
    setValue('hourRevenue', Number(getValues('dailyRevenue')) / 8);
  }, [watch('dailyCost'), watch('dailyRevenue')]);

  useEffect(() => {
    if (resource) {
      setValue('firstName', resource.firstName);
      setValue('lastName', resource.lastName);
      setValue('curriculumVitae', resource.curriculumVitae);
      setValue('note', resource.note);
      setValue('hourCost', resource.hourCost);
      setValue('hourRevenue', resource.hourRevenue);

      for (const supplierObj of selectList) {
        resource.supplierId === supplierObj.id ? setCurrentSupplierName(supplierObj.name) : null;
      }

      return setValue('supplierId', resource.supplierId);
    }

    setCurrentSupplierName('');
    return handleReset();
  }, [resource]);

  return (
    <Modal show={show}>
      <FormProvider {...methods}>
        <Flex width='100%' direction='row' alignItems='center'>
          <Flex width='100%' direction='column'>
            <Flex justifyContent='space-between'>
              <InputForm
                label={t('resources.form.nome')}
                name='firstName'
                placeholder={t('resources.form.nome-placeholder')}
                containerWidth='49%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.firstName?.message && t(`${errors?.firstName?.message}`)}
              />
              <InputForm
                label={t('resources.form.cognome')}
                name='lastName'
                placeholder={t('resources.form.cognome')}
                containerWidth='49%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.lastName?.message && t(`${errors?.lastName?.message}`)}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex width='100%' direction='column'>
          <Flex justifyContent='space-between'>
            <InputForm
              type='number'
              label={t('resources.form.costo-orario')}
              name='hourCost'
              placeholder={t('resources.form.costo-orario-placeholder')}
              containerWidth='49%'
              fontWeight={theme.fontWeights.bold}
            />
            <InputForm
              type='number'
              label={t('resources.form.costo-giornaliero')}
              name='dailyCost'
              placeholder={t('resources.form.costo-giornaliero-placeholder')}
              containerWidth='49%'
              fontWeight={theme.fontWeights.bold}
            />
          </Flex>
        </Flex>
        <Flex width='100%' direction='column'>
          <Flex justifyContent='space-between'>
            <InputForm
              type='number'
              label={t('resources.form.ricavo-orario')}
              name='hourRevenue'
              placeholder={t('resources.form.ricavo-orario-placeholder')}
              containerWidth='49%'
              fontWeight={theme.fontWeights.bold}
            />
            <InputForm
              type='number'
              label={t('resources.form.ricavo-giornaliero')}
              name='dailyRevenue'
              placeholder={t('resources.form.ricavo-giornaliero-placeholder')}
              containerWidth='49%'
              fontWeight={theme.fontWeights.bold}
            />
          </Flex>
        </Flex>
        <Flex width='100%' direction='column'>
          <Flex justifyContent='space-between'>
            <InputForm
              label={t('resources.form.cv')}
              name='curriculumVitae'
              placeholder={t('resources.form.cv-placeholder')}
              containerWidth='49%'
              fontWeight={theme.fontWeights.bold}
            />
            {selectList.length > 0 && selectList[0].name ? (
              <SelectForm
                objectName={currentSupplierName}
                defaultChecked={selectList[0].name}
                containerWidth='49%'
                options={selectList}
                name='supplierId'
                label={t('resources.form.fornitore')}
                fontWeight={theme.fontWeights.bold}
              />
            ) : null}
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
              {resource ? t('form.salva') : t('form.conferma')}
            </ButtonForm>
          </Stack>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default Form;
