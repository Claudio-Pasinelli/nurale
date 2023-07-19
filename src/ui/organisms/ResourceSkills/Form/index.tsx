import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import schema from '../validation';
import { createResourceSkill, editResourceSkill, fetchResourceSkills, useAppDispatch } from 'store';
import { ButtonForm, Modal, SelectForm, TextAreaForm, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { ResourceSkill, RESOURCE_SKILLS_LEVEL } from 'utils';
import { useTranslation } from 'react-i18next';
import { SettingsResourceSkill } from '../Types';

interface Props {
  show: boolean;
  resourceSkill: ResourceSkill | null;
  selectListResources: any[];
  selectListSkills: any[];
  handleShow: () => void;
}

const defaultValues = {
  level: undefined,
  note: '',
  resourceId: null,
  skillId: null,
};

const Form = ({
  show,
  resourceSkill,
  selectListResources,
  selectListSkills,
  handleShow,
}: Props) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [currentResourceName, setCurrentResourceName] = useState<string | undefined>('');
  const [currentSkillName, setCurrentSkillName] = useState<string | undefined>('');

  const methods = useForm<SettingsResourceSkill>({
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
    setValue('level', undefined);
    setValue('resourceId', null);
    setValue('skillId', null);
    reset(defaultValues);
  };

  const handleNew = async () => {
    // converto a numero i valori (stringa) ottenuti dagli input
    setValue('level', Number(getValues('level')));

    getValues('resourceId') === '' ? setValue('resourceId', null) : null;
    getValues('skillId') === '' ? setValue('skillId', null) : null;

    for (const resource of selectListResources) {
      getValues('resourceId') === resource.value ? setValue('resourceId', resource.id) : null;
    }

    for (const skill of selectListSkills) {
      getValues('skillId') === skill.name ? setValue('skillId', skill.id) : null;
    }

    const hasErrors = await trigger();

    if (!hasErrors) {
      return hasErrors;
    }

    if (resourceSkill) {
      await dispatch(
        editResourceSkill({
          level: getValues('level'),
          note: getValues('note'),
          resourceId: getValues('resourceId'),
          skillId: getValues('skillId'),
          id: resourceSkill.id,
        }),
      );
    }

    if (!resourceSkill) {
      await dispatch(
        createResourceSkill({
          level: getValues('level'),
          note: getValues('note'),
          resourceId: getValues('resourceId'),
          skillId: getValues('skillId'),
        }),
      );
    }

    await dispatch(fetchResourceSkills());

    handleReset();
    handleShow();
    return;
  };

  useEffect(() => {
    if (resourceSkill) {
      setValue('level', resourceSkill.level);
      setValue('resourceId', resourceSkill.resourceId);
      setValue('skillId', resourceSkill.skillId);
      setCurrentResourceName(resourceSkill.resource?.name);
      setCurrentSkillName(resourceSkill.skill?.name);
      resourceSkill.note && setValue('note', resourceSkill.note);
      return;
    }

    setCurrentResourceName('');
    setCurrentSkillName('');
    return handleReset();
  }, [resourceSkill]);

  return (
    <Modal show={show}>
      <FormProvider {...methods}>
        <Flex width='100%' direction='row' alignItems='center'>
          <Flex width='100%' direction='column'>
            <Flex justifyContent='space-between'>
              <SelectForm
                objectName={currentResourceName}
                defaultValue={2}
                containerWidth='30%'
                options={selectListResources}
                name='resourceId'
                label={t('resource-skills.form.risorsa')}
                fontWeight={theme.fontWeights.bold}
                error={errors?.resourceId?.message && t(`${errors?.resourceId?.message}`)}
              />
              <SelectForm
                objectName={currentSkillName}
                containerWidth='30%'
                options={selectListSkills}
                name='skillId'
                label={t('resource-skills.form.skill')}
                fontWeight={theme.fontWeights.bold}
                error={errors?.skillId?.message && t(`${errors?.skillId?.message}`)}
              />
              <SelectForm
                containerWidth='30%'
                options={RESOURCE_SKILLS_LEVEL}
                name='level'
                label={t('resource-skills.form.livello')}
                fontWeight={theme.fontWeights.bold}
                error={errors?.level?.message && t(`${errors?.level?.message}`)}
              />
            </Flex>
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
              {resourceSkill ? t('form.salva') : t('form.conferma')}
            </ButtonForm>
          </Stack>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default Form;
