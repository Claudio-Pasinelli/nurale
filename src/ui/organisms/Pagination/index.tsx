import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'store';
import { ButtonForm, Icons, InputPagination, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
interface Props {
  show: boolean;
  take: number;
  totalPages: number;
  skip: number;
  setSkip: (skip: number) => void;

  // eslint-disable-next-line no-empty-pattern
  fetch: ({}) => void;
  fetchFiltered?: () => void;
}

const Pagination = ({ show, take, totalPages, skip, setSkip, fetch, fetchFiltered }: Props) => {
  const dispatch = useAppDispatch();

  const [maxNumPage, setMaxNumPage] = useState<number>(1);
  const [numPage, setNumPage] = useState<number>(1);
  const [minReached, setMinReached] = useState(true);
  const [maxReached, setMaxReached] = useState(false);

  const handleIncreasePage = async () => {
    let page = numPage;
    page++;

    if (page <= maxNumPage) {
      setNumPage(numPage && page);
      const skipValueIncrement = skip + take;

      setSkip(skipValueIncrement);
      setMinReached(false);

      page === maxNumPage ? setMaxReached(true) : setMaxReached(false);

      if (fetchFiltered) {
        return fetchFiltered();
      }

      dispatch(
        fetch({
          search: '',
          skip: skipValueIncrement,
          take: take,
        }),
      );
    }

    if (page > maxNumPage) {
      setMaxReached(true);
      return null;
    }
  };

  const handleDecreasePage = () => {
    let page = numPage;

    if (page >= 2) {
      page--;
      setNumPage(numPage && page);
      const skipValueDecrement = skip - take;

      setSkip(skipValueDecrement);
      setMaxReached(false);

      page === 1 ? setMinReached(true) : setMinReached(false);

      if (fetchFiltered) {
        return fetchFiltered();
      }

      dispatch(
        fetch({
          search: '',
          skip: skipValueDecrement,
          take: take,
        }),
      );
    }

    if (page === 1) {
      setMinReached(true);
      return null;
    }
  };

  useEffect(() => {
    totalPages === 0
      ? setMaxNumPage(totalPages + 1)
      : totalPages % take === 0
      ? setMaxNumPage(totalPages)
      : setMaxNumPage(totalPages + 1);

    if (numPage === 1 && maxNumPage === 1) {
      setMinReached(true);
      return setMaxReached(true);
    }

    setMaxReached(false);
    return setMinReached(true);
  }, [totalPages]);

  return (
    <Flex
      justifyContent='right'
      style={{ margin: '5% 0', height: 'fit-content' }}
      display={show ? 'none' : 'flex'}
    >
      <InputPagination
        containerWidth='10%'
        value={numPage}
        type='number'
        label='Pagina'
        name='Pagina'
        placeholder='Num. pagina'
        fontWeight={theme.fontWeights.bold}
      />
      <p style={{ fontWeight: theme.fontWeights.bold, alignSelf: 'center' }}> di {maxNumPage}</p>
      <ButtonForm
        background={minReached ? darkModePalette.gray : darkModePalette.pink100}
        margin='0 5px 0 15px'
        padding='0'
        width='fit-content'
        onClick={handleDecreasePage}
      >
        <Icons name='btnTriangoloSn' size={1} />
      </ButtonForm>
      <ButtonForm
        background={maxReached ? darkModePalette.gray : darkModePalette.pink100}
        padding='0'
        width='fit-content'
        onClick={handleIncreasePage}
      >
        <Icons name='btnTriangoloDx' size={1} />
      </ButtonForm>
    </Flex>
  );
};

export default Pagination;
