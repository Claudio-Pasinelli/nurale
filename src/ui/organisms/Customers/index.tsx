import { useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Form from './Form';
import '../../../utils/index.css';
import { COLUMNS } from './columns';
import {
  deleteCustomer,
  fetchCustomers,
  getCustomers,
  getCustomersTotalCount,
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
import { Customer, typeOfPaymentsList } from 'utils';
import { useTranslation } from 'react-i18next';

const Customers = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const customers = useSelector(getCustomers);

  const [show, setShow] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterUsed, setIsFilterUsed] = useState(false);
  const [typeOfPaymentIdSearch, setTypeOfPaymentIdSearch] = useState<string | number>();
  const [typeOfPaymentId, setTypeOfPaymentId] = useState('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [id, setId] = useState<number | null | undefined>(null);

  const [skip, setSkip] = useState<number>(0);
  const take = 5;

  const totalRows = useSelector(getCustomersTotalCount);
  const totalPages = Math.floor(totalRows / take);

  const handleShow = () => {
    setShow(!show);
    handleFilters;

    if (customer) {
      setCustomer(null);
      isFilterUsed
        ? (setSkip(0), dispatch(sendSkipAndTake(0, take)), fetchCustomersFiltered())
        : null;
    }
  };

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const emptyFilter = () => {
    setTypeOfPaymentIdSearch('');
    setTypeOfPaymentId('');
    setIsFilterUsed(false);

    dispatch(fetchCustomers());
  };

  const handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeOfPaymentId(event.target.value);

    event.target.value === '30 gg d.f.'
      ? setTypeOfPaymentIdSearch(1)
      : event.target.value === 'A vista'
      ? setTypeOfPaymentIdSearch(2)
      : event.target.value === '30-60 gg d.f.'
      ? setTypeOfPaymentIdSearch(3)
      : event.target.value === '30 gg f.m.'
      ? setTypeOfPaymentIdSearch(4)
      : setTypeOfPaymentIdSearch(0);
  };

  const fetchCustomersFiltered = () => {
    typeOfPaymentIdSearch === 0 || typeOfPaymentIdSearch === undefined
      ? dispatch(fetchCustomers())
      : dispatch(
          fetchCustomers({
            typeOfPaymentId: typeOfPaymentIdSearch,
          }),
        );
  };

  const searchCustomers = () => {
    setSkip(0);
    dispatch(sendSkipAndTake(0, take));
    fetchCustomersFiltered();

    typeOfPaymentIdSearch != 0 && typeOfPaymentIdSearch != undefined
      ? setIsFilterUsed(true)
      : setIsFilterUsed(false);
  };

  const handleEdit = (item: Customer) => {
    setCustomer(item);
    setShow(true);
  };

  const handleDelete = (object: Customer) => {
    setId(object.id);
    setCustomerName(object.name);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setCustomerName('');
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteCustomer(id));

    isFilterUsed
      ? (setSkip(0), dispatch(sendSkipAndTake(0, take)), fetchCustomersFiltered())
      : await dispatch(fetchCustomers());
    return handleCloseConfirm();
  };

  useEffect(() => {
    dispatch(fetchCustomers());
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
              options={typeOfPaymentsList}
              value={typeOfPaymentId}
              onChange={handleChangeFilter}
              name='typeOfPaymentId'
              label={t('filtri.customers')}
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
                onClick={searchCustomers}
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
          data={customers}
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
          {customer ? t('customers.modifica-cliente') : t('customers.aggiungi-nuovo-cliente')}
        </p>
        <Form
          show={show}
          selectList={typeOfPaymentsList}
          handleShow={handleShow}
          customer={customer}
        />
        {isFilterUsed ? (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchCustomers}
            fetchFiltered={fetchCustomersFiltered}
            show={show}
            totalPages={totalPages}
          />
        ) : (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchCustomers}
            show={show}
            totalPages={totalPages}
          />
        )}
        <ModalConfirm
          handleDelete={handleDeleteConfirm}
          handleClose={handleCloseConfirm}
          open={openConfirm}
          objectName={customerName}
        />
      </Flex>
    </PageLayout>
  );
};

export default Customers;
