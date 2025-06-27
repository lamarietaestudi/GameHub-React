const games = [
  {
    title: 'Memory Game',
    image: '/assets/memory-card.jpg',
    route: '/memorygame',
    instructions:
      'Find all pairs of identical cards. Flip two cards per turn and try to remember their positions. Earn 1 point for each matching pair you discover.'
  },
  {
    title: 'Tic Tac Toe',
    image: '/assets/tictactoe-card.png',
    route: '/tictactoe',
    instructions:
      'Place your symbol in an empty space on the 3x3 grid. The computer will respond randomly. Win by aligning three of your symbols in a row, column, or diagonal. Game will finish if all spaces are filled without a winner.'
  },
  {
    title: 'Pokemon Battle',
    image: '/assets/pokemon-card.jpg',
    route: '/pokemonbattle',
    instructions:
      'Choose your Pokémon and test your luck in the battle ring. Earn 1 point for each victorious battle.'
  },
  {
    title: 'Topo Crash',
    image: '/assets/topocrash-card.png',
    route: '/topocrash',
    instructions:
      'Prevent the "topo" from digging holes in your garden. Click on it before it disappears. Earn 1 point each time the "topo" returns to its burrow.'
  },
  {
    title: 'Hands War',
    image: '/assets/handswar-card.png',
    route: '/handswar',
    instructions:
      'Choose rock, paper, or scissors. Rock defeats scissors, scissors defeat paper, and paper defeats rock. Earn 1 point for each victorious hand.'
  }
];

export default games;
