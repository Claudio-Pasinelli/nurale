import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Form from './Form';
import '../../../utils/index.css';
import { COLUMNS } from './columns';
import {
  deleteTypeOfPayment,
  fetchTypeOfPayments,
  getTypeOfPayments,
  getTypeOfPaymentsTotalCount,
  useAppDispatch,
} from 'store';
import { TypeOfPayment } from 'utils';
import { ButtonForm, Filter, ModalConfirm, PageLayout, Pagination, Table, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';

const TypeOfPayments = () => {
  const dispatch = useAppDispatch();

  const typesOfPayments = useSelector(getTypeOfPayments);

  const [show, setShow] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterUsed, setIsFilterUsed] = useState(false);
  const [typeOfPaymentTypeSearch, setTypeOfPaymentTypeSearch] = useState(false);
  const [isFilterAll, setIsFilterAll] = useState(false);
  const [isFilterYes, setIsFilterYes] = useState(false);
  const [isFilterNo, setIsFilterNo] = useState(false);

  const [typeOfPayment, setTypeOfPayment] = useState<TypeOfPayment | null>(null);
  const [skillName, setTypeOfPaymentName] = useState('');
  const [id, setId] = useState<number | null | undefined>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalConfirmButton, setModalConfirmButton] = useState('');

  const [skip, setSkip] = useState<number>(0);
  const take = 5;

  const totalRows = useSelector(getTypeOfPaymentsTotalCount);
  const totalPages = Math.floor(totalRows / take);

  const handleShow = () => {
    setShow(!show);
    handleFilters;

    if (typeOfPayment) {
      setTypeOfPayment(null);
    }

    setModalTitle('Aggiungi nuovo Tipo di Pagamento');
    setModalConfirmButton('Conferma');
  };

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const emptyFilter = () => {
    setTypeOfPaymentTypeSearch(false);
    setIsFilterUsed(false);

    setIsFilterAll(false);
    setIsFilterNo(false);
    setIsFilterYes(false);

    dispatch(
      fetchTypeOfPayments({
        skip: skip,
        take: take,
      }),
    );
  };

  const fetchTypeOfPaymentsFiltered = async () => {
    isFilterAll
      ? await dispatch(
          fetchTypeOfPayments({
            skip: skip,
            take: take,
          }),
        )
      : await dispatch(
          fetchTypeOfPayments({
            hasEndOfMonth: typeOfPaymentTypeSearch,
            skip: skip,
            take: take,
          }),
        );
  };

  const searchTypesOfPayments = () => {
    if (isFilterAll || isFilterYes || isFilterNo) {
      fetchTypeOfPaymentsFiltered();

      setIsFilterUsed(true);
    }
  };

  const handleAll = () => {
    setTypeOfPaymentTypeSearch(false);
    setIsFilterUsed(false);

    setIsFilterAll(true);
    setIsFilterNo(false);
    setIsFilterYes(false);
  };

  const handleSearchYes = () => {
    setTypeOfPaymentTypeSearch(true);

    setIsFilterAll(false);
    setIsFilterNo(false);
    setIsFilterYes(true);
  };

  const handleSearchNo = () => {
    setTypeOfPaymentTypeSearch(false);

    setIsFilterAll(false);
    setIsFilterNo(true);
    setIsFilterYes(false);
  };

  const handleEdit = (item: TypeOfPayment) => {
    setTypeOfPayment(item);
    setShow(true);
    setModalTitle('Modifica Tipo di Pagamento');
    setModalConfirmButton('Salva');
  };

  const handleDelete = (object: TypeOfPayment) => {
    setId(object.id);
    setTypeOfPaymentName(object.name);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setTypeOfPaymentName('');
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteTypeOfPayment(id));
    await dispatch(
      fetchTypeOfPayments({
        search: '',
        skip: skip,
        take: take,
      }),
    );
    return handleCloseConfirm();
  };

  useEffect(() => {
    dispatch(
      fetchTypeOfPayments({
        search: '',
        skip: skip,
        take: take,
      }),
    );
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
            <Flex width='100%' justifyContent='space-between' direction='column'>
              <p style={{ fontWeight: theme.fontWeights.bold }}>Pagamenti alla fine del mese</p>
              <Flex width='100%' justifyContent='space-between' marginTop='0.5rem'>
                <ButtonForm
                  onClick={handleAll}
                  width='calc(30%)'
                  marginBottom='1rem'
                  display={show ? 'none' : 'block'}
                  backgroundColor={isFilterAll ? '#514689b3' : darkModePalette.pink100}
                  _hover={{ bg: darkModePalette.pink70 }}
                  fontSize={theme.fontSizes.xxs}
                >
                  Tutti
                </ButtonForm>
                <ButtonForm
                  onClick={handleSearchYes}
                  width='calc(30%)'
                  marginBottom='1rem'
                  display={show ? 'none' : 'block'}
                  backgroundColor={isFilterYes ? '#514689b3' : darkModePalette.pink100}
                  _hover={{ bg: darkModePalette.pink70 }}
                  fontSize={theme.fontSizes.xxs}
                >
                  Si
                </ButtonForm>
                <ButtonForm
                  onClick={handleSearchNo}
                  width='calc(30%)'
                  marginBottom='1rem'
                  display={show ? 'none' : 'block'}
                  backgroundColor={isFilterNo ? '#514689b3' : darkModePalette.pink100}
                  _hover={{ bg: darkModePalette.pink70 }}
                  fontSize={theme.fontSizes.xxs}
                >
                  No
                </ButtonForm>
              </Flex>
            </Flex>
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
                onClick={searchTypesOfPayments}
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
          data={typesOfPayments}
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
          skip={skip}
          take={take}
          handleShow={handleShow}
          typeOfPayment={typeOfPayment}
          modalConfirmButton={modalConfirmButton}
        />
        {isFilterUsed ? (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchTypeOfPayments}
            fetchFiltered={fetchTypeOfPaymentsFiltered}
            show={show}
            totalPages={totalPages}
          />
        ) : (
          <Pagination
            skip={skip}
            setSkip={setSkip}
            take={take}
            fetch={fetchTypeOfPayments}
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

export default TypeOfPayments;
