import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import GameTemplate from '../../components/GameTemplate/GameTemplate';
import games from '../../data/games';
import addPoints from '../../components/Functions/AddPoints';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Find the game title in the array that matches the specified one and return the title and instructions.
const { title, instructions } = games.find(
  (game) => game.title === 'Tic Tac Toe'
);

// Initialize the board with empty cells.
const initialBoard = Array(9).fill('');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to check if there is a winner.
const getWinner = (board) => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState('');

  // Logical for random player 'O' to make a move.
  useEffect(() => {
    if (player === 'O' && !isGameOver) {
      const emptyCells = board
        .map((cell, index) => (cell === '' ? index : null))
        .filter((index) => index !== null);
      if (emptyCells.length > 0) {
        const randomIndex =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        setTimeout(() => handleCellMove(randomIndex), 500);
      }
    }
  }, [player, isGameOver]);

  // Function to handle the move on a cell.
  const handleCellMove = (index) => {
    if (board[index] || isGameOver) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const winner = getWinner(newBoard);
    if (winner) {
      setResult(winner === 'X' ? 'You win!' : 'Computer wins!');
      setIsGameOver(true);
      if (winner === 'X') addPoints(); // Add points if player wins
    } else if (!newBoard.includes('')) {
      setResult('Tied game.');
      setIsGameOver(true);
    } else {
      setPlayer(player === 'X' ? 'O' : 'X'); // Switch player
    }
  };

  // It resets the game and updates the board.
  const handleReplay = () => {
    setBoard(initialBoard);
    setPlayer('X');
    setIsGameOver(false);
    setResult('');
  };

  // It redirects to the home page
  const navigate = useNavigate();
  const handleHome = () => {
    setIsGameOver(false);
    navigate('/');
  };
  return (
    <>
      <GameTemplate
        title={title}
        instructions={instructions}
        headingColor='green.800'
        bgColor='green.400'
        borderColor='green.500'
        isOpen={isGameOver}
        onReplay={handleReplay}
        onHome={handleHome}
        message={result}
      >
        <SimpleGrid columns='3' spacing='4' p='8' gap='5' minW='400px'>
          {board.map((cell, index) => (
            <Button
              key={index}
              h='100px'
              w='100px'
              fontSize='7xl'
              color={cell === 'X' ? '#fff' : cell === 'O' ? '#fff' : '#fff'}
              bg={
                cell === 'X' ? '#2e855b' : cell === 'O' ? '#e60000' : '#5c00e6'
              }
              border='1px solid rgb(76, 76, 76)'
              _hover={!cell ? { bg: '#f72585' } : {}}
              _active={!cell ? { bg: '#f72585' } : {}}
              onClick={() => handleCellMove(index)}
              disabled={isGameOver || cell}
            >
              {cell || ' '}
            </Button>
          ))}
        </SimpleGrid>
      </GameTemplate>
    </>
  );
};

export default TicTacToe;
