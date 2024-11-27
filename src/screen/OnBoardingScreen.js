import React from 'react';
import {Text, Heading, VStack, Stack, Image, Center} from 'native-base';
import Btn_Primary from '../components/button/Btn_Primary';
import Logo from '../image/Logo.png';

const OnBoardingScreen = ({navigation}) => {
  return (
    <Stack
      backgroundColor={'Primary'}
      flex={1}
      px={6}
      pb={'20%'}
      justifyContent={'flex-end'}>
      <Center>
        <Image source={Logo} alt="logo" w={56} h={56} />
      </Center>
      <Stack mb={10} space={5}>
        <Heading
          color={'Text'}
          fontSize={'5xl'}
          fontWeight={800}
          letterSpacing={'xl'}
          textAlign={'center'}>
          ExpreSign
        </Heading>
        <Text
          color={'Text'}
          fontSize={'md'}
          fontWeight={400}
          letterSpacing={'md'}
          textAlign={'center'}>
          Selamat datang di ExpreSign! Mari mulai perjalanan yang menyenangkan
          dalam belajar Bahasa Inggris melalui Bahasa Isyarat Amerika.
        </Text>
      </Stack>
      <VStack>
        <Btn_Primary
          onPress={() => {
            navigation.replace('Login');
          }}
          text={'Ayo Mulai!'}
          boxBgColor={'Secondary'}
          textColor={'Primary'}
        />
      </VStack>
    </Stack>
  );
};

export default OnBoardingScreen;
