import GameTemplate from '../../components/GameTemplate/GameTemplate';
import games from '../../data/games';
import memoryCards from '../../data/memoryData';
import { useReducer, useEffect } from 'react';
import { SimpleGrid, Button } from '@chakra-ui/react';
import addPoints from '../../components/Functions/AddPoints';
import { useNavigate } from 'react-router-dom';

// Find the game title in the array that matches the specified one and return the title and instructions.
const { title, instructions } = games.find(
  (game) => game.title === 'Memory Game'
);

//Shuffle the cards randomly at the start of the game, duplicating the array to avoid modifying the original.
const shuffle = (cards) => {
  return [...cards].sort(() => Math.random() - 0.5);
};

// Initial state for useReducer
const getInitialState = () => ({
  cards: shuffle(memoryCards),
  flippedCards: [],
  matchedCards: [],
  isGameOver: false
});

// Handle game states
function handleStates(state, action) {
  switch (action.type) {
    case 'FLIP_CARD':
      if (
        state.flippedCards.length === 2 ||
        state.flippedCards.includes(action.index) ||
        state.matchedCards.includes(action.index)
      ) {
        return state;
      }
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.index]
      };

    case 'RESET_FLIPPED':
      return {
        ...state,
        flippedCards: []
      };

    case 'MATCH_CARDS':
      return {
        ...state,
        matchedCards: [...state.matchedCards, ...action.indexes]
      };

    case 'GAME_OVER':
      return { ...state, isGameOver: true };

    case 'RESTART_GAME':
      return getInitialState();
  }
}

const MemoryGame = () => {
  const [state, dispatch] = useReducer(
    handleStates,
    undefined,
    getInitialState
  );
  const { cards, flippedCards, matchedCards, isGameOver } = state;

  const handleFlipCard = (index) => {
    dispatch({ type: 'FLIP_CARD', index });
  };
  // Check if two flipped cards are matched and add points if they are. If they are not, reset the flipped cards after 1 second.
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (
        cards[firstCard].emoji === cards[secondCard].emoji &&
        firstCard !== secondCard
      ) {
        dispatch({ type: 'MATCH_CARDS', indexes: [firstCard, secondCard] });
        addPoints();
      }
      setTimeout(() => dispatch({ type: 'RESET_FLIPPED' }), 1000);
    }
  }, [flippedCards, cards]);

  // Check if game is over
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      dispatch({ type: 'GAME_OVER' });
    }
  }, [matchedCards, cards]);

  // It resets the game
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
    <>
      <GameTemplate
        title={title}
        instructions={instructions}
        headingColor='orange.800'
        bgColor='orange.400'
        borderColor='orange.500'
        isOpen={isGameOver}
        onReplay={handleReplay}
        onHome={handleHome}
      >
        <SimpleGrid
          columns={[3, 4, 5]}
          spacing='4'
          w={{ base: '50%', sm: '70%', md: '100%' }}
          maxW='900px'
          minW='375px'
          justifyItems='center'
          alignItems='center'
          gap='8'
          p={{ base: 4, md: 8 }}
        >
          {cards.map((card, index) => {
            const isFlipped =
              flippedCards.includes(index) || matchedCards.includes(index);
            return (
              <Button
                key={index}
                h='100px'
                w='100px'
                fontSize='6xl'
                bg={isFlipped ? 'green.200' : 'red.200'}
                color='black'
                borderRadius='md'
                borderWidth='2px'
                borderColor='orange.500'
                onClick={() => handleFlipCard(index)}
                isDisabled={
                  flippedCards.length === 2 || matchedCards.includes(index)
                }
                _hover={{ bg: 'red.300' }}
              >
                {isFlipped ? card.emoji : '❓'}
              </Button>
            );
          })}
        </SimpleGrid>
      </GameTemplate>
    </>
  );
};

export default MemoryGame;
