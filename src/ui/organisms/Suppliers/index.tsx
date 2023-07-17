import { useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Form from './Form';
import '../../../utils/index.css';
import {
  deleteSupplier,
  fetchSuppliers,
  getSuppliers,
  getSuppliersTotalCount,
  getTypeOfPayments,
  sendSkipAndTake,
  useAppDispatch,
} from 'store';
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
import { Supplier } from 'utils';
import { useTranslation } from 'react-i18next';
import { handleColumns } from './columns';

const Suppliers = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const typesOfPayments = useSelector(getTypeOfPayments);

  const suppliers = useSelector(getSuppliers);

  const [show, setShow] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterUsed, setIsFilterUsed] = useState(false);
  const [typeOfPaymentIdSearch, setTypeOfPaymentIdSearch] = useState<string | number | null>();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [supplierName, setSupplierName] = useState('');
  const [id, setId] = useState<number | null | undefined>(null);

  const [skip, setSkip] = useState<number>(0);
  const take = 5;

  const totalRows = useSelector(getSuppliersTotalCount);
  const totalPages = Math.floor(totalRows / take);

  const handleShow = () => {
    setShow(!show);
    handleFilters;

    if (supplier) {
      setSupplier(null);
      isFilterUsed
        ? (setSkip(0), dispatch(sendSkipAndTake(0, take)), fetchSuppliersFiltered())
        : null;
    }
  };

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const emptyFilter = () => {
    setTypeOfPaymentIdSearch('');
    setIsFilterUsed(false);

    dispatch(fetchSuppliers());
  };

  const handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    for (const typeOfPayment of typesOfPayments) {
      event.target.value === ''
        ? setTypeOfPaymentIdSearch(0)
        : event.target.value === typeOfPayment.name
        ? setTypeOfPaymentIdSearch(typeOfPayment.id)
        : null;
    }
  };

  const fetchSuppliersFiltered = () => {
    typeOfPaymentIdSearch === 0 || typeOfPaymentIdSearch === undefined
      ? dispatch(fetchSuppliers())
      : dispatch(
          fetchSuppliers({
            typeOfPaymentId: typeOfPaymentIdSearch,
          }),
        );
  };

  const searchSuppliers = () => {
    setSkip(0);
    dispatch(sendSkipAndTake(0, take));
    fetchSuppliersFiltered();

    typeOfPaymentIdSearch != 0 && typeOfPaymentIdSearch != undefined
      ? setIsFilterUsed(true)
      : setIsFilterUsed(false);
  };

  const handleEdit = (item: Supplier) => {
    setSupplier(item);
    setShow(true);
  };

  const handleDelete = (object: Supplier) => {
    setId(object.id);
    setSupplierName(object.name);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setSupplierName('');
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteSupplier(id));

    isFilterUsed ? fetchSuppliersFiltered() : await dispatch(fetchSuppliers());
    return handleCloseConfirm();
  };

  useEffect(() => {
    dispatch(fetchSuppliers({ dispatch: dispatch }));
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
        >
          <Flex width='100%' direction='column' marginTop={'1.7rem'}>
            <SelectFilter
              options={typesOfPayments}
              value={typeOfPaymentIdSearch}
              onChange={handleChangeFilter}
              name='typeOfPaymentIdSearch'
              label={t('filtri.suppliers')}
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
                {t('filtri.svuota-filtri')}
              </ButtonForm>
              <ButtonForm
                marginTop='4rem'
                marginBottom='1rem'
                display={show ? 'none' : 'block'}
                width='fit-content'
                onClick={searchSuppliers}
                backgroundColor={darkModePalette.pink100}
                _hover={{ bg: darkModePalette.pink70 }}
                fontSize={theme.fontSizes.xxs}
              >
                {t('filtri.conferma')}
              </ButtonForm>
            </Flex>
          </Flex>
        </Filter>
      </Flex>
      <Flex direction='column'>
        <Table
          data={suppliers}
          columns={handleColumns(typesOfPayments)}
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
          {supplier ? t('suppliers.modifica-fortnitore') : t('suppliers.aggiungi-nuovo-fortnitore')}
        </p>
        <Form
          show={show}
          selectList={typesOfPayments}
          handleShow={handleShow}
          supplier={supplier}
        />
        {isFilterUsed ? (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchSuppliers}
            fetchFiltered={fetchSuppliersFiltered}
            show={show}
            totalPages={totalPages}
          />
        ) : (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchSuppliers}
            show={show}
            totalPages={totalPages}
          />
        )}
        <ModalConfirm
          handleDelete={handleDeleteConfirm}
          handleClose={handleCloseConfirm}
          open={openConfirm}
          objectName={supplierName}
        />
      </Flex>
    </PageLayout>
  );
};

export default Suppliers;
