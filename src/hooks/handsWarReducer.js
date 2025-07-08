// Initial state for useReducer
export const getInitialState = () => ({
  playerHand: '',
  rivalHand: '',
  showRivalHand: false,
  isGameOver: false,
  result: ''
});

// Handle game states
export function handsWarReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYER_HAND':
      return { ...state, playerHand: action.value };
    case 'SET_RIVAL_HAND':
      return { ...state, rivalHand: action.value, showRivalHand: true };
    case 'SET_RESULT':
      return { ...state, result: action.value, isGameOver: true };
    case 'RESTART_GAME':
      return getInitialState;
    default:
      return state;
  }
}
