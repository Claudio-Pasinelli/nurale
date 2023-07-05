import { PageLayout } from '../../molecules';

interface Props {
  name?: string;
}

const Timesheet = ({ name }: Props) => {
  return <PageLayout name={name}>altro</PageLayout>;
};

export default Timesheet;
