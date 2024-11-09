import {
  AlertDialog,
  Button,
  Center,
  Heading,
  HStack,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {toCapitalCase} from '../formatter';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderContent = ({data, logout}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);

  const onClose = () => setIsOpen(false);

  const handleSubmit = async () => {
    await logout();
  };

  return (
    <Stack>
      <HStack
        backgroundColor={'Primary'}
        px={6}
        py={4}
        h={20}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Stack>
          <Heading color={'Text'} fontSize={'md'} fontWeight={600}>
            Hi, {toCapitalCase(data.user.name)}
          </Heading>
          <Text
            color={'Text'}
            fontSize={'sm'}
            fontWeight={400}
            letterSpacing={'lg'}>
            What do you want to learn today?
          </Text>
        </Stack>
        <Pressable onPress={() => setIsOpen(!isOpen)} p={2}>
          <Icon name="sign-out" size={28} color={'#fff'} />
        </Pressable>
      </HStack>
      <AlertDialog
        px={10}
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <Center
          w={'100%'}
          shadow={1}
          backgroundColor={'Secondary'}
          rounded={'xl'}
          p={6}>
          <Heading fontSize={'md'} fontWeight={500} color={'TextBlack'} pb={4}>
            Are your sure want to logout
          </Heading>
          <HStack w={'full'} justifyContent={'space-between'}>
            <Button
              borderColor={'Primary'}
              color={'Primary'}
              w={'49%'}
              variant="outline"
              onPress={handleSubmit}
              ref={cancelRef}>
              Yes, Logout
            </Button>
            <Button w={'49%'} backgroundColor={'Primary'} onPress={onClose}>
              No
            </Button>
          </HStack>
        </Center>
      </AlertDialog>
    </Stack>
  );
};

export default HeaderContent;
