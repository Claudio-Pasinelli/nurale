import { PageLayout } from '../../molecules';

interface Props
{
    name?: string;
}

const Suppliers = ({name}:Props) =>
{
    return (
        <PageLayout name={name}>
            altro
        </PageLayout>
    )
}

export default Suppliers;