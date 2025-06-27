import GameTemplate from '../../components/GameTemplate/GameTemplate';
import games from '../../data/games';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleGrid, Box, Text, Image, Button, Flex } from '@chakra-ui/react';
import addPoints from '../../components/Functions/AddPoints';
import PokemonCard from './PokemonCard';
import PokemonBox from './PokemonBox';

const { title, instructions } = games.find(
  (game) => game.title === 'Pokemon Battle'
);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
// Returns the message corresponding to the result of the game
const handleResultMessage = (playerPokemon, rivalPokemon) => {
  if (playerPokemon.attack === rivalPokemon.attack) {
    return "It's a tie!";
  } else if (playerPokemon.attack > rivalPokemon.attack) {
    return `${capitalize(playerPokemon.name)} beats ${capitalize(
      rivalPokemon.name
    )}, you win!`;
  } else {
    return `${capitalize(rivalPokemon.name)} beats ${capitalize(
      playerPokemon.name
    )}, you lose!`;
  }
};

const PokemonBattle = () => {
  const [pokemons, setPokemons] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [rivalPokemon, setRivalPokemon] = useState(null);
  const [showRivalPokemon, setShowRivalPokemon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState('');

  // Fetch 12 pokemons
  useEffect(() => {
    const allPokemons = [];
    let loaded = 0;
    for (let i = 1; i < 13; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((res) => res.json())
        .then((pokemon) => {
          allPokemons.push({
            id: pokemon.id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
            attack:
              pokemon.stats.find((stat) => stat.stat.name === 'attack')
                ?.base_stat || 0
          });
          loaded++;
          if (loaded === 12) {
            setPokemons(allPokemons);
          }
        });
    }
  }, []);

  // Randomly selects a rival pokemon and call the function handleResultMessage to send the message of the result of the game to the modal compoponent.
  const handleRivalPokemon = () => {
    const rivalPokemon = pokemons.filter(
      (pokemon) => pokemon.id !== playerPokemon.id
    );
    const randomPokemon =
      rivalPokemon[Math.floor(Math.random() * rivalPokemon.length)];
    setRivalPokemon(randomPokemon);
    setShowRivalPokemon(true);

    const message = handleResultMessage(playerPokemon, randomPokemon);
    setResult(message);
    setIsGameOver(true);

    if (message.includes('win')) {
      addPoints(); // Add points if the player wins
    }
  };

  // It resets the game and updates the board.
  const handleReplay = () => {
    setPlayerPokemon(null);
    setRivalPokemon(null);
    setIsGameOver(false);
    setShowRivalPokemon(false);
    setResult('');
  };

  // It redirects to the home page

  const navigate = useNavigate();
  const handleHome = () => {
    setIsGameOver(false);
    navigate('/');
  };

  return (
    <GameTemplate
      title={title}
      instructions={instructions}
      headingColor='yellow.800'
      bgColor='yellow.400'
      borderColor='yellow.500'
      isOpen={isGameOver}
      onReplay={handleReplay}
      onHome={handleHome}
      message={result}
    >
      <Box justifyItems='center' textAlign='center'>
        <SimpleGrid columns={[3, 4, 6, 12]} spacing='4' p='4' gap='4'>
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              selected={playerPokemon?.id === pokemon.id}
              onClick={() => !showRivalPokemon && setPlayerPokemon(pokemon)}
              disabled={showRivalPokemon}
            />
          ))}
        </SimpleGrid>
        <Flex
          alignItems='center'
          m='10'
          direction={{ base: 'column', md: 'row' }}
        >
          <PokemonBox
            label='Your Pokémon'
            isPlayer={true}
            pokemon={playerPokemon}
          />
          <Button
            colorScheme='yellow'
            m='4'
            onClick={
              playerPokemon && !showRivalPokemon
                ? handleRivalPokemon
                : undefined
            }
            isDisabled={!playerPokemon || showRivalPokemon}
            cursor={
              !playerPokemon || showRivalPokemon ? 'not-allowed' : 'pointer'
            }
            _hover={
              !playerPokemon || showRivalPokemon
                ? { bg: 'red' }
                : { bg: 'green' }
            }
          >
            Play
          </Button>
          <PokemonBox
            label='Your Rival'
            isPlayer={false}
            pokemon={showRivalPokemon ? rivalPokemon : null}
          />
        </Flex>
      </Box>
    </GameTemplate>
  );
};
export default PokemonBattle;
