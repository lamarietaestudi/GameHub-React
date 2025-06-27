import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
