import {
  Center,
  FormControl,
  Input,
  Stack,
  Text,
  Pressable,
  ScrollView,
} from 'native-base';
import React, {useState} from 'react';
import Btn_Primary from '../button/Btn_Primary';
import register from '../../api/Register';
import Icon from 'react-native-vector-icons/Ionicons';

const Form = ({
  text,
  value,
  onChangeText,
  isInvalid,
  placeholder,
  errors,
  showError,
  type,
  InputRightElement,
}) => {
  return (
    <Stack>
      <Text fontSize={'sm'} fontWeight={600} color={'Text'} mb={2}>
        {text}
      </Text>
      <Input
        bgColor={'Secondary'}
        focusOutlineColor={'Primary'}
        borderRadius={10}
        px={3}
        h={10}
        type={type}
        InputRightElement={InputRightElement}
        alignItems={'center'}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        isInvalid={isInvalid} // Ensure it's a boolean
      />
      {errors ? (
        <Text fontSize={'2xs'} fontWeight={400} color={'Danger'}>
          *{errors}
        </Text>
      ) : null}
    </Stack>
  );
};

const Form_Register = ({onRegisterSuccess, setMessage, setMessageSuccess}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = async () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let hasError = false;

    // Validasi Nama
    if (name.trim() === '') {
      setNameError('Nama tidak boleh kosong');
      hasError = true;
    } else if (name.trim().length < 3) {
      setNameError('Nama harus terdiri dari minimal 3 karakter');
      hasError = true;
    }

    // Validasi Email
    if (email.trim() === '') {
      setEmailError('Email tidak boleh kosong');
      hasError = true;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Format email tidak valid');
      hasError = true;
    }

    // Validasi Password
    if (password.trim() === '') {
      setPasswordError('Password tidak boleh kosong');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password harus minimal 8 karakter');
      hasError = true;
    }

    // Validasi Confrim Password
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password tidak boleh kosong');
      hasError = true;
    } else if (confirmPassword.length < 8) {
      setConfirmPasswordError('Confirm Password harus minimal 8 karakter');
      hasError = true;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Confirm Password tidak cocok');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsLoading(true);
      const responseData = await register(
        name,
        email,
        password,
        confirmPassword,
      );
      setMessageSuccess(responseData.message);
      onRegisterSuccess(email);
    } catch (error) {
      let errorMessage = '';
      if (typeof error === 'object') {
        errorMessage = Object.values(error).flat().join('\n');
      } else {
        errorMessage = error;
      }

      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Center>
        <FormControl>
          <Stack space={3}>
            {/* Name Field */}
            <Form
              text={'Name'}
              value={name}
              onChangeText={value => {
                setName(value);
                setNameError('');
              }}
              placeholder={'Enter your name'}
              isInvalid={!!nameError}
              errors={nameError}
            />

            {/* Email Field */}
            <Form
              text={'Email'}
              value={email}
              onChangeText={value => {
                setEmail(value);
                setEmailError('');
              }}
              placeholder={'Enter your email address'}
              isInvalid={!!emailError}
              errors={emailError}
            />

            {/* Password Field */}
            <Form
              text={'Password'}
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
              placeholder={'Enter your password'}
              isInvalid={!!passwordError}
              errors={passwordError}
            />

            {/* Confirm Password Field */}
            <Form
              text={'Confirm Password'}
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
              value={confirmPassword}
              onChangeText={value => {
                setConfirmPassword(value);
                setConfirmPasswordError('');
              }}
              placeholder={'Re-enter Password'}
              isInvalid={!!confirmPasswordError}
              errors={confirmPasswordError}
            />
          </Stack>

          {/* Register Button */}
          <Stack my={6}>
            <Btn_Primary
              isLoading={isLoading}
              onPress={handleSubmit}
              text={'Register'}
              boxBgColor={'Secondary'}
              boxBgColorPressed={'Primary'}
              textColor={'Primary'}
            />
          </Stack>
        </FormControl>
      </Center>
    </ScrollView>
  );
};

export default Form_Register;
