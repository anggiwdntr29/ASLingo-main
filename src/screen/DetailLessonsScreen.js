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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import _ from 'lodash';
import useDeviceType from '../components/viewport';

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

const DetailLessonsScreen = ({route}) => {
  const {id_materials, id} = route.params;
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  const [data, setData] = useState({});
  const [nextId, setNextId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMaterialId, setCurrentMaterialId] = useState(id_materials);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [refreshOnBack, setRefreshOnBack] = useState(false);
  const {smallPhone, mediumPhone, isTablet} = useDeviceType();

  const videoHeight = smallPhone
    ? '240px'
    : mediumPhone
    ? '260px'
    : isTablet
    ? '480px'
    : '240px';

  const headerSize = smallPhone
    ? '140px'
    : mediumPhone
    ? '180px'
    : isTablet
    ? '240px'
    : '140px';

  const illustrationSize = smallPhone
    ? '180px'
    : mediumPhone
    ? '240px'
    : isTablet
    ? '320px'
    : '180px';

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
      <CustomHeader text="Isi Materi" goBack={handleGoBackWithParams} />

      <ScrollView flexGrow={1} showsVerticalScrollIndicator={false}>
        <VStack flexGrow={1}>
          <LessonHeader data={data} headerSize={headerSize} />
          <LessonIllustration data={data} illustrationSize={illustrationSize} />
          <LessonVideo
            videoUri={data.video}
            thumbnailUri={thumbnail}
            videoHeight={videoHeight}
          />
        </VStack>
      </ScrollView>
      <LessonFooter
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        handleNext={handleNext}
        setMessage={setMessage}
      />
    </VStack>
  );
};

const LessonHeader = ({data, headerSize}) => (
  <VStack alignItems="center" space={2} pt={2}>
    <Center
      borderWidth={2}
      borderColor="Primary"
      w={headerSize}
      h={headerSize}
      rounded="lg">
      {data.cover && (
        <Image
          resizeMode="contain"
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

const LessonIllustration = ({data, illustrationSize}) => (
  <Stack justifyContent="center" alignItems="center" pt={4}>
    <Center
      p={2}
      borderWidth={2}
      borderColor="Primary"
      w={illustrationSize}
      h={illustrationSize}
      rounded="lg"
      overflow="hidden">
      {data.ilustration && (
        <Image
          resizeMode="contain"
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

const LessonVideo = ({videoUri, thumbnailUri, videoHeight}) => (
  <HStack
    m={2}
    borderWidth={2}
    borderColor="Primary"
    overflow="hidden"
    h={videoHeight}>
    <CustomVideoPlayer videoUri={videoUri} thumbnailUri={thumbnailUri} />
  </HStack>
);

const LessonFooter = ({isChecked, setIsChecked, handleNext, setMessage}) => (
  <HStack p={4} space={4} alignItems="center">
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
