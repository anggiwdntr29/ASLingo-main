import {
  Center,
  FormControl,
  Input,
  Stack,
  Button,
  Text,
  Pressable,
} from 'native-base';
import React, {useContext, useState} from 'react';
import Btn_Primary from '../button/Btn_Primary';
import {AuthContext} from '../../api/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Form_Login = ({userEmail, navigation, setMessage}) => {
  const [email, setEmail] = useState(userEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (email.trim() === '') {
      setEmailError('Email tidak boleh kosong');
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setEmailError('Email tidak valid');
      hasError = true;
    }

    if (password.trim() === '') {
      setPasswordError('Password tidak boleh kosong');
      hasError = true;
    } else if (password.trim().length < 8) {
      setPasswordError('Password minimal 8 karakter');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Proceed with login attempt
    try {
      setIsLoading(true);
      await login(email, password, navigation);
      setMessage('Login Success');
    } catch (error) {
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center>
      <FormControl>
        <Stack space={3}>
          <Stack>
            <Text mb={2} fontSize={'sm'} fontWeight={600} color={'Text'}>
              Email
            </Text>
            <Input
              bgColor={'Secondary'}
              focusOutlineColor={'Primary'}
              borderRadius={10}
              px={3}
              h={10}
              alignItems={'center'}
              value={email}
              onChangeText={value => {
                setEmail(value);
                setEmailError('');
              }}
              placeholder={'Masukan alamat Email kamu'}
              isInvalid={!!emailError}
            />
            {emailError ? (
              <Text fontSize={'2xs'} fontWeight={400} color={'Danger'}>
                *{emailError}
              </Text>
            ) : null}
          </Stack>
          <Stack>
            <Text mb={2} fontSize={'sm'} fontWeight={600} color={'Text'}>
              Kata Sandi
            </Text>
            <Input
              bgColor={'Secondary'}
              focusOutlineColor={'Primary'}
              borderRadius={10}
              px={3}
              h={10}
              alignItems={'center'}
              p={2}
              type={showPassword ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={handleShowPassword} px={3}>
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={'#C2CCD6'}
                  />
                </Pressable>
              }
              value={password}
              onChangeText={value => {
                setPassword(value);
                setPasswordError('');
              }}
              placeholder={'Masukan kata sandi kamu'}
              isInvalid={!!passwordError}
            />
            {passwordError ? (
              <Text fontSize={'2xs'} fontWeight={400} color={'Danger'}>
                *{passwordError}
              </Text>
            ) : null}
          </Stack>
        </Stack>
        <Button variant={'link'} justifyContent={'flex-end'} mt={1} mb={4}>
          {/* <Text
            onPress={() => console.log('pressed Forgot Password')}
            fontSize={'sm'}
            fontWeight={500}
            color={'Text'}>
            Forgot Password?
          </Text> */}
        </Button>
        <Stack mb={6}>
          <Btn_Primary
            isLoading={isLoading}
            onPress={handleSubmit}
            text={'Masuk'}
            boxBgColor={'Secondary'}
            textColor={'Primary'}
          />
        </Stack>
      </FormControl>
    </Center>
  );
};

export default Form_Login;
