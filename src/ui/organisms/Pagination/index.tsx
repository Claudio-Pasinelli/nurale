import { Flex } from '@chakra-ui/react';
import { ButtonForm, Icons } from '../../atoms';
import InputPage from '../../molecules/InputPage';
import { darkModePalette } from '../../themes/colors';
import { theme } from '../../themes';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/applicationStore';
import { useSelector } from 'react-redux';

interface Props
{
    show: boolean;
    take: number;
    getPagination: any;
    // eslint-disable-next-line no-empty-pattern
    fetch: ({})=> void
}

const Pagination = ({show, take, getPagination, fetch}:Props) =>
{
    const dispatch = useAppDispatch();

    const [maxNumPage, setMaxNumPage] = useState<number>(1);
    const [numPage, setNumPage] = useState<number>(1);
    const [skip, setSkip] = useState<number>(0);
    const pagination = useSelector(getPagination);
    const [minReached, setMinReached] = useState(true);
    const [maxReached, setMaxReached] = useState(false);

    const handleIncreasePage = async () =>
    {
        let page = numPage;
        page++;
        
        if(numPage < maxNumPage)
        {
            setNumPage(numPage && page);
            const skipValueIncrement = skip + 10
        
            await dispatch(fetch(
                {
                    search: '',
                    skip: skipValueIncrement,
                    take: take,
                }
                ));
            setSkip(skipValueIncrement);
            setMaxReached(false);
            setMinReached(false);
        }

        setMaxReached(true);
        return null;
    }

    const handleDecreasePage = () =>
    {
        let page = numPage;
        page--;

        if(numPage >= 2)
        {
            setNumPage(numPage && page);
            const skipValueDecrement = skip - 10

            dispatch(fetch(
                {
                    search: '',
                    skip: skipValueDecrement,
                    take: take,
                }
            ));
    
            setSkip(skipValueDecrement);
            setMinReached(false);
            setMaxReached(false);
        }
        
        setMinReached(true);
        return null;
    }
    
    useEffect(()=>
    {
        dispatch(fetch(
            {
                search: '',
                skip: skip,
                take: take,
            }
        ));

        if(pagination as number % take === 0)
        {
            setMaxNumPage(Math.floor(pagination as number) / take);
            return;
        }
        
        setMaxNumPage(Math.floor(pagination as number / take) + 1);
        return;
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