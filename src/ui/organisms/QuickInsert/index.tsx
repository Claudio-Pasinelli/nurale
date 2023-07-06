import { PageLayout } from 'ui';
interface Props {
  name?: string;
}

const QuickInsert = ({ name }: Props) => {
  return <PageLayout name={name}>altro</PageLayout>;
};

export default QuickInsert;
