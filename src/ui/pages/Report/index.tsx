import { PageLayout } from '../../molecules';
interface Props
{
    name?: string;
}

const Report = ({name}:Props) =>
{
    return (
        <PageLayout name={name}>
            altro
        </PageLayout>
    )
}

export default Report;