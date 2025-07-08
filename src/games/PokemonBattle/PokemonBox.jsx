import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';

const PokemonBox = React.memo(({ label, isPlayer, pokemon }) => (
  <Box
    w='52'
    h='52'
    borderWidth='2px'
    borderRadius='lg'
    borderColor={isPlayer ? 'orange.600' : 'purple.400'}
    bg='white'
    display='flex'
    justifyContent='flex-start'
    alignItems='center'
    flexDirection='column'
    m='5'
  >
    <Text
      color={isPlayer ? 'orange.800' : 'purple.800'}
      mt='4'
      fontWeight='900'
    >
      {label}
    </Text>
    {pokemon ? (
      <>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          objectFit='contain'
          boxSize='24'
          mt='2'
          transform={isPlayer ? 'scaleX(-1)' : 'none'}
        />
        <Text
          fontWeight='bold'
          color={isPlayer ? 'orange.800' : 'purple.800'}
          mt='4'
        >
          Power {pokemon.attack}
        </Text>
      </>
    ) : (
      <Text fontSize='8xl' color={isPlayer ? 'orange.800' : 'purple.800'}>
        ?
      </Text>
    )}
  </Box>
));

export default PokemonBox;
