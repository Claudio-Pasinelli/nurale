import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Form from './Form';
import '../../../utils/index.css';
import { handleColumns } from './columns';
import {
  deleteTypeOfPayment,
  fetchTypeOfPayments,
  getTypeOfPayments,
  getTypeOfPaymentsTotalCount,
  sendSkipAndTake,
  useAppDispatch,
} from 'store';
import { TypeOfPayment } from 'utils';
import { ButtonForm, Filter, ModalConfirm, PageLayout, Pagination, Table, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { useTranslation } from 'react-i18next';

const TypeOfPayments = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const typesOfPayments = useSelector(getTypeOfPayments);

  const [show, setShow] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterUsed, setIsFilterUsed] = useState(false);
  const [hasEndOfMonthSearch, setHasEndOfMonthSearch] = useState(false);
  const [isFilterAll, setIsFilterAll] = useState(false);
  const [isFilterYes, setIsFilterYes] = useState(false);
  const [isFilterNo, setIsFilterNo] = useState(false);

  const [typeOfPayment, setTypeOfPayment] = useState<TypeOfPayment | null>(null);
  const [id, setId] = useState<number | null | undefined>(null);

  const [skip, setSkip] = useState<number>(0);
  const take = 5;

  const totalRows = useSelector(getTypeOfPaymentsTotalCount);
  const totalPages = Math.floor(totalRows / take);

  const handleShow = () => {
    setShow(!show);
    handleFilters;

    if (typeOfPayment) {
      setTypeOfPayment(null);
      isFilterUsed
        ? (setSkip(0), dispatch(sendSkipAndTake(0, take)), fetchTypeOfPaymentsFiltered())
        : null;
    }
  };

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const emptyFilter = () => {
    setHasEndOfMonthSearch(false);
    setIsFilterUsed(false);

    setIsFilterAll(false);
    setIsFilterNo(false);
    setIsFilterYes(false);

    dispatch(fetchTypeOfPayments());
  };

  const fetchTypeOfPaymentsFiltered = () => {
    isFilterAll
      ? dispatch(fetchTypeOfPayments())
      : dispatch(
          fetchTypeOfPayments({
            hasEndOfMonth: hasEndOfMonthSearch,
          }),
        );
  };

  const searchTypesOfPayments = () => {
    if (isFilterAll || isFilterYes || isFilterNo) {
      setSkip(0);
      dispatch(sendSkipAndTake(0, take));
      fetchTypeOfPaymentsFiltered();

      return setIsFilterUsed(true);
    }
    setIsFilterUsed(false);
  };

  const handleButtonSearch = (value: string) => {
    if (value === 'all') {
      setHasEndOfMonthSearch(false);

      setIsFilterAll(true);
      setIsFilterYes(false);
      return setIsFilterNo(false);
    } else if (value === 'yes') {
      setHasEndOfMonthSearch(true);

      setIsFilterAll(false);
      setIsFilterYes(true);
      return setIsFilterNo(false);
    } else if (value === 'no') {
      setHasEndOfMonthSearch(false);

      setIsFilterAll(false);
      setIsFilterYes(false);
      return setIsFilterNo(true);
    }
  };

  const handleEdit = (item: TypeOfPayment) => {
    setTypeOfPayment(item);
    setShow(true);
  };

  const handleDelete = (object: TypeOfPayment) => {
    setId(object.id);
    setTypeOfPayment(object);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setTypeOfPayment(null);
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteTypeOfPayment(id));

    isFilterUsed
      ? (setSkip(0), dispatch(sendSkipAndTake(0, take)), fetchTypeOfPaymentsFiltered())
      : await dispatch(fetchTypeOfPayments());
    return handleCloseConfirm();
  };

  useEffect(() => {
    dispatch(fetchTypeOfPayments());
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
          search={searchTypesOfPayments}
        >
          <Flex width='100%' direction='column' marginTop={'1.7rem'}>
            <Flex width='100%' justifyContent='space-between' direction='column'>
              <p style={{ fontWeight: theme.fontWeights.bold }}>
                {t('filtri.tipi-di-pagamento.titolo')}
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
                  {t('filtri.tipi-di-pagamento.tutti')}
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
                  {t('filtri.tipi-di-pagamento.si')}
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
                  {t('filtri.tipi-di-pagamento.no')}
                </ButtonForm>
              </Flex>
            </Flex>
          </Flex>
        </Filter>
      </Flex>
      <Flex direction='column'>
        <Table
          data={typesOfPayments}
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
          {typeOfPayment
            ? t('typeOfPayments.modifica-tipo-di-pagamento')
            : t('typeOfPayments.aggiungi-nuovo-tipo-di-pagamento')}
        </p>
        <Form
          show={show}
          skip={skip}
          take={take}
          handleShow={handleShow}
          typeOfPayment={typeOfPayment}
          selectList={typesOfPayments}
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
          objectName={typeOfPayment?.name}
        />
      </Flex>
    </PageLayout>
  );
};

export default TypeOfPayments;
