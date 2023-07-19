import { useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Form from './Form';
import '../../../utils/index.css';
import {
  fetchSuppliers,
  getSuppliers,
  sendSkipAndTake,
  useAppDispatch,
  fetchResources,
  getResources,
  getResourcesTotalCount,
  getSkip,
} from 'store';
import { QueryParams, Resource } from 'utils';
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
import { deleteResource } from 'store/Resource';
import { handleColumns } from './columns';

const Resources = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const resources = useSelector(getResources);
  const suppliers = useSelector(getSuppliers);

  const [show, setShow] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterUsed, setIsFilterUsed] = useState(false);
  const [hasCVSearch, setHasCVSearch] = useState(false);
  const [supplierIdSearch, setSupplierIdSearch] = useState<number | null | undefined>(null);
  const [isFilterAll, setIsFilterAll] = useState(false);
  const [isFilterYes, setIsFilterYes] = useState(false);
  const [isFilterNo, setIsFilterNo] = useState(false);

  const [resource, setResource] = useState<Resource | null>(null);
  const [id, setId] = useState<number | null | undefined>(null);

  const [skip, setSkip] = useState<number>(0);
  const take = 5;

  const totalRows = useSelector(getResourcesTotalCount);
  const totalPages = Math.floor(totalRows / take);

  const skipState = useSelector(getSkip);

  const handleShow = () => {
    setShow(!show);
    handleFilters;

    if (resource) {
      setResource(null);
      isFilterUsed
        ? (setSkip(0), dispatch(sendSkipAndTake(0, take)), fetchResourcesFiltered())
        : null;
    }
  };

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const emptyFilter = () => {
    setHasCVSearch(false);
    setSupplierIdSearch(null);
    setIsFilterUsed(false);

    setIsFilterAll(false);
    setIsFilterNo(false);
    setIsFilterYes(false);

    dispatch(fetchResources({ dispatch: dispatch }));
  };

  const fetchResourcesFiltered = async () => {
    const fetchParams: QueryParams = {};

    if (isFilterNo || isFilterYes) {
      fetchParams.hasCV = hasCVSearch;
    }

    if (supplierIdSearch) {
      fetchParams.supplierId = supplierIdSearch;
    }

    dispatch(fetchResources(fetchParams));
  };

  const searchResources = () => {
    if (isFilterAll || isFilterYes || isFilterNo || supplierIdSearch != null) {
      setSkip(0);
      dispatch(sendSkipAndTake(0, take));
      fetchResourcesFiltered();

      return setIsFilterUsed(true);
    }
    setIsFilterUsed(false);
  };

  const handleButtonSearch = (value: string) => {
    if (value === 'all') {
      setHasCVSearch(false);

      setIsFilterAll(true);
      setIsFilterYes(false);
      return setIsFilterNo(false);
    } else if (value === 'yes') {
      setHasCVSearch(true);

      setIsFilterAll(false);
      setIsFilterYes(true);
      return setIsFilterNo(false);
    } else if (value === 'no') {
      setHasCVSearch(false);

      setIsFilterAll(false);
      setIsFilterYes(false);
      return setIsFilterNo(true);
    }
  };

  const handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    for (const supplier of suppliers) {
      supplier.name === event.target.value ? setSupplierIdSearch(supplier.id) : null;
    }
  };

  const handleEdit = (item: Resource) => {
    setResource(item);
    setShow(true);
  };

  const handleDelete = (object: Resource) => {
    setId(object.id);
    setResource(object);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setResource(null);
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteResource(id));

    isFilterUsed ? fetchResourcesFiltered() : await dispatch(fetchResources());
    return handleCloseConfirm();
  };

  useEffect(() => {
    dispatch(fetchResources({ dispatch: dispatch }));
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
          search={searchResources}
        >
          <Flex width='100%' direction='column' marginTop={'1.7rem'}>
            <Flex width='100%' justifyContent='space-between' direction='column'>
              <SelectFilter
                options={suppliers}
                value={String(supplierIdSearch)}
                onChange={handleChangeFilter}
                name='supplierIdSearch'
                label={t('filtri.resources.select')}
                fontWeight={theme.fontWeights.bold}
              />
              <p style={{ fontWeight: theme.fontWeights.bold }}>
                {t('filtri.resources.titolo-bottoni')}
              </p>
              <Flex width='100%' justifyContent='space-between' marginTop='0.5rem'>
                <ButtonForm
                  onClick={() => handleButtonSearch('all')}
                  width='calc(30%)'
                  marginBottom='1rem'
                  display={show ? 'none' : 'block'}
                  backgroundColor={isFilterAll ? '#514689b3' : darkModePalette.pink100}
                  _hover={{ bg: darkModePalette.pink70 }}
                  fontSize={theme.fontSizes.xxs}
                >
                  {t('filtri.resources.tutti')}
                </ButtonForm>
                <ButtonForm
                  onClick={() => handleButtonSearch('yes')}
                  width='calc(30%)'
                  marginBottom='1rem'
                  display={show ? 'none' : 'block'}
                  backgroundColor={isFilterYes ? '#514689b3' : darkModePalette.pink100}
                  _hover={{ bg: darkModePalette.pink70 }}
                  fontSize={theme.fontSizes.xxs}
                >
                  {t('filtri.resources.si')}
                </ButtonForm>
                <ButtonForm
                  onClick={() => handleButtonSearch('no')}
                  width='calc(30%)'
                  marginBottom='1rem'
                  display={show ? 'none' : 'block'}
                  backgroundColor={isFilterNo ? '#514689b3' : darkModePalette.pink100}
                  _hover={{ bg: darkModePalette.pink70 }}
                  fontSize={theme.fontSizes.xxs}
                >
                  {t('filtri.resources.no')}
                </ButtonForm>
              </Flex>
            </Flex>
          </Flex>
        </Filter>
      </Flex>
      <Flex direction='column'>
        <Table
          data={resources}
          columns={handleColumns(suppliers)}
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
          {resource ? t('resources.modifica-risorsa') : t('resources.aggiungi-nuovo-risorsa')}
        </p>
        <Form show={show} handleShow={handleShow} resource={resource} selectList={suppliers} />
        {isFilterUsed ? (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchResources}
            fetchFiltered={fetchResourcesFiltered}
            show={show}
            totalPages={totalPages}
          />
        ) : (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchResources}
            show={show}
            totalPages={totalPages}
          />
        )}
        <ModalConfirm
          handleDelete={handleDeleteConfirm}
          handleClose={handleCloseConfirm}
          open={openConfirm}
          objectName={resource?.firstName}
        />
      </Flex>
    </PageLayout>
  );
};

export default Resources;
