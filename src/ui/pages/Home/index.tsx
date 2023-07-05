import { PageLayout } from '../../molecules';

interface Props {
  name?: string;
}

const Home = ({ name }: Props) => {
  return <PageLayout name={name}>altro</PageLayout>;
};

export default Home;
