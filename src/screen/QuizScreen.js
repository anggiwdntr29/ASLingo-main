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
import {Box_Question} from '../components';
import {RefreshControl} from 'react-native';
import {Get_Quiz} from '../api/Get_Lessons';

const QuizScreen = ({navigation, route}) => {
  const {id} = route.params;
  const {user} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const [latestScore, setLatestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const loadQuizData = useCallback(async () => {
    if (user.auth.access_token) {
      try {
        const response = await Get_Quiz(id, user.auth.access_token);

        setData(response.quiz);
        setHighestScore(response.highest_score ?? 0);
        setLatestScore(response.latest_score ?? 0);
        console.log(response.quiz);
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
        // Reset parameter update setelah data dimuat
        navigation.setParams({update: false});
      });
    }
  }, [route.params?.update, loadQuizData, navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadQuizData();
  }, [loadQuizData]);

  const startQuiz = useCallback(() => {
    navigation.navigate('DetailQuiz', {id, quizData: data});
  }, [navigation, id, data]);

  return (
    <Stack flex={1}>
      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" color="Primary" />
        </Center>
      ) : (
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
      )}
    </Stack>
  );
};

const ScoreDisplay = ({highestScore, latestScore}) => (
  <Stack mb={4} space={1} justifyContent={'center'} alignItems={'center'}>
    <Heading fontSize={'xl'} fontWeight={800} color={'Primary'}>
      Your Score
    </Heading>
    <HStack w={'full'} justifyContent={'space-evenly'}>
      <ScoreBox score={highestScore} label="Your highest score" />
      <ScoreBox score={latestScore} label="Your latest score" />
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
