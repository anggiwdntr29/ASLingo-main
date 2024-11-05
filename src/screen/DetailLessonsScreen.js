import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  Center,
  Checkbox,
  HStack,
  Heading,
  Image,
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
import {CustomVideoPlayer} from '../components';

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
  const [data, setData] = useState('');
  const [nextId, setNextId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMaterialId, setCurrentMaterialId] = useState(id_materials);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [thumbnail, setThumbnail] = useState('');

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
      console.error(error);
    }
    setIsLoading(false);
  }, [id, currentMaterialId, user.auth.access_token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateProgress = async () => {
    try {
      await Progress(id, currentMaterialId, user.auth.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (nextId === null) {
      setMessage('Selamat anda telah menyelesaikan semua materi');
    } else {
      setCurrentMaterialId(nextId);
    }
  };

  useEffect(() => {
    if (message) {
      const isSuccess = message.includes('Selamat');
      showMessage({
        icon: isSuccess ? SuccessIcon : DangerIcon,
        message,
        type: isSuccess ? 'success' : 'danger',
        titleStyleStyle: {fontSize: 8},
      });

      const timer = setTimeout(() => setMessage(''), 100);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {isLoading ? (
        <Center flex={1}>
          <Spinner accessibilityLabel="Loading posts" />
        </Center>
      ) : (
        <VStack backgroundColor="Secondary" flex={1} space={2}>
          <HStack
            pt={2}
            justifyContent="center"
            alignItems="center"
            h="20%"
            space={2}>
            <Center borderWidth={2} borderColor="Primary" h="100%" w="35%">
              {data.cover ? (
                <Image w="100%" h="100%" source={{uri: data.cover}} alt="img" />
              ) : null}
            </Center>
            <HStack alignSelf="flex-end">
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
            </HStack>
          </HStack>

          <Stack h="34%" justifyContent="center" alignItems="center">
            <Center borderWidth={2} borderColor="Primary" w="60%" h="100%">
              <Center flex={1} w="100%">
                {data.ilustration ? (
                  <Image
                    w="100%"
                    h="100%"
                    source={{uri: data.ilustration}}
                    alt="img"
                  />
                ) : null}
              </Center>
              <Center>
                <Heading
                  textAlign="center"
                  fontSize="xl"
                  fontWeight="800"
                  color="Primary"
                  letterSpacing="xl">
                  {toUpperCase(data.text_en)}
                </Heading>
              </Center>
            </Center>
          </Stack>

          <HStack flex={1} m={2} borderWidth={2} borderColor="Primary">
            <CustomVideoPlayer videoUri={data.video} thumbnailUri={thumbnail} />
          </HStack>

          <HStack p={6}>
            <Stack w="15%" justifyContent="center" alignItems="center">
              <Checkbox
                size="lg"
                value="danger"
                isChecked={isChecked}
                onChange={value => setIsChecked(value)}
                aria-label="Check to mark lesson as done"
              />
            </Stack>
            <Stack w="85%">
              <Btn_Secondary
                onPress={() => {
                  if (isChecked) {
                    updateProgress();
                    handleNext();
                  } else {
                    setMessage('Harap checklist terlebih dahulu');
                  }
                }}
                text="Next"
                boxBgColor="Primary"
                textColor="Text"
                pl={2}
              />
            </Stack>
          </HStack>
        </VStack>
      )}
    </>
  );
};

export default DetailLessonsScreen;
