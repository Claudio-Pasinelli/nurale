import { useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { ModalConfirm, PageLayout, SelectFilter, Table } from '../../molecules';
import { Flex } from '@chakra-ui/react';
import { ButtonForm, Filter } from '../../atoms';
import { darkModePalette } from '../../themes/colors';
import { theme } from '../../themes';
import { AddIcon } from '@chakra-ui/icons';
import { useAppDispatch } from '../../../store/applicationStore';
import { fetchSkills, getSkills, getSkillsPagination } from '../../../store/skills';
import { Skill, skillsList } from '../../../utils';
import { deleteSkill } from '../../../store/skill';
import { Pagination } from '../../organisms';
import Form from './Form';
import '../../../utils/index.css';
import { COLUMNS } from './columns';

interface Props
{
    name?: string;
}

const Skills = ({name}:Props) =>
{
    const dispatch = useAppDispatch();

    const skills = useSelector(getSkills);
    
    const [show, setShow] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    
    const [showFilters, setShowFilters] = useState(false);
    const [isFilterUsed, setIsFilterUsed] = useState(false);
    const [skillTypeSearch, setSkillTypeSearch] = useState('');
    const [skill, setSkill] = useState<Skill| null>(null)
    const [skillName, setSkillName] = useState('')
    const [id, setId] = useState<number| null | undefined>(null);
    const [modalTitle, setModalTitle] = useState('');
    const [modalConfirmButton, setModalConfirmButton] = useState('');

    const [skip, setSkip] = useState<number>(0);
    const take = 5;

    const totalRows = useSelector(getSkillsPagination);
    const totalPages = Math.floor(totalRows/take);

    const handleShow = () =>
    {
        setShow(!show);
        handleFilters;

        if(skill)
        {
            setSkill(null);
        }

        setModalTitle('Aggiungi nuova Skill');
        setModalConfirmButton('Conferma');
    }

    const handleFilters = () =>
    {
        setShowFilters(!showFilters);
    }

    const emptyFilter = () =>
    {
        setSkillTypeSearch('');
        setIsFilterUsed(false);

        dispatch(fetchSkills(
            {
                search: '',
                skip: skip,
                take: take,
            }
        ));
    }

    const handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) =>
    {
        setSkillTypeSearch(event.target.value);
    }

    const fetchSkillsFiltered = async() =>
    {
        await dispatch(fetchSkills(
            {
                skillType: skillTypeSearch,
                skip: skip,
                take: take,
            }
        ));
    }

    const searchSkills = ()=>
    {
        fetchSkillsFiltered();

        setIsFilterUsed(true);
    }

    const handleEdit = (item: Skill)=>
    {
        setSkill(item);
        setShow(true);
        setModalTitle('Modifica Skill');
        setModalConfirmButton('Salva');
    }

    const handleDelete = (object: Skill)=>
    {
        setId(object.id);
        setSkillName(object.name)
        setOpenConfirm(true);
    }

    const handleCloseConfirm = async ()=>
    {
        setId(null);
        setSkillName('');
        setOpenConfirm(false);
    }

    const handleDeleteConfirm= async ()=>
    {
        await dispatch(deleteSkill(id));
        await dispatch(fetchSkills(
            {
                search: '',
                skip: skip,
                take: take,
            }
        ));
        return handleCloseConfirm();
    }

    useEffect(()=>
    {
        dispatch(fetchSkills(
            {
                search: '',
                skip: skip,
                take: take,
            }
        ));
        
    },[]);

    return (
        <PageLayout name={name}>
            <Flex placeContent='space-between'>
                <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} leftIcon={<AddIcon />} width='fit-content' onClick={handleShow} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                    Aggiungi nuovo
                </ButtonForm>
                <Filter isFilterUsed={isFilterUsed} show={show} showFilters={showFilters} handleFilters={handleFilters}>
                    <Flex width='100%' direction='column' marginTop={'1.7rem'}>
                        <SelectFilter options={skillsList} value={skillTypeSearch} onChange={handleChangeFilter} name='skillTypeSearch' label='Tipo di skill' fontWeight={theme.fontWeights.bold}/>
                        <Flex justifyContent='space-around'>
                            <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} width='fit-content' onClick={emptyFilter} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                                Svuota filtri
                            </ButtonForm>
                            <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} width='fit-content' onClick={searchSkills} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                                Conferma
                            </ButtonForm>
                        </Flex>
                    </Flex>
                </Filter>
            </Flex>
            <Flex direction='column'>
                <Table data={skills} columns={COLUMNS} display={show ? 'none' : 'block'} handleDelete={handleDelete} handleEdit={handleEdit}/>
                <p style={{display: show ? 'block' : 'none', color: `${darkModePalette.pink100}`, fontSize: theme.fontSizes.lg }}>
                    {modalTitle}
                </p>
                <Form show={show} selectList={skillsList} skip={skip} take={take} handleShow={handleShow} skill={skill} modalConfirmButton={modalConfirmButton}/>
                {
                    isFilterUsed ? <Pagination skip={skip} setSkip={setSkip} take={take} fetch={fetchSkills} fetchFiltered={fetchSkillsFiltered} show={show} totalPages={totalPages}/>
                    : <Pagination skip={skip} setSkip={setSkip} take={take} fetch={fetchSkills} show={show} totalPages={totalPages}/>
                }
                <ModalConfirm handleDelete={handleDeleteConfirm} handleClose={handleCloseConfirm} open={openConfirm} objectName={skillName}/>
            </Flex>
        </PageLayout>
    )
}

export default Skills;