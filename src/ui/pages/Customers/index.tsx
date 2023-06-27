import { PageLayout } from '../../molecules';

interface Props
{
    name?: string;
}

const Customers = ({name}:Props) =>
{
    return (
        <PageLayout name={name}>
            altro
        </PageLayout>
    )
}

export default Customers;