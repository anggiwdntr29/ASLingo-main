import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  Box,
  Heading,
  HStack,
  ScrollView,
  Stack,
  Spinner,
  Center,
} from 'native-base';
import {AuthContext} from '../api/AuthContext';
import Btn_Secondary from '../components/button/Btn_Secondary';
import {Box_Question, CustomHeader} from '../components';
import {RefreshControl, BackHandler} from 'react-native';
import {Get_Quiz} from '../api/Get_Lessons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import useDeviceType from '../components/viewport';

const QuizScreen = ({route}) => {
  const {id} = route.params;
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const [latestScore, setLatestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [refreshOnBack, setRefreshOnBack] = useState(false);
  const {smallPhone, mediumPhone, isTablet} = useDeviceType();

  const videoHeight = smallPhone
    ? '200px'
    : mediumPhone
    ? '240px'
    : isTablet
    ? '480px'
    : '200px';

  const loadQuizData = useCallback(async () => {
    if (user.auth.access_token) {
      try {
        const response = await Get_Quiz(id, user.auth.access_token);
        setData(response.quiz);
        setHighestScore(response.highest_score ?? 0);
        setLatestScore(response.latest_score ?? 0);
      } catch (error) {
        console.error('Error loading quiz data:', error);
      } finally {
        setIsLoading(false);
        setRefreshing(false);
      }
    }
  }, [user.auth.access_token, id]);

  useEffect(() => {
    loadQuizData();
  }, [loadQuizData]);

  useEffect(() => {
    if (route.params?.update) {
      setIsLoading(true);
      loadQuizData().then(() => {
        navigation.setParams({update: false});
      });
      setRefreshOnBack(true);
    }
  }, [route.params?.update, loadQuizData, navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadQuizData();
  }, [loadQuizData]);

  const startQuiz = useCallback(() => {
    navigation.navigate('DetailQuiz', {id, quizData: data});
  }, [navigation, id, data]);

  // Define handleGoBackWithParams without useCallback
  const handleGoBackWithParams = () => {
    navigation.navigate({
      name: route.params.previousScreen || 'Lessons',
      params: {update: refreshOnBack},
      merge: true,
    });
  };

  // Throttle the back handler to avoid repeated calls
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
    <>
      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" color="Primary" />
        </Center>
      ) : (
        <Stack flex={1}>
          <CustomHeader text={'Kuis'} goBack={handleGoBackWithParams} />
          <ScrollView
            flex={1}
            background={'Secondary'}
            py={2}
            px={6}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Stack flex={1}>
              <ScoreDisplay
                highestScore={highestScore}
                latestScore={latestScore}
              />
              {data.map((item, index) => (
                <Box_Question
                  videoHeight={videoHeight}
                  key={index}
                  index={index}
                  item={item}
                  expandedIndex={expandedIndex}
                  setExpandedIndex={setExpandedIndex}
                />
              ))}
              <Stack
                flex={1}
                pb={6}
                justifyContent={'flex-end'}
                backgroundColor={'Secondary'}
                w={'full'}>
                <Btn_Secondary
                  onPress={startQuiz}
                  text={'Start'}
                  boxBgColor={'Primary'}
                  textColor={'Text'}
                />
              </Stack>
            </Stack>
          </ScrollView>
        </Stack>
      )}
    </>
  );
};

const ScoreDisplay = ({highestScore, latestScore}) => (
  <Stack mb={4} space={1} justifyContent={'center'} alignItems={'center'}>
    <Heading fontSize={'xl'} fontWeight={800} color={'Primary'}>
      Nilai Kamu
    </Heading>
    <HStack w={'full'} justifyContent={'space-evenly'}>
      <ScoreBox score={highestScore} label="Tertinggi" />
      <ScoreBox score={latestScore} label="Terbaru" />
    </HStack>
  </Stack>
);

const ScoreBox = ({score, label}) => (
  <Stack justifyContent={'center'} alignItems={'center'} space={1}>
    <Box
      w={24}
      borderWidth={3}
      p={3}
      rounded={'xl'}
      borderColor={'Primary'}
      textAlign={'center'}>
      <Heading
        fontSize={'4xl'}
        fontWeight={800}
        textAlign={'center'}
        color={'Primary'}>
        {score}
      </Heading>
    </Box>
    <Heading fontSize={'md'} fontWeight={600} color={'Primary'}>
      {label}
    </Heading>
  </Stack>
);

export default QuizScreen;
