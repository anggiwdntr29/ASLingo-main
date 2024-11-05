import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation, CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Center, Image, Spinner} from 'native-base';
import Logo from '../image/Logo.png';

const AuthContext = createContext();

const config = require('../../config');
const apiUrl = config.apiUrl;

const AuthProvider = ({children}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          const asyncuser = JSON.parse(userString);
          setUser(asyncuser);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [navigation]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });

      const Datauser = response.data;
      setUser(Datauser);

      if (user) {
        AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        AsyncStorage.removeItem('user');
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'home'}],
        }),
      );
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/api/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${user.auth.access_token}`,
        },
      });
      AsyncStorage.removeItem('user');
      setUser(null);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'OnBoarding'}],
        }),
      );
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  //Splah Screen
  if (loading) {
    return (
      <Center flex={1} backgroundColor={'Primary'}>
        <Image source={Logo} alt="logo" w={56} h={56} mb={4} />
        <Spinner size="sm" color={'Text'} />
      </Center>
    );
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
