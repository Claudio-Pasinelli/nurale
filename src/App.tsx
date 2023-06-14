import { ChakraProvider } from '@chakra-ui/react';
import AppRouter from './routes'
import { theme } from './ui';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
