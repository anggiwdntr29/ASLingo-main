import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import Routes from './src/routes';
import {customTheme} from './src/theme';
import {AuthProvider} from './src/api/AuthContext';
import Toast from 'react-native-toast-message';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={customTheme}>
        <AuthProvider>
          <Routes />
          <FlashMessage position="top" />
          <Toast />
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
