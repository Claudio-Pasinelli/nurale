import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { Sidebar } from 'ui/organisms';

const Layout = () => {
  return (
    <Flex width='100vw' height='100vh'>
      <Flex width='100%' height='100%'>
        <Sidebar />
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Layout;
