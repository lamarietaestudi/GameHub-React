import { Box, Text, Button } from '@chakra-ui/react';
import useGlobalPoints from '../../hooks/useGlobalPoints';

const Counter = () => {
  const [points, resetPoints] = useGlobalPoints();

  return (
    <>
      <Box
        position='fixed'
        top={{ base: 3, md: 4 }}
        right={{ base: 2, md: 8 }}
        zIndex={1000}
        bg='white'
        px='4'
        py='2'
        borderRadius='md'
        boxShadow='lg'
        display='flex'
        alignItems='center'
        flexDirection={{ base: 'column', sm: 'row' }}
        gap={{ base: 1, md: 2 }}
      >
        <Text fontWeight='bold' color='teal.700'>
          Points {points}
        </Text>
        <Button
          size='xs'
          colorScheme='teal'
          variant='outline'
          onClick={resetPoints}
        >
          Reset
        </Button>
      </Box>
    </>
  );
};

export default Counter;
