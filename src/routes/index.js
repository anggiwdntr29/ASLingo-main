/* eslint-disable react/no-unstable-nested-components */
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screen/LoginScreen';
import OnBoardingScreen from '../screen/OnBoardingScreen';
import HomeScreen from '../screen/HomeScreen';
import ClassScreen from '../screen/ClassScreen';
import ListLessonsScreen from '../screen/ListLessonsScreen';
import DetailLessonsScreen from '../screen/DetailLessonsScreen';
import QuizScreen from '../screen/QuizScreen';
import DetailQuizScreen from '../screen/DetailQuizScreen';
import {AuthContext} from '../api/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutScreen from '../screen/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
  // useEffect(() => {
  //   const refreshTab = currentTab => {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{name: currentTab}],
  //     });
  //     setRefreshing(false);
  //   };

  //   if (refreshing) {
  //     refreshTab(currentTab);
  //     setRefreshing(false);
  //   }
  // }, [currentTab, refreshing, navigation]);

  // const isTabFocused = useIsFocused();

  // useEffect(() => {
  //   if (isTabFocused) {
  //     setRefreshing(true);
  //   }
  // }, [isTabFocused]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="home" size={28} color={'#008DDA'} />
            ) : (
              <Icon name="home-outline" size={28} color={'#008DDA'} />
            ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="person" size={28} color={'#008DDA'} />
            ) : (
              <Icon name="person-outline" size={28} color={'#008DDA'} />
            ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const Routes = () => {
  const {user} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          height: 54,
          backgroundColor: '#008DDA',
        },
        headerTintColor: '#FFF7FC',
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: 'Inter',
          fontWeight: '700',
          color: '#FFF7FC',
        },
      }}>
      {user ? (
        <Stack.Screen
          name="home"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Class"
        component={ClassScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Lessons"
        component={ListLessonsScreen}
        options={{title: 'List Lessons'}}
      />
      <Stack.Screen
        name="DetailLessons"
        component={DetailLessonsScreen}
        options={{title: 'Detail Lessons'}}
      />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen
        name="DetailQuiz"
        component={DetailQuizScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{title: 'About Us'}}
      />
    </Stack.Navigator>
  );
};

export default Routes;
