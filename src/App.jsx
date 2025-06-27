import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import MemoryGame from './games/MemoryGame/MemoryGame.jsx';
import TicTacToe from './games/TicTacToe/TicTacToe.jsx';
import PokemonBattle from './games/PokemonBattle/PokemonBattle.jsx';
import TopoCrash from './games/TopoCrash/TopoCrash.jsx';
import HandsWar from './games/HandsWar/HandsWar.jsx';
import Counter from './components/Counter/Counter.jsx';

function App() {
  return (
    <>
      <Counter />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/memorygame' element={<MemoryGame />}></Route>
        <Route path='/tictactoe' element={<TicTacToe />}></Route>
        <Route path='/pokemonbattle' element={<PokemonBattle />}></Route>
        <Route path='/topocrash' element={<TopoCrash />}></Route>
        <Route path='/handswar' element={<HandsWar />}></Route>
      </Routes>
    </>
  );
}

export default App;
