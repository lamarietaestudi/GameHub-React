import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import BackHomeButton from '../components/Buttons/BackToHomeButton/';

const NotFound = () => {
  return (
    <Flex minH='100vh' align='start' justify='center' pt='50px' bg='gray.50'>
      <Box
        border='2px solid'
        borderColor='gray.200'
        borderRadius='lg'
        bg='white'
        p='8'
        boxShadow='md'
        textAlign='center'
        w='30%'
      >
        <Heading mb='4' color='red.500'>
          404 Error
        </Heading>
        <Text mb='6' color='gray.600'>
          {' '}
          Page not found{' '}
        </Text>
        <BackHomeButton />
      </Box>
    </Flex>
  );
};
export default NotFound;
