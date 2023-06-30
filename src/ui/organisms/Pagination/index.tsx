import { Flex } from '@chakra-ui/react';
import { ButtonForm, Icons } from '../../atoms';
import { darkModePalette } from '../../themes/colors';
import { theme } from '../../themes';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/applicationStore';
import { useSelector } from 'react-redux';
import { InputPage } from '../../molecules';
interface Props
{
    show: boolean;
    take: number;
    getPagination: any;
    skip: number;
    setSkip: (skip: number) => void;

    // eslint-disable-next-line no-empty-pattern
    fetch: ({})=> void
    fetchFiltered?: ()=> void
}

const Pagination = ({show, take, getPagination, skip, setSkip, fetch, fetchFiltered}:Props) =>
{
    const dispatch = useAppDispatch();

    const [maxNumPage, setMaxNumPage] = useState<number>(1);
    const [numPage, setNumPage] = useState<number>(1);
    const pagination = useSelector(getPagination);
    const [minReached, setMinReached] = useState(true);
    const [maxReached, setMaxReached] = useState(false);

    const handleIncreasePage = async () =>
    {
        let page = numPage;
        page++;
        
        if(page <= maxNumPage)
        {
            setNumPage(numPage && page);
            const skipValueIncrement = skip + take;

            setSkip(skipValueIncrement);
            setMinReached(false);
            
            if(page === maxNumPage)
            {
                setMaxReached(true);
            }

            else
            {
                setMaxReached(false);
            }
        
            if(fetchFiltered)
            {
                return fetchFiltered();
            }

            dispatch(fetch(
                {
                    search: '',
                    skip: skipValueIncrement,
                    take: take,
                }
            ));
        }

        if(page > maxNumPage)
        {
            setMaxReached(true);
            return null;
        }
    }

    const handleDecreasePage = () =>
    {
        let page = numPage;
        
        if(page >= 2)
        {
            page--;
            setNumPage(numPage && page);
            const skipValueDecrement = skip - take;

            setSkip(skipValueDecrement);
            setMaxReached(false);

            if(page === 1)
            {
                setMinReached(true);
            }

            else
            {
                setMinReached(false);
            }

            if(fetchFiltered)
            {
                return fetchFiltered();
            }

            dispatch(fetch(
                {
                    search: '',
                    skip: skipValueDecrement,
                    take: take,
                }
            ));
        }

        if(page === 1)
        {
            setMinReached(true);
            return null;
        }
    }
    
    useEffect(()=>
    {
        if(pagination as number % take === 0)
        {
            setMaxNumPage(Math.floor(pagination as number) / take);
            return;
        }
        
        setMaxNumPage(Math.floor(pagination as number / take) + 1);

        if(numPage === maxNumPage)
        {
            setMaxReached(true);
        }

        if(numPage === 1)
        {
            setMinReached(true);
        }

        setMaxReached(false);
        return setMinReached(false);
    },[pagination]);

    return(
        <Flex justifyContent='right' style={{margin: '5% 0 15% 0'}} display={show ? 'none' : 'flex'}>
            <InputPage containerWidth='10%' value={numPage} type='number' label='Pagina' name='Pagina' placeholder='Num. pagina' fontWeight={theme.fontWeights.bold}/>
            <p style={{fontWeight: theme.fontWeights.bold, alignSelf: 'center'}}> di {maxNumPage}</p>
            <ButtonForm background={minReached ? darkModePalette.gray : darkModePalette.pink100} margin='0 5px 0 15px' padding='0' width='fit-content' onClick={handleDecreasePage}>
                <Icons name='btnTriangoloSn' size={1}/>
            </ButtonForm>
            <ButtonForm background={maxReached ? darkModePalette.gray : darkModePalette.pink100} padding='0' width='fit-content' onClick={handleIncreasePage}>
                <Icons name='btnTriangoloDx' size={1}/>
            </ButtonForm>
        </Flex>
    )
}

export default Pagination;