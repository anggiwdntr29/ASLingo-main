import {AlertDialog, Button, Center, HStack, Heading, Stack} from 'native-base';
import React, {useContext, useRef, useState} from 'react';
import {AuthContext} from '../api/AuthContext';
import {toCapitalCase} from '../components/formatter';
import Btn_Secondary from '../components/button/Btn_Secondary';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);

  const handleSubmit = async () => {
    await logout();
  };

  const onClose = () => setIsOpen(false);

  return (
    <Stack backgroundColor={'Secondary'} flex={1}>
      <Stack
        space={1}
        borderBottomRadius={'3xl'}
        h={'30%'}
        backgroundColor={'Primary'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Stack
          padding={2}
          rounded={'full'}
          w={24}
          h={24}
          bg={'white'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Icon name="person" size={60} color={'#008DDA'} />
        </Stack>

        <Heading color={'Text'}>{toCapitalCase(user.user.name)}</Heading>
      </Stack>
      <Stack flex={1} px={6} pb={10}>
        <Stack flex={1} py={8} space={4}>
          {/* <SettingBar
            icon={'person'}
            text={'Account'}
            onPress={handleShowAlert}
          />
          <SettingBar
            icon={'settings'}
            text={'Settings'}
            onPress={handleShowAlert}
          /> */}
          {/* <SettingBar
            icon={'alert'}
            text={'About Us'}
            onPress={() => navigation.navigate('About')}
          /> */}
        </Stack>
        <Stack>
          <Btn_Secondary
            text={'Logout'}
            textColor={'Text'}
            onPress={() => setIsOpen(!isOpen)}
          />
        </Stack>
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
            <Heading
              fontSize={'md'}
              fontWeight={500}
              color={'TextBlack'}
              pb={4}>
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
    </Stack>
  );
};

export default ProfileScreen;
