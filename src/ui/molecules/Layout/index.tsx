import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../atoms';
import { Flex } from '@chakra-ui/react';

const Layout = () => {
  return (
      <Flex flexDirection='column' width='100vw' height='100vh'>
        <Sidebar />
        <Outlet />
      </Flex>
  );
};

export default Layout;
