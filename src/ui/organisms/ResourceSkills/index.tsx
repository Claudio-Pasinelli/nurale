import { useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Form from './Form';
import '../../../utils/index.css';
import {
  sendSkipAndTake,
  useAppDispatch,
  getResourcesTotalCount,
  getSkip,
  fetchResourceSkills,
  getResourceSkills,
  deleteResourceSkill,
  getResources,
  getSkills,
} from 'store';
import { ResourceSkill, RESOURCE_SKILLS_LEVEL, QueryParams } from 'utils';
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
import { useTranslation } from 'react-i18next';
import { handleColumns } from './columns';

const ResourceSkills = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const resourceSkills = useSelector(getResourceSkills);
  const resources = useSelector(getResources);
  const skills = useSelector(getSkills);

  const [show, setShow] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterUsed, setIsFilterUsed] = useState(false);
  const [resourceIdSearch, setResourceIdSearch] = useState<number | null | undefined>(null);
  const [skillIdSearch, setSkillIdSearch] = useState<number | null | undefined>(null);
  const [levelSearch, setLevelSearch] = useState<number | null | undefined>(null);

  const [resourceSkill, setResourceSkill] = useState<ResourceSkill | null>(null);
  const [id, setId] = useState<number | null | undefined>(null);

  const [skip, setSkip] = useState<number>(0);
  const take = 5;

  const totalRows = useSelector(getResourcesTotalCount);
  const totalPages = Math.floor(totalRows / take);

  const [resourceList, setResourceList] = useState<any[]>([{}]);

  const handleShow = () => {
    setShow(!show);
    handleFilters;

    if (resourceSkill) {
      setResourceSkill(null);
      isFilterUsed
        ? (setSkip(0), dispatch(sendSkipAndTake(0, take)), fetchResourceSkillsFiltered())
        : null;
    }
  };

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const emptyFilter = () => {
    setResourceIdSearch(null);
    setSkillIdSearch(null);
    setLevelSearch(null);
    setIsFilterUsed(false);

    dispatch(fetchResourceSkills({ dispatch: dispatch }));
  };

  const fetchResourceSkillsFiltered = async () => {
    const fetchParams: QueryParams = {};

    if (resourceIdSearch) {
      fetchParams.resourceId = resourceIdSearch;
    }

    if (skillIdSearch) {
      fetchParams.skillId = skillIdSearch;
    }

    if (levelSearch) {
      fetchParams.level = levelSearch;
    }

    dispatch(fetchResourceSkills(fetchParams));
  };

  const searchResourceSkill = () => {
    if (resourceIdSearch != null || skillIdSearch != null || levelSearch != null) {
      setSkip(0);
      dispatch(sendSkipAndTake(0, take));
      fetchResourceSkillsFiltered();

      return setIsFilterUsed(true);
    }
    setIsFilterUsed(false);
  };

  const handleChangeFilterResource = (event: ChangeEvent<HTMLSelectElement>) => {
    for (const resource of resources) {
      `${resource.firstName} ${resource.lastName}` === event.target.value
        ? setResourceIdSearch(resource.id)
        : null;
    }
  };

  const handleChangeFilterSkill = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(skills);
    for (const skill of skills) {
      skill.name === event.target.value ? setSkillIdSearch(skill.id) : null;
    }
  };

  const handleChangeFilterLevel = (event: ChangeEvent<HTMLSelectElement>) => {
    setLevelSearch(Number(event.target.value));
  };

  const handleEdit = (item: ResourceSkill) => {
    setResourceSkill(item);
    setShow(true);
  };

  const handleDelete = (object: ResourceSkill) => {
    setId(object.id);
    setResourceSkill(object);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setResourceSkill(null);
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteResourceSkill(id));

    isFilterUsed ? fetchResourceSkillsFiltered() : await dispatch(fetchResourceSkills());
    return handleCloseConfirm();
  };

  const removeDuplicates = () => {
    setResourceList(
      resourceList.filter(
        (ele, ind) => ind === resourceList.findIndex((elem) => elem.value === ele.value),
      ),
    );
  };

  useEffect(() => {
    resourceList.pop();
    for (const resource of resources) {
      resource.firstName != undefined && resource.lastName != undefined
        ? resourceList.push({
            id: resource.id,
            value: `${resource.firstName} ${resource.lastName}`,
          })
        : null;
    }
    removeDuplicates();
  }, [resources]);

  useEffect(() => {
    dispatch(fetchResourceSkills({ dispatch: dispatch }));
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
          {t('pagina.aggiungi-nuovo')}
        </ButtonForm>
        <Filter
          isFilterUsed={isFilterUsed}
          show={show}
          showFilters={showFilters}
          handleFilters={handleFilters}
          emptyFilter={emptyFilter}
          search={searchResourceSkill}
        >
          <Flex width='100%' direction='column' marginTop={'1.7rem'}>
            <Flex width='100%' justifyContent='space-between' direction='column'>
              <SelectFilter
                options={resourceList}
                value={String(resourceIdSearch)}
                onChange={handleChangeFilterResource}
                name='resourceIdSearch'
                label={t('filtri.resource-skills.risorsa')}
                fontWeight={theme.fontWeights.bold}
              />
              <SelectFilter
                options={skills}
                value={String(skillIdSearch)}
                onChange={handleChangeFilterSkill}
                name='skillIdSearch'
                label={t('filtri.resource-skills.skill')}
                fontWeight={theme.fontWeights.bold}
              />
              <SelectFilter
                options={RESOURCE_SKILLS_LEVEL}
                value={String(levelSearch)}
                onChange={handleChangeFilterLevel}
                name='levelSearch'
                label={t('filtri.resource-skills.livello')}
                fontWeight={theme.fontWeights.bold}
              />
              <Flex width='100%' justifyContent='space-between' marginTop='0.5rem'></Flex>
            </Flex>
          </Flex>
        </Filter>
      </Flex>
      <Flex direction='column'>
        <Table
          data={resourceSkills}
          columns={handleColumns()}
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
          {resourceSkill
            ? t('resource-skills.modifica-risorsa-skill')
            : t('resource-skills.aggiungi-nuova-risorsa-skill')}
        </p>
        <Form
          show={show}
          handleShow={handleShow}
          resourceSkill={resourceSkill}
          selectListResources={resourceList}
          selectListSkills={skills}
        />
        {isFilterUsed ? (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchResourceSkills}
            fetchFiltered={fetchResourceSkillsFiltered}
            show={show}
            totalPages={totalPages}
          />
        ) : (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchResourceSkills}
            show={show}
            totalPages={totalPages}
          />
        )}
        <ModalConfirm
          handleDelete={handleDeleteConfirm}
          handleClose={handleCloseConfirm}
          open={openConfirm}
          objectName={resourceSkill?.resource?.name}
        />
      </Flex>
    </PageLayout>
  );
};

export default ResourceSkills;
