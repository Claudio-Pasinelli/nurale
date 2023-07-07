import { useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Form from './Form';
import '../../../utils/index.css';
import { COLUMNS } from './columns';
import {
  deleteSkill,
  fetchSkills,
  getSkills,
  getSkillsTotalCount,
  sendSkipAndTake,
  useAppDispatch,
} from 'store';
import { Skill, skillsList } from 'utils';
import {
  ButtonForm,
  Filter,
  ModalConfirm,
  PageLayout,
  Pagination,
  SelectFilter,
  Table,
  theme,
} from 'ui';
import { darkModePalette } from 'ui/themes/colors';

const Skills = () => {
  const dispatch = useAppDispatch();

  const skills = useSelector(getSkills);

  const [show, setShow] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterUsed, setIsFilterUsed] = useState(false);
  const [skillTypeSearch, setSkillTypeSearch] = useState('');
  const [skill, setSkill] = useState<Skill | null>(null);
  const [skillName, setSkillName] = useState('');
  const [id, setId] = useState<number | null | undefined>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalConfirmButton, setModalConfirmButton] = useState('');

  const [skip, setSkip] = useState<number>(0);
  const take = 5;

  const totalRows = useSelector(getSkillsTotalCount);
  const totalPages = Math.floor(totalRows / take);

  const handleShow = () => {
    setShow(!show);
    handleFilters;

    if (skill) {
      setSkill(null);
    }

    setModalTitle('Aggiungi nuova Skill');
    setModalConfirmButton('Conferma');
  };

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const emptyFilter = () => {
    setSkillTypeSearch('');
    setIsFilterUsed(false);

    dispatch(fetchSkills());
  };

  const handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setSkillTypeSearch(event.target.value);
  };

  const fetchSkillsFiltered = () => {
    dispatch(
      fetchSkills({
        skillType: skillTypeSearch,
      }),
    );
  };

  const searchSkills = () => {
    setSkip(0);

    dispatch(sendSkipAndTake(0, take));
    fetchSkillsFiltered();

    skillTypeSearch === '' ? setIsFilterUsed(false) : setIsFilterUsed(true);
  };

  const handleEdit = (item: Skill) => {
    setSkill(item);
    setShow(true);
    setModalTitle('Modifica Skill');
    setModalConfirmButton('Salva');
  };

  const handleDelete = (object: Skill) => {
    setId(object.id);
    setSkillName(object.name);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setSkillName('');
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteSkill(id));

    isFilterUsed
      ? (setSkip(0), dispatch(sendSkipAndTake(0, take)), fetchSkillsFiltered())
      : await dispatch(fetchSkills());
    return handleCloseConfirm();
  };

  useEffect(() => {
    dispatch(fetchSkills());
  }, []);

  return (
    <PageLayout>
      <Flex placeContent='space-between'>
        <ButtonForm
          marginTop='4rem'
          marginBottom='1rem'
          display={show ? 'none' : 'block'}
          leftIcon={<AddIcon />}
          width='fit-content'
          onClick={handleShow}
          backgroundColor={darkModePalette.pink100}
          _hover={{ bg: darkModePalette.pink70 }}
          fontSize={theme.fontSizes.xxs}
        >
          Aggiungi nuovo
        </ButtonForm>
        <Filter
          isFilterUsed={isFilterUsed}
          show={show}
          showFilters={showFilters}
          handleFilters={handleFilters}
        >
          <Flex width='100%' direction='column' marginTop={'1.7rem'}>
            <SelectFilter
              options={skillsList}
              value={skillTypeSearch}
              onChange={handleChangeFilter}
              name='skillTypeSearch'
              label='Tipo di skill'
              fontWeight={theme.fontWeights.bold}
            />
            <Flex justifyContent='space-around'>
              <ButtonForm
                marginTop='4rem'
                marginBottom='1rem'
                display={show ? 'none' : 'block'}
                width='fit-content'
                onClick={emptyFilter}
                backgroundColor={darkModePalette.pink100}
                _hover={{ bg: darkModePalette.pink70 }}
                fontSize={theme.fontSizes.xxs}
              >
                Svuota filtri
              </ButtonForm>
              <ButtonForm
                marginTop='4rem'
                marginBottom='1rem'
                display={show ? 'none' : 'block'}
                width='fit-content'
                onClick={searchSkills}
                backgroundColor={darkModePalette.pink100}
                _hover={{ bg: darkModePalette.pink70 }}
                fontSize={theme.fontSizes.xxs}
              >
                Conferma
              </ButtonForm>
            </Flex>
          </Flex>
        </Filter>
      </Flex>
      <Flex direction='column'>
        <Table
          data={skills}
          columns={COLUMNS}
          display={show ? 'none' : 'block'}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <p
          style={{
            display: show ? 'block' : 'none',
            color: `${darkModePalette.pink100}`,
            fontSize: theme.fontSizes.lg,
          }}
        >
          {modalTitle}
        </p>
        <Form
          show={show}
          selectList={skillsList}
          skip={skip}
          take={take}
          handleShow={handleShow}
          skill={skill}
          modalConfirmButton={modalConfirmButton}
        />
        {isFilterUsed ? (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchSkills}
            fetchFiltered={fetchSkillsFiltered}
            show={show}
            totalPages={totalPages}
          />
        ) : (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchSkills}
            show={show}
            totalPages={totalPages}
          />
        )}
        <ModalConfirm
          handleDelete={handleDeleteConfirm}
          handleClose={handleCloseConfirm}
          open={openConfirm}
          objectName={skillName}
        />
      </Flex>
    </PageLayout>
  );
};

export default Skills;
