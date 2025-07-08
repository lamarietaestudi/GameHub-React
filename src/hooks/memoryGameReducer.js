import memoryCards from '../data/memoryData';

//Shuffle the cards randomly at the start of the game, duplicating the array to avoid modifying the original.
const shuffle = (cards) => {
  return [...cards].sort(() => Math.random() - 0.5);
};

// Initial state for useReducer
export const getInitialState = () => ({
  cards: shuffle(memoryCards),
  flippedCards: [],
  matchedCards: [],
  isGameOver: false
});

// Handle game states
export function memoryGameReducer(state, action) {
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
