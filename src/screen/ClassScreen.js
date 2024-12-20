import {Stack} from 'native-base';
import React, {useState, useContext, useEffect, useCallback} from 'react';
import Box_Lessons from '../components/box/Box_Lessons';
import {Get_Lessons} from '../api/Get_Lessons';
import {AuthContext} from '../api/AuthContext';
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

const ClassScreen = ({route}) => {
  const {id} = route.params;
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [refreshOnBack, setRefreshOnBack] = useState(false);

  const fetchLessons = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedData = await Get_Lessons(id, user.auth.access_token);
      const lessonsData =
        fetchedData.length % 2 !== 0
          ? [...fetchedData, {empty: true}]
          : fetchedData;

      setLessons(lessonsData);
    } catch (error) {
      setMessage('Failed to load lessons. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [id, user.auth.access_token]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  useEffect(() => {
    if (route.params?.update) {
      fetchLessons();
      setRefreshOnBack(true);
      navigation.setParams({update: false});
    }
  }, [route.params?.update, fetchLessons, navigation]);

  useEffect(() => {
    if (message && message !== 'hide') {
      showMessage({
        icon: DangerIcon,
        duration: 2000,
        message: message,
        type: 'danger',
        titleStyle: {fontSize: 12},
      });

      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleGoBackWithParams = () => {
    navigation.navigate({
      name: route.params.previousScreen || 'Home',
      params: {update: refreshOnBack},
      merge: true,
    });
  };

  const throttledHandleGoBack = _.throttle(handleGoBackWithParams, 1000);

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
    <Stack backgroundColor="Secondary" flex={1}>
      <CustomHeader goBack={handleGoBackWithParams} text={'Mata Pelajaran'} />
      <Box_Lessons
        isRefreshing={isLoading}
        setMessage={setMessage}
        handleRefresh={fetchLessons}
        navigation={navigation}
        data={lessons}
      />
    </Stack>
  );
};

export default ClassScreen;
