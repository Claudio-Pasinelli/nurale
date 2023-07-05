import { PageLayout } from '../../molecules';

interface Props {
  name?: string;
}

const Activities = ({ name }: Props) => {
  return <PageLayout name={name}>altro</PageLayout>;
};

export default Activities;
