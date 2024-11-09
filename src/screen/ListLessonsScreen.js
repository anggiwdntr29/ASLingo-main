import {Stack, VStack} from 'native-base';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Box_ListLessons from '../components/box/Box_ListLessons';
import {AuthContext} from '../api/AuthContext';
import {Get_ListLessons} from '../api/Get_Lessons';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomHeader} from '../components';
import {BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import _ from 'lodash';

const DangerIcon = () => (
  <Stack pr={1}>
    <Icon name="alert-circle-outline" size={16} color={'#ffffff'} />
  </Stack>
);

const ListLessonsScreen = ({route}) => {
  const {id} = route.params;
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [message, setMessage] = useState('');
  const [refreshOnBack, setRefreshOnBack] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Get_ListLessons(id, user.auth.access_token);
      setData(response || []);

      const allDone = response?.every(item => item.is_done === 1);
      setOpenQuiz(allDone);
    } catch (error) {
      setMessage('Failed to load lessons. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [id, user.auth.access_token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (route.params?.update) {
      loadData();
      setRefreshOnBack(true);
      navigation.setParams({update: false});
    }
  }, [route.params?.update, loadData, navigation]);

  useEffect(() => {
    if (message && message !== 'hide') {
      showMessage({
        icon: DangerIcon,
        duration: 800,
        message: message,
        type: 'danger',
        titleStyleStyle: {fontSize: 8},
      });

      const timer = setTimeout(() => {
        setMessage('');
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Define handleGoBackWithParams without useCallback
  const handleGoBackWithParams = () => {
    navigation.navigate({
      name: route.params.previousScreen || 'Class',
      params: {update: refreshOnBack},
      merge: true,
    });
  };

  // Throttle handleGoBackWithParams to avoid repeated calls
  const throttledHandleGoBack = _.throttle(handleGoBackWithParams, 1000); // 1-second delay between calls

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        throttledHandleGoBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [throttledHandleGoBack]),
  );

  return (
    <VStack backgroundColor={'Secondary'} flex={1}>
      <CustomHeader goBack={handleGoBackWithParams} text={'Lessons'} />
      <Box_ListLessons
        isRefreshing={isLoading}
        setMessage={setMessage}
        handleRefresh={loadData}
        navigation={navigation}
        id={id}
        data={data}
        openQuiz={openQuiz}
      />
    </VStack>
  );
};

export default ListLessonsScreen;
