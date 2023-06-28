import { ButtonForm, Icons } from '..';
import { darkModePalette } from '../../themes/colors';
import { theme } from '../../themes';
import { Flex } from '@chakra-ui/react';

interface Props
{
    show: boolean;
    showFilters: boolean;
    children: any;
    handleFilters: ()=> void;
}

const Filter = ({show, showFilters, children, handleFilters}: Props) =>
{
    return <Flex direction='column' display={show ? 'none' : 'block'}>
            <ButtonForm marginTop='4rem' marginBottom='1rem' width='fit-content' onClick={handleFilters} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                Filtri
            </ButtonForm>
            {
                showFilters ? 
                <Flex zIndex={100} borderRadius='1rem' boxShadow={`1px 1px 4px 4px ${darkModePalette.purpleShadow}`} direction='column' padding='2rem 1.7rem' position='absolute' backgroundColor='white' width='21.25rem' height='42.75rem' top='25%' right='2%'>
                    <Flex justifyContent='space-between' border='solid rgba(123, 97, 255, 0.05)' borderWidth='0 0 0.2rem 0'>
                        <h2 style={{fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.sm}}>Filtri</h2>
                        <ButtonForm background='transparent' padding='0' width='fit-content' onClick={handleFilters}>
                            <Icons name='xCloseIcon' size={1.5}/>
                        </ButtonForm>
                    </Flex>
                    {
                        children
                    }
                </Flex>
                : null
            }
        </Flex>
}

export default Filter;