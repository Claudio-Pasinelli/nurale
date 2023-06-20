import { Flex } from '@chakra-ui/react'
import { Icons } from '../../atoms'
import { theme } from '../../themes'

interface Props
{
    name: string;
}

const Header = ({name}: Props) =>
{
    return(
        <Flex direction='row' alignItems='center'  height='48.5px' borderBottomRightRadius='2rem' boxShadow='rgba(81, 70, 137, 0.3) 0px 2px 6px'>
            <Flex height='100%' width='100%'>
                <Flex style={{height: '100%', width: '100%', background: 'linear-gradient(90deg, rgb(239, 66, 111) 0%, rgb(81, 70, 137) 26.06%, rgba(0, 0, 0, 0) 51.87%)'}}>
                    <p style={{color:'white', marginBlock:'auto', marginLeft: '2.2rem', fontSize: theme.fontSizes.lg}}>{name}</p>
                </Flex>
            </Flex>
            <Flex padding='0.5rem 1rem'>
                <div style={{marginRight:'2rem'}}>
                    <Icons name='notifiche' size={2}/>
                </div>
                <Icons name='profilo' size={2}/>
            </Flex>
        </Flex>
    )
}

export default Header