import { useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Form from './Form';
import '../../../utils/index.css';
import {
  deleteCustomer,
  fetchCustomers,
  getCustomers,
  getCustomersTotalCount,
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
import { Customer } from 'utils';
import { useTranslation } from 'react-i18next';
import { handleColumns } from './columns';

const Customers = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const customers = useSelector(getCustomers);
  const typesOfPayments = useSelector(getTypeOfPayments);

  const [show, setShow] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterUsed, setIsFilterUsed] = useState(false);
  const [typeOfPaymentIdSearch, setTypeOfPaymentIdSearch] = useState<string | number | null>();
  const [customer, setCustomer] = useState<Customer | null>(null);
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
    setIsFilterUsed(false);

    dispatch(fetchCustomers());
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
    setCustomer(object);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setCustomer(null);
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteCustomer(id));

    isFilterUsed ? fetchCustomersFiltered() : await dispatch(fetchCustomers());
    return handleCloseConfirm();
  };

  useEffect(() => {
    dispatch(fetchCustomers({ dispatch: dispatch }));
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
          search={searchCustomers}
        >
          <Flex width='100%' direction='column' marginTop={'1.7rem'}>
            <SelectFilter
              options={typesOfPayments}
              value={typeOfPaymentIdSearch}
              onChange={handleChangeFilter}
              name='typeOfPaymentIdSearch'
              label={t('filtri.customers')}
              fontWeight={theme.fontWeights.bold}
            />
          </Flex>
        </Filter>
      </Flex>
      <Flex direction='column'>
        <Table
          data={customers}
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
          {customer ? t('customers.modifica-cliente') : t('customers.aggiungi-nuovo-cliente')}
        </p>
        <Form
          show={show}
          selectList={typesOfPayments}
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
          objectName={customer?.name}
        />
      </Flex>
    </PageLayout>
  );
};

export default Customers;
