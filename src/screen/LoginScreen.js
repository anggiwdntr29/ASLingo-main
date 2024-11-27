import React, {useState, useEffect} from 'react';
import {Text, Heading, View, Stack, HStack, Pressable} from 'native-base';
import Form_Register from '../components/form/Form_Register';
import Form_Login from '../components/form/Form_Login';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');

  const resetFormState = () => {
    // setUserEmail('');
    setMessage('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
      setMessageSuccess('');
    }, 1000);

    return () => clearTimeout(timer);
  }, [message, messageSuccess]);

  const toggleShowLoginForm = () => {
    resetFormState();
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };
  const toggleShowRegisterForm = () => {
    resetFormState();
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };
  const handleRegisterSuccess = email => {
    setUserEmail(email);
    toggleShowLoginForm();
  };

  useEffect(() => {
    if (message) {
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan!',
        text2: message,
      });
    } else if (messageSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Berhasil!',
        text2: messageSuccess,
      });
    }
  }, [message, messageSuccess]);

  return (
    <View backgroundColor={'Primary'} flex={1} px={6}>
      <Stack mt={6} mb={2}>
        <Heading fontWeight={800} color={'Text'}>
          {showLoginForm && 'Masuk dengan Akun kamu'}
          {showRegisterForm && 'Buat Akun baru'}
        </Heading>
        <Text
          color={'Text'}
          fontSize={'sm'}
          fontWeight={400}
          textAlign={'left'}>
          {showLoginForm &&
            'Senang melihat kamu kembali! Ayo lanjutkan pelajaran dengan ExpreSign.'}
          {showRegisterForm &&
            'Mulailah belajar bersama ExpreSign. Buat Akun baru kamu sekarang!'}
        </Text>
      </Stack>
      <HStack
        justifyContent={'space-evenly'}
        mb={3}
        borderWidth={2}
        borderColor={'Secondary'}
        p={1}
        rounded={'full'}>
        <Pressable
          rounded={'full'}
          backgroundColor={showLoginForm ? 'Secondary' : 'Primary'}
          w={'50%'}
          justifyContent={'center'}
          alignItems={'center'}
          onPress={toggleShowLoginForm}>
          <Text
            w={'80%'}
            textAlign={'center'}
            fontWeight={700}
            fontSize={'lg'}
            letterSpacing={'xl'}
            color={showLoginForm ? 'Primary' : 'Grey'}>
            Masuk
          </Text>
        </Pressable>
        <Pressable
          rounded={'full'}
          backgroundColor={showRegisterForm ? 'Secondary' : 'Primary'}
          w={'50%'}
          justifyContent={'center'}
          alignItems={'center'}
          onPress={toggleShowRegisterForm}>
          <Text
            fontWeight={700}
            fontSize={'lg'}
            letterSpacing={'xl'}
            color={showRegisterForm ? 'Primary' : 'Grey'}>
            Daftar
          </Text>
        </Pressable>
      </HStack>
      {showLoginForm && (
        <Form_Login
          userEmail={userEmail}
          navigation={navigation}
          setMessage={setMessage}
        />
      )}
      {showRegisterForm && (
        <Form_Register
          onRegisterSuccess={handleRegisterSuccess}
          navigation={navigation}
          setMessage={setMessage}
          setMessageSuccess={setMessageSuccess}
        />
      )}
    </View>
  );
};

export default LoginScreen;
