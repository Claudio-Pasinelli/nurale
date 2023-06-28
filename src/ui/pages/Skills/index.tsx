import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { InputForm, PageLayout, SelectForm, Table } from '../../molecules';
import { Flex, Stack } from '@chakra-ui/react';
import { ButtonForm, Filter, Modal } from '../../atoms';
import { darkModePalette } from '../../themes/colors';
import { theme } from '../../themes';
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SettingsSkill } from './Types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import '../../../utils/index.css';
import { useAppDispatch } from '../../../store/applicationStore';
import schema from './validation';
import { fetchSkills, getSkills, getSkillsPagination } from '../../../store/skills';
import { SkillsCols, schemaSearch, skillsList } from '../../../utils';
import { createSkill } from '../../../store/skill';
import { Pagination } from '../../organisms';

const defaultValues = {
    name: '',
    skillType: '',
    skillTypeSearch: '',
    note: '',
  };

interface Props
{
    name?: string;
}

const Skills = ({name}:Props) =>
{
    const dispatch = useAppDispatch();

    const skills = useSelector(getSkills);
    
    const [show, setShow] = useState(false);
    
    const take = 10;

    const [showFilters, setShowFilters] = useState(false);

    // parte per il form dell'aggiunta dalla skill
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

    const handlShow = () =>
    {
        setShow(!show);
        handleFilters;
    }

    const handleNew= async () =>
    {
        const hasErrors = await trigger();

        if (!hasErrors)
        {
          return;
        }

        await dispatch(createSkill(
            {
                name: getValues('name'),
                skillType: getValues('skillType'),
                note: getValues('note'),
            }
        ));

        await dispatch(fetchSkills(
                {
                    search: '',
                    skip: 0,
                    take: take,
                }
        ));

        handleReset();
        handlShow();
        return;
    }

    const handleReset = () => {
        reset(defaultValues);
    };

    const handleFilters = () =>
    {
        setShowFilters(!showFilters);
    }

    const searchSkills = ()=>
    {
        dispatch(fetchSkills(
            {
                skillType: getValues('skillTypeSearch'),
                skip: 0,
                take: 10,
            }
        ));
    }

    useEffect(()=>
    {
        dispatch(fetchSkills(
            {
                search: '',
                skip: 0,
                take: 10,
            }
        ));
    },[]);

    return (
        <PageLayout name={name}>
            <Flex placeContent='space-between'>
                <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} leftIcon={<AddIcon />} width='fit-content' onClick={handlShow} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                    Aggiungi nuovo
                </ButtonForm>
                <Filter show={show} showFilters={showFilters} handleFilters={handleFilters}>
                    <FormProvider {...methods}>
                        <Flex width='100%' direction='column' marginTop={'1.7rem'}>
                            <SelectForm options={skillsList} name='skillTypeSearch' label='Tipo di skill' fontWeight={theme.fontWeights.bold}/>
                            <Flex justifyContent='space-around'>
                                <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} width='fit-content' onClick={handleFilters} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                                    Svuota filtri
                                </ButtonForm>
                                <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} width='fit-content' onClick={searchSkills} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                                    Conferma
                                </ButtonForm>
                            </Flex>
                        </Flex>
                    </FormProvider>
                </Filter>
            </Flex>
            <Flex direction='column'>
                <Table data={skills} columns={SkillsCols} display={show ? 'none' : 'block'}/>
                <p style={{display: show ? 'block' : 'none', color: `${darkModePalette.pink100}`, fontSize: theme.fontSizes.lg }}>Aggiungi nuova Skill</p>
                <Modal show={show}>
                    <FormProvider {...methods}>
                        <Flex width='100%' direction='row' alignItems='center'>
                            <Flex width='100%' direction='column'>
                                <Flex >
                                    <InputForm label='Nome' name='name' placeholder='Nome' containerWidth='90%' fontWeight={theme.fontWeights.bold} error={errors?.name?.message}/>
                                </Flex>
                            </Flex>
                            <Flex width='100%' direction='column'>
                                <SelectForm options={skillsList} name='skillType' label='Tipo di skill' fontWeight={theme.fontWeights.bold}/>
                            </Flex>
                        </Flex>
                        <Flex width='100%'>
                            <Flex >
                                <InputForm label='Note' name='note' placeholder='Note' containerWidth='100%' fontWeight={theme.fontWeights.bold} error={errors?.note?.message}/>
                            </Flex>
                        </Flex>
                    </FormProvider>
                    <Flex width='100%' justifyContent='right'>
                        <Flex>
                            <Stack spacing={3} direction='row'>
                                <ButtonForm backgroundColor={darkModePalette.purple40} color={darkModePalette.purple} leftIcon={<CloseIcon />} width='fit-content' onClick={handlShow}_hover={{bg: darkModePalette.violet10}} fontSize={theme.fontSizes.xxs}>Annulla</ButtonForm>
                                <ButtonForm leftIcon={<CheckIcon />} width='fit-content' onClick={handleNew} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Conferma</ButtonForm>
                            </Stack>
                        </Flex>
                    </Flex> 
                </Modal>
                <Pagination take={take} fetch={fetchSkills} show={show} getPagination={getSkillsPagination}/>
            </Flex>
        </PageLayout>
    )
}

export default Skills;