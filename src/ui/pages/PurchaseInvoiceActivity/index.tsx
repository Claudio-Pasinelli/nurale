import { Flex } from '@chakra-ui/react';
import { Header } from '../../organisms';

interface Props
{
    name?: string;
}

const PurchaseInvoiceActivity = ({name}:Props) =>
{
    return (
        <Flex width='100vw' direction='column'>
            <Header name={name}/>
            <Flex paddingTop='3rem' paddingRight='3.3rem' paddingLeft='2.8rem'>
                <div>altro</div>
            </Flex>
        </Flex>
    )
}

export default PurchaseInvoiceActivity;