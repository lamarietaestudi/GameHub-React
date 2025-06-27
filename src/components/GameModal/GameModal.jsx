import { Dialog, Button, Text, Portal } from '@chakra-ui/react';

const GameModal = ({ isOpen, onReplay, onHome, message }) => {
  return (
    <Dialog.Root open={isOpen}>
      <Portal textAlign='center'>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header
              color='orange.800'
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight='bold'
            >
              Game Over
            </Dialog.Header>
            <Dialog.Body>
              <Text color='gray.700' fontWeight='bold' fontSize='lg' pb='6'>
                {message}
              </Text>
              <Text color='gray.700' fontWeight='bold' fontSize='md'>
                Play again?
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={onReplay}>Yes</Button>
              <Button onClick={onHome}>No</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default GameModal;
