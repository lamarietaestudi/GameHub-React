import GameTemplate from '../../components/GameTemplate/GameTemplate';
import games from '../../data/games';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, SimpleGrid, Button, Image, Box } from '@chakra-ui/react';
import addPoints from '../../components/Functions/AddPoints';
import { getInitialState, handsWarReducer } from '../../hooks/handsWarReducer';

const { title, instructions } = games.find(
  (game) => game.title === 'Hands War'
);

const handChoices = [
  {
    value: 'Rock',
    image: '/assets/rock.png'
  },
  { value: 'Paper', image: '/assets/paper.png' },
  { value: 'Scissors', image: '/assets/scissors.png' }
];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Returns the message corresponding to the result of the game
const handleResultMessage = (playerHand, rivalHand) => {
  if (playerHand === rivalHand) {
    return "It's a tie!";
  } else if (
    (playerHand === 'Rock' && rivalHand === 'Scissors') ||
    (playerHand === 'Paper' && rivalHand === 'Rock') ||
    (playerHand === 'Scissors' && rivalHand === 'Paper')
  ) {
    return `${capitalize(playerHand)} beats ${capitalize(rivalHand)}, you win!`;
  } else {
    return `${capitalize(rivalHand)} beats ${capitalize(
      playerHand
    )}, you lose!`;
  }
};

const HandsWar = () => {
  const [state, dispatch] = useReducer(handsWarReducer, getInitialState);
  const { playerHand, rivalHand, showRivalHand, isGameOver, result } = state;

  const handlePlayerHand = (value) => {
    dispatch({ type: 'SET_PLAYER_HAND', value });
  };

  // Randomly selects a rival hand and call the function handleResultMessage to send the message of the result of the game to the modal component.
  const handleRivalHand = () => {
    const randomHand =
      handChoices[Math.floor(Math.random() * handChoices.length)].value;
    dispatch({ type: 'SET_RIVAL_HAND', value: randomHand });

    const message = handleResultMessage(playerHand, randomHand);
    dispatch({ type: 'SET_RESULT', value: message });

    if (message.includes('win')) {
      addPoints(); // Add points if the player wins
    }
  };

  // It resets the game and updates the board.
  const handleReplay = () => {
    dispatch({ type: 'RESTART_GAME' });
  };

  // It redirects to the home page
  const navigate = useNavigate();
  const handleHome = () => {
    dispatch({ type: 'RESTART_GAME' });
    navigate('/');
  };

  return (
    <GameTemplate
      title={title}
      instructions={instructions}
      headingColor='pink.800'
      bgColor='pink.400'
      borderColor='pink.500'
      isOpen={isGameOver}
      onReplay={handleReplay}
      onHome={handleHome}
      message={result}
    >
      <Box justifyItems='center' textAlign='center'>
        <Text m='4' fontWeight='500'>
          Choose your hand
        </Text>
        <SimpleGrid columns={[1, 3]} gap='5'>
          {handChoices.map((hand) => (
            <Button
              key={hand.value}
              h='150px'
              w='150px'
              onClick={() => handlePlayerHand(hand.value)}
              isDisabled={!playerHand}
              variant={playerHand === hand.value ? 'solid' : 'outline'}
              borderWidth={playerHand === hand.value ? '3px' : '1px'}
              borderColor={
                playerHand === hand.value ? 'green.500' : 'green.500'
              }
              _hover={{ bg: 'green.500' }}
              _active={{ bg: 'red.700' }}
            >
              <Image src={hand.image} alt={hand.value} />
            </Button>
          ))}
        </SimpleGrid>
        <Button
          colorScheme='green'
          m='4'
          onClick={playerHand ? handleRivalHand : undefined}
          isDisabled={!!playerHand || showRivalHand}
          cursor={!playerHand || rivalHand ? 'not-allowed' : 'pointer'}
          _hover={
            !playerHand || rivalHand ? { bg: 'red' } : { bg: 'green.700' }
          }
        >
          Play
        </Button>
        <Box>
          <Text mt='2' fontWeight='500'>
            Rival Hand
          </Text>
          <Box
            h='150px'
            w='150px'
            bg='red.200'
            justifyContent='center'
            alignItems='center'
            m='4'
            border='1px solid'
            borderColor='red.700'
            borderRadius='md'
            fontSize='4xl'
            textAlign='center'
          >
            {!rivalHand ? (
              <Text fontSize='8xl' fontWheigth='bold'>
                ❓{' '}
              </Text>
            ) : (
              <Image
                src={
                  handChoices.find((hand) => hand.value === rivalHand)?.image
                }
              />
            )}
          </Box>
        </Box>
      </Box>
    </GameTemplate>
  );
};
export default HandsWar;
