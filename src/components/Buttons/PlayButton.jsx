import { Button } from '@chakra-ui/react';
import React from 'react';

const PlayButton = React.memo(({ onClick }) => (
  <Button onClick={onClick}>Play</Button>
));

export default PlayButton;
