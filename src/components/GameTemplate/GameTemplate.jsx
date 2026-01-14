import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import GameModal from '../GameModal/GameModal';
import BackHomeButton from '../Buttons/BackToHomeButton';

const GameTemplate = ({
  title,
  instructions,
  children,
  headingColor = 'teal.900',
  bgColor = 'teal',
  borderColor = 'teal.700',
  isOpen,
  onReplay,
  onHome,
  message
}) => (
  <>
    <Flex
      direction='column'
      align='center'
      minH='100vh'
      py='8'
      px='2'
      bgColor={bgColor}
    >
      <Box w='100%' maxW='225' mb='8'>
        <Flex align='center' mb='6'>
          <Box>
            <BackHomeButton />
          </Box>
          <Box />
          <Heading
            flex='1'
            color={headingColor}
            textAlign='left'
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight='bold'
            pl='4'
          >
            {title}
          </Heading>
          <Box w={{ base: '22', md: '40' }} />
        </Flex>
        <Box
          border='2px solid'
          borderColor={borderColor}
          borderRadius='md'
          bg='whiteAlpha.900'
          p='4'
          mb='6'
          boxShadow='md'
        >
          <Text color='gray.700' fontWeight='medium' textAlign='center'>
            {instructions}
          </Text>
        </Box>

        <Box
          minH='62'
          bg='gray.50'
          borderRadius='md'
          boxShadow='sm'
          display='flex'
          alignItems='center'
          justifyContent='center'
          mb='4'
          w='100%'
          overflow='auto'
        >
          {children}
        </Box>
      </Box>
      <GameModal
        isOpen={isOpen}
        onReplay={onReplay}
        onHome={onHome}
        message={message}
      />
    </Flex>
  </>
);

export default GameTemplate;
