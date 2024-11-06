import React from 'react';
import {
  FlatList,
  Pressable,
  Box,
  Progress,
  Text,
  VStack,
  View,
  Image,
  ZStack,
  Center,
} from 'native-base';
import {toUpperCase} from '../formatter';
import {RefreshControl} from 'react-native';

const Box_Lessons = ({
  navigation,
  data,
  isLoading,
  handleRefresh,
  isRefreshing,
  setMessage,
}) => {
  const mathProgress = progress => {
    return Math.round(progress);
  };

  const renderItem = ({item}) => {
    const checkItem = () => {
      const currentIndex = data.findIndex(i => i.id === item.id);
      if (currentIndex === 0) {
        return true;
      }
      const previousLesson = data[currentIndex - 1];
      return (
        previousLesson.progress === 100 && previousLesson.isQuizDone === true
      );
    };

    const handlePress = () => {
      if (checkItem(item)) {
        navigation.navigate('Lessons', {id: item.id, progress: item.progress});
      } else {
        setMessage(
          item.score
            ? 'Selesaikan materi sebelumnya terlebih dahulu'
            : 'Selesaikan quiz pada materi sebelumnya',
        );
      }
    };

    if (item.empty) {
      return <Box flexBasis="50%" />;
    }
    const displayedProgress = item.isQuizDone
      ? item.progress
      : Math.min(item.progress, 99);
    return (
      <Pressable
        opacity={checkItem(item) ? '1' : '0.5'}
        m={2}
        flex={1}
        onPress={handlePress}>
        <VStack
          rounded={'2xl'}
          backgroundColor={'Primary'}
          p={3.5}
          alignItems={'center'}
          space={1}
          flexWrap={'wrap'}>
          <Box
            justifyContent={'center'}
            alignItems={'center'}
            rounded={'lg'}
            w={'100%'}
            h={'100px'}>
            <Image
              width={100}
              height={100}
              source={{
                uri: `${item.cover}`,
              }}
              alt={item.lesson_name}
            />
          </Box>
          <Text
            numberOfLines={1}
            w={'100%'}
            textAlign={'center'}
            fontSize={'sm'}
            color={'Text'}
            fontWeight={800}
            letterSpacing={'md'}>
            {toUpperCase(item.lesson_name)}
          </Text>
          <ZStack
            w={'100%'}
            pt={5}
            justifyContent={'center'}
            alignItems={'center'}>
            <Progress
              w={'100%'}
              size={'lg'}
              value={displayedProgress}
              _filledTrack={{
                bg: 'Green',
              }}
            />
            <Text
              textAlign={'center'}
              fontSize={'xs'}
              w={'100%'}
              fontWeight={500}>
              {mathProgress(displayedProgress)}%
            </Text>
          </ZStack>
        </VStack>
      </Pressable>
    );
  };

  return (
    <View flex={1} pt={1.5}>
      {renderItem.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          px={4}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={data}
          renderItem={renderItem}
        />
      ) : (
        <Center flex={1} pt={10}>
          <Text fontSize="lg" color="gray.500">
            Belum ada materi
          </Text>
        </Center>
      )}
    </View>
  );
};

export default Box_Lessons;
