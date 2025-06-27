import { Box, Image, Text, VStack } from '@chakra-ui/react';
import PlayButton from '../Buttons/PlayButton';

const GameCard = ({ title, image, onPlay }) => (
  <Box
    w='50'
    bg='white'
    borderRadius='lg'
    boxShadow='lg'
    borderWidth='1px'
    overflow='hidden'
    p='4'
    m='2'
    _hover={{ boxShadow: '2xl', transform: 'scale(1.03)' }}
    transition='all 0.2s'
  >
    <VStack spacing='3'>
      <Text
        fontWeight='bold'
        color='purple.800'
        fontSize='lg'
        textAlign='center'
      >
        {title}
      </Text>
      <Image
        src={image}
        alt={title}
        boxSize='48'
        objectFit='cover'
        bg='teal.400'
        borderRadius='md'
        my='3'
      />
      <PlayButton onClick={onPlay}></PlayButton>
    </VStack>
  </Box>
);
export default GameCard;
