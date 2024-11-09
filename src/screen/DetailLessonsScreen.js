import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  Center,
  Checkbox,
  HStack,
  Heading,
  Image,
  ScrollView,
  Spinner,
  Stack,
  VStack,
} from 'native-base';
import {Get_Material, Progress} from '../api/Get_Lessons';
import {AuthContext} from '../api/AuthContext';
import Btn_Secondary from '../components/button/Btn_Secondary';
import {toLowerCase, toUpperCase} from '../components/formatter';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {createThumbnail} from 'react-native-create-thumbnail';
import {CustomHeader, CustomVideoPlayer} from '../components';

const DangerIcon = () => (
  <Stack pr={1}>
    <Icon name="alert-circle-outline" size={16} color="#ffffff" />
  </Stack>
);

const SuccessIcon = () => (
  <Stack pr={1}>
    <Icon name="checkmark-circle-outline" size={16} color="#ffffff" />
  </Stack>
);

const DetailLessonsScreen = ({route, navigation}) => {
  const {id_materials, id} = route.params;
  const {user} = useContext(AuthContext);

  const [data, setData] = useState({});
  const [nextId, setNextId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMaterialId, setCurrentMaterialId] = useState(id_materials);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [refreshOnBack, setRefreshOnBack] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Get_Material(
        id,
        currentMaterialId,
        user.auth.access_token,
      );
      setData(response.data);
      setNextId(response.next_id);

      const thumbnailData = await createThumbnail({url: response.data.video});
      setThumbnail(thumbnailData.path);

      setIsChecked(response.data.is_done === 1);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id, currentMaterialId, user.auth.access_token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateProgress = async () => {
    try {
      await Progress(id, currentMaterialId, user.auth.access_token);
      setRefreshOnBack(true);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleNext = async () => {
    if (nextId === null) {
      await updateProgress();
      setMessage('Selamat! Anda telah menyelesaikan materi ini.');
      handleGoBackWithParams();
    } else {
      updateProgress();
      setCurrentMaterialId(nextId);
    }
  };

  const handleGoBackWithParams = () => {
    navigation.navigate({
      name: route.params.previousScreen || 'Lessons',
      params: {completed: isChecked, update: refreshOnBack},
      merge: true,
    });
  };

  useEffect(() => {
    if (message) {
      const isSuccess = message.includes('Selamat');
      showMessage({
        icon: isSuccess ? SuccessIcon : DangerIcon,
        message,
        type: isSuccess ? 'success' : 'danger',
        titleStyle: {fontSize: 12},
      });
      const timer = setTimeout(() => setMessage(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Loading posts" />
      </Center>
    );
  }

  return (
    <VStack backgroundColor="Secondary" flex={1}>
      <CustomHeader text="Detail Lesson" goBack={handleGoBackWithParams} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LessonHeader data={data} />
        <LessonIllustration data={data} />
        <LessonVideo videoUri={data.video} thumbnailUri={thumbnail} />

        <LessonFooter
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          handleNext={handleNext}
          setMessage={setMessage}
        />
      </ScrollView>
    </VStack>
  );
};

const LessonHeader = ({data}) => (
  <VStack alignItems="center" space={2} pt={2}>
    <Center
      borderWidth={2}
      borderColor="Primary"
      w="40%"
      h="180px"
      rounded="lg">
      {data.cover && (
        <Image
          w="100%"
          h="100%"
          source={{uri: data.cover}}
          alt="Lesson Cover"
        />
      )}
    </Center>
    <Heading
      italic
      fontSize="lg"
      fontWeight={800}
      color="Primary"
      letterSpacing="xl">
      {'['}
      {toLowerCase(data.text_id)}
      {']'}
    </Heading>
  </VStack>
);

const LessonIllustration = ({data}) => (
  <Stack justifyContent="center" alignItems="center" pt={4}>
    <Center
      p={2}
      borderWidth={2}
      borderColor="Primary"
      w="80%"
      h="280px"
      rounded="lg"
      overflow="hidden">
      {data.ilustration && (
        <Image
          resizeMode="cover"
          size={'2xl'}
          source={{uri: data.ilustration}}
          alt="Illustration"
        />
      )}
    </Center>
    <Heading
      textAlign="center"
      fontSize="xl"
      fontWeight="800"
      color="Primary"
      letterSpacing="xl"
      mt={2}>
      {toUpperCase(data.text_en)}
    </Heading>
  </Stack>
);

const LessonVideo = ({videoUri, thumbnailUri}) => (
  <HStack
    flex={1}
    m={2}
    borderWidth={2}
    borderColor="Primary"
    overflow="hidden"
    h="250px">
    <CustomVideoPlayer videoUri={videoUri} thumbnailUri={thumbnailUri} />
  </HStack>
);

const LessonFooter = ({
  isChecked,
  setIsChecked,
  updateProgress,
  handleNext,
  setMessage,
}) => (
  <HStack p={4} space={4} flex={1} alignItems="center">
    <Checkbox
      size="lg"
      value="danger"
      isChecked={isChecked}
      onChange={setIsChecked}
      aria-label="Check to mark lesson as done"
    />
    <Stack w={'full'} flex={1}>
      <Btn_Secondary
        onPress={() => {
          if (isChecked) {
            handleNext();
          } else {
            setMessage('Harap checklist terlebih dahulu');
          }
        }}
        text="Next"
        boxBgColor="Primary"
        textColor="Text"
      />
    </Stack>
  </HStack>
);

export default DetailLessonsScreen;
