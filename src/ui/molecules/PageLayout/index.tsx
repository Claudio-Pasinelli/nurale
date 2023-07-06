import { Flex } from '@chakra-ui/react';
import { Header } from 'ui';

interface Props {
  children: React.ReactNode;
  name?: string;
}

const PageLayout = ({ children, name }: Props) => {
  return (
    <div style={{ width: '100%' }}>
      <Flex width='100%' direction='column'>
        <Header />
      </Flex>
      <div
        style={{
          padding: '2rem 3rem 0px 1.8rem',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
