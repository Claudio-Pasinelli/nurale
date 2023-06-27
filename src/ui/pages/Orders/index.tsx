import { PageLayout } from '../../molecules';

interface Props
{
    name?: string;
}

const Orders = ({name}:Props) =>
{
    return (
        <PageLayout name={name}>
            altro
        </PageLayout>
    )
}

export default Orders;