import { Button, Image, Text } from '@chakra-ui/react';
import React from 'react';
const PokemonCard = React.memo(({ pokemon, selected, disabled, onClick }) => (
  <Button
    h='100px'
    w='100px'
    borderWidth={selected ? '3px' : '1px'}
    borderColor={selected ? 'orange.600' : 'gray.200'}
    bg={selected ? 'orange.00' : 'white'}
    color='black'
    display='flex'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    onClick={onClick}
    isDisabled={disabled}
    _hover={{ bg: 'orange.300' }}
  >
    <Image
      src={pokemon.image}
      alt={pokemon.name}
      boxSize='70px'
      objectFit='contain'
    />
    <Text textTransform='capitalize' fontWeight='bold'>
      {pokemon.name}
    </Text>
  </Button>
));

export default PokemonCard;
