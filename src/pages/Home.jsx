import { Heading, Flex, Box, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard/GameCard';
import games from '../data/games.js';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Flex direction='column' align='center' minH='100vh' bg='teal.700' py='8'>
        <Box w='100%' maxW='900px'>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify='space-between'
            align={{ base: 'flex-start', md: 'center' }}
            wrap='wrap'
            mb='6'
          >
            <Heading
              color='white'
              pl='20px'
              textAlign={{ base: 'center', md: 'left' }}
              fontSize={{ base: '2xl', md: '4xl' }}
            >
              GameHub
            </Heading>
          </Flex>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} justifyItems='center'>
          {games.map((game) => (
            <GameCard
              key={game.title}
              title={game.title}
              image={game.image}
              onPlay={() => navigate(game.route)}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
}

export default Home;
