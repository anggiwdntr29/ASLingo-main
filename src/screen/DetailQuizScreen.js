import React, {useContext, useState, useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';
import {
  Center,
  Divider,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
  Spinner,
} from 'native-base';
import {submitQuiz} from '../api/Get_Lessons';
import {AuthContext} from '../api/AuthContext';
import Box_Option from '../components/box/Box_Option';
import {
  CustomVideoPlayer,
  ErrorAlertDialog,
  ExitAlertDialog,
  FinishAlertDialog,
} from '../components';

const DetailQuizScreen = ({route, navigation}) => {
  const {quizData, id} = route.params;
  const {user} = useContext(AuthContext);

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showFinishAlert, setShowFinishAlert] = useState(false);
  const [showExitAlert, setShowExitAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const cancelRef = useRef(null);
  const totalSteps = quizData.length;

  const handleBackPress = () => {
    setShowExitAlert(true);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, []);

  const handleStepChange = step => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsLoading(false);
    }, 500);
  };

  const updateAnswer = answer => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentStep]: answer ?? null,
    }));
    setSelectedOptions(prevSelected => ({
      ...prevSelected,
      [currentStep]: answer,
    }));
  };

  const handleFinish = async () => {
    if (Object.keys(answers).length < totalSteps) {
      setShowErrorAlert(true);
      return;
    }

    const formattedAnswers = Object.keys(answers).map(step => ({
      id: quizData[step].id,
      user_answer: answers[step],
    }));

    try {
      const accessToken = user.auth.access_token;
      await submitQuiz(id, accessToken, formattedAnswers);
      navigation.navigate('Quiz', {id, update: true});
    } catch (error) {
      console.error(error);
    }
  };

  const renderOptions = () =>
    [1, 2, 3, 4].map(idx => {
      const optionText = quizData[currentStep][`col_${idx}`];
      const isSelected = selectedOptions[currentStep] === optionText;

      return (
        <HStack key={idx} alignItems="center">
          <Box_Option
            onClear={() => updateAnswer(null)}
            isSelected={isSelected}
            text={optionText}
            onPress={() => updateAnswer(optionText)}
            bg={isSelected ? 'Primary' : 'transparent'}
            textColor={isSelected ? 'white' : 'Primary'}
          />
        </HStack>
      );
    });

  return (
    <Stack flex={1} background="Secondary">
      <Center backgroundColor="Primary" h="54px">
        <Text fontSize="lg" fontWeight={600} color="Text">
          Quiz
        </Text>
      </Center>
      <HStack justifyContent="center" alignItems="center" py={2} space={2}>
        {quizData.map((_, index) => (
          <Pressable
            key={index}
            h={12}
            w={10}
            borderWidth={1}
            borderRadius="lg"
            borderColor="Primary"
            onPress={() => handleStepChange(index)}>
            <Center
              h="70%"
              w="full"
              bg={answers[index] ? 'Primary' : 'transparent'}
              borderBottomWidth={1}
              borderBottomColor="Primary"
              borderTopRadius="md">
              <Text
                fontSize="lg"
                fontWeight={600}
                color={answers[index] ? 'Text' : 'Primary'}>
                {index + 1}
              </Text>
            </Center>
          </Pressable>
        ))}
      </HStack>
      <Divider />
      {isLoading ? (
        <Center flex={1}>
          <Spinner color="Primary" size="lg" />
        </Center>
      ) : (
        <Stack px={6} pt={2} flex={1} space={2}>
          <Text fontSize="lg" fontWeight={700} color="Primary">
            Question {currentStep + 1}
          </Text>

          <Stack h={48} mb={2}>
            <CustomVideoPlayer
              videoUri={quizData[currentStep].asset_url}
              thumbnailUri={quizData[currentStep].cover}
            />
          </Stack>

          <Text fontSize="md" fontWeight={600} color="Primary">
            The correct answer is?
          </Text>

          <VStack flex={1} space={2}>
            {renderOptions()}
          </VStack>

          <HStack pb={6} w="100%" justifyContent="space-between">
            <Pressable
              w="49%"
              py={1}
              borderWidth={1}
              borderColor="Primary"
              rounded="md"
              onPress={() => handleStepChange(Math.max(currentStep - 1, 0))}
              disabled={currentStep === 0}>
              <Text
                textAlign="center"
                fontSize="md"
                fontWeight={700}
                color="Primary">
                Previous
              </Text>
            </Pressable>

            <Pressable
              w="49%"
              py={1}
              borderWidth={1}
              borderColor="Primary"
              backgroundColor="Primary"
              rounded="md"
              onPress={() => {
                if (currentStep === totalSteps - 1) {
                  if (Object.keys(answers).length === totalSteps) {
                    setShowFinishAlert(true);
                  } else {
                    setShowErrorAlert(true);
                  }
                } else {
                  handleStepChange(currentStep + 1);
                }
              }}>
              <Text
                textAlign="center"
                fontSize="md"
                fontWeight={700}
                color="Text">
                {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
              </Text>
            </Pressable>
          </HStack>
        </Stack>
      )}
      <ExitAlertDialog
        showAlertExit={showExitAlert}
        cancelRef={cancelRef}
        setShowAlertExit={setShowExitAlert}
      />
      <FinishAlertDialog
        showAlertFinish={showFinishAlert}
        cancelRef={cancelRef}
        handleFinish={handleFinish}
        setShowAlertFinish={setShowFinishAlert}
      />
      <ErrorAlertDialog
        showAlertError={showErrorAlert}
        cancelRef={cancelRef}
        setShowAlertError={setShowErrorAlert}
      />
    </Stack>
  );
};

export default DetailQuizScreen;
