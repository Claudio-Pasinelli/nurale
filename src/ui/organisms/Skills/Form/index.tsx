import { Flex, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SettingsSkill } from '../Types';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from '../validation';
import { useEffect } from 'react';
import { createSkill, editSkill, fetchSkills, useAppDispatch } from 'store';
import { Skill } from 'utils';
import { ButtonForm, InputForm, Modal, SelectForm, TextAreaForm, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { useTranslation } from 'react-i18next';

interface Props {
  show: boolean;
  selectList: any[];
  skill: Skill | null;
  handleShow: () => void;
}

const defaultValues = {
  name: '',
  skillType: '',
  note: '',
};

const Form = ({ show, selectList, skill, handleShow }: Props) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const methods = useForm<SettingsSkill>({
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

    if (skill) {
      await dispatch(
        editSkill({
          name: getValues('name'),
          skillType: getValues('skillType'),
          note: getValues('note'),
          id: skill.id,
        }),
      );
    }

    if (!skill) {
      await dispatch(
        createSkill({
          name: getValues('name'),
          skillType: getValues('skillType'),
          note: getValues('note'),
        }),
      );
    }

    await dispatch(fetchSkills());

    handleReset();
    handleShow();
    return;
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  useEffect(() => {
    if (skill) {
      setValue('name', skill.name);
      setValue('note', skill.note);
      return setValue('skillType', skill.skillType);
    }

    return handleReset();
  }, [skill]);

  return (
    <Modal show={show}>
      <FormProvider {...methods}>
        <Flex width='100%' direction='row' alignItems='center'>
          <Flex width='100%' direction='column'>
            <Flex>
              <InputForm
                label={t('skills.form.nome')}
                name='name'
                placeholder={t('skills.form.nome-placeholder')}
                containerWidth='90%'
                fontWeight={theme.fontWeights.bold}
                error={errors?.name?.message && t(`${errors?.name?.message}`)}
              />
            </Flex>
          </Flex>
          <Flex width='100%' direction='column'>
            <SelectForm
              containerWidth='100%'
              options={selectList}
              name='skillType'
              label={t('skills.form.tipo-di-skill')}
              fontWeight={theme.fontWeights.bold}
              error={errors?.skillType?.message && t(`${errors?.skillType?.message}`)}
            />
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='100%'>
            <TextAreaForm
              label={t('skills.form.note')}
              name='note'
              placeholder={t('skills.form.note-placeholder')}
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
              {skill ? t('form.salva') : t('form.conferma')}
            </ButtonForm>
          </Stack>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default Form;
