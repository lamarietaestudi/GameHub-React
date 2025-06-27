import GameTemplate from '../../components/GameTemplate/GameTemplate';
import games from '../../data/games';
import { Box, Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import addPoints from '../../components/Functions/AddPoints';
import PlayButton from '../../components/Buttons/PlayButton';

const { title, instructions } = games.find(
  (game) => game.title === 'Topo Crash'
);

const maxTopos = 35;
const topoLifeTime = 3000;
const scenarioImage = '/assets/topocrash-scenario.svg';
const topoImage = '/assets/topocrash.png';

const TopoCrash = () => {
  const [topos, setTopos] = useState([]);
  const [topoCounter, setTopoCounter] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const scenarioRef = useRef(null);
  const [result, setResult] = useState('');
  const [clickedTopos, setClickedTopos] = useState(0);

  // Create topos randomly
  useEffect(() => {
    if (!isStarted || isGameOver || topoCounter >= maxTopos) return;

    const interval = setInterval(() => {
      if (scenarioRef.current && topoCounter < maxTopos) {
        const scentarioRect = scenarioRef.current.getBoundingClientRect();
        const topoWidth = 50;
        const topoHeight = 50;
        const left = Math.random() * (scentarioRect.width - topoWidth);
        const top = Math.random() * (scentarioRect.height - topoHeight);
        const id = Date.now() + Math.random();

        setTopos((prev) => [...prev, { id, left, top }]);
        setTopoCounter((prev) => prev + 1);

        // Remove the topo after a certain time
        setTimeout(() => {
          setTopos((prev) => prev.filter((topo) => topo.id !== id));
        }, topoLifeTime);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isStarted, isGameOver, topoCounter]);

  // Add points when the player clicks on a topo
  const handleTopoClick = (id) => {
    setTopos((prev) => prev.filter((topo) => topo.id !== id));
    setClickedTopos((prev) => prev + 1);
    addPoints();
  };

  // Check if the game is over
  useEffect(() => {
    if (
      isStarted &&
      topos.length === 0 &&
      topoCounter >= maxTopos &&
      !isGameOver
    ) {
      setIsGameOver(true);
    }
  }, [topos, topoCounter, isStarted, isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      setResult(
        `You've clicked on ${clickedTopos} "topo${
          clickedTopos === 1 ? '' : 's'
        }" of ${maxTopos}.`
      );
    }
  }, [isGameOver, clickedTopos]);

  const handleReplay = () => {
    setTopos([]);
    setTopoCounter(0);
    setClickedTopos(0);
    setIsStarted(false);
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
        onReplay={handleReplay}
        isOpen={isGameOver}
        onHome={handleHome}
        message={result}
        headingColor='purple.800'
        bgColor='purple.400'
        borderColor='purple.500'
      >
        <Box
          ref={scenarioRef}
          position='relative'
          bg='#35682f'
          w='100%'
          h='50svh'
          alignItems='center'
          justifyContent='center'
          display='flex'
        >
          <Image
            src={scenarioImage}
            alt='grass'
            position='absolute'
            objectFit='cover'
            top={0}
            left={0}
            w='100%'
            h='100%'
            zIndex={0}
          />
          {!isStarted && !isGameOver && (
            <Box
              position='absolute'
              top='50%'
              left='50%'
              zIndex={2}
              display='flex'
              flexDirection='column'
              alignItems='center'
              transform='translate(-50%, -50%)'
            >
              <PlayButton onClick={() => setIsStarted(true)}>Play</PlayButton>
            </Box>
          )}

          {isStarted &&
            topos.map((topo) => (
              <Image
                key={topo.id}
                src={topoImage}
                alt='topo'
                position='absolute'
                left={topo.left}
                top={topo.top}
                w={['12', '32']}
                h='auto'
                cursor='pointer'
                zIndex={1}
                onClick={() => handleTopoClick(topo.id)}
                transition='transform 0.1s'
                _active={{ transform: 'scale(0.9' }}
              />
            ))}
        </Box>
      </GameTemplate>
    </>
  );
};

export default TopoCrash;
