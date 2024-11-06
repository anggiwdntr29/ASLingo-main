import {Stack, VStack} from 'native-base';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Box_ListLessons from '../components/box/Box_ListLessons';
import {AuthContext} from '../api/AuthContext';
import {Get_ListLessons} from '../api/Get_Lessons';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomHeader} from '../components';

const DangerIcon = () => (
  <Stack pr={1}>
    <Icon name="alert-circle-outline" size={16} color={'#ffffff'} />
  </Stack>
);

const ListLessonsScreen = ({route, navigation}) => {
  const {id} = route.params;
  const {user} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    if (user.auth.access_token) {
      const response = await Get_ListLessons(id, user.auth.access_token);

      setData(response || []);

      const allDone = response?.every(item => item.is_done === 1);
      setOpenQuiz(allDone);

      setIsLoading(false);
    }
  }, [id, user.auth.access_token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = useCallback(() => {
    loadData();
  }, [loadData]);

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

  return (
    <VStack backgroundColor={'Secondary'} flex={1}>
      <CustomHeader goBack={() => navigation.goBack()} text={'Lessons'} />
      <Box_ListLessons
        openQuiz={openQuiz}
        setMessage={setMessage}
        isRefreshing={isLoading}
        handleRefresh={handleRefresh}
        navigation={navigation}
        id={id}
        data={data}
        isLoading={isLoading}
      />
    </VStack>
  );
};

export default ListLessonsScreen;
