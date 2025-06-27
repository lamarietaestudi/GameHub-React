import { useNavigate } from 'react-router-dom';
import { Button, Box, Text } from '@chakra-ui/react';
const BackHomeButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate('/')}>
      <Box display={{ base: 'inline', md: 'none' }}>
        <Text fontSize='md'>{'<<'}</Text>
      </Box>
      <Box display={{ base: 'none', md: 'inline' }}>Back to Home</Box>
    </Button>
  );
};

export default BackHomeButton;
