import { ChakraProvider } from '@chakra-ui/react';
import AppRouter from './routes';
import { theme } from './ui';
import { Provider } from 'react-redux';
import { store } from './store/applicationStore';
function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
