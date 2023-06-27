import { PageLayout } from '../../molecules';

interface Props
{
    name?: string;
}

const Jobs = ({name}:Props) =>
{
    return (
        <PageLayout name={name}>
            altro
        </PageLayout>
    )
}

export default Jobs;