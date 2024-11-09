import {
  Box,
  Center,
  FlatList,
  Heading,
  Image,
  Pressable,
  Text,
  View,
} from 'native-base';
import React from 'react';
import {toUpperCase} from '../formatter';
import {RefreshControl} from 'react-native';
import useDeviceType from '../viewport';
import _ from 'lodash';

const Box_ListLessons = ({
  id,
  navigation,
  data,
  handleRefresh,
  isRefreshing,
  openQuiz,
  setMessage,
}) => {
  const {isTablet} = useDeviceType();
  const itemsPerRow = isTablet ? 4 : 2;

  const modifiedData = _.concat(
    data,
    data.length ? [{quiz: true, id: 'quiz'}] : [],
  );
  const emptySlots =
    (itemsPerRow - (modifiedData.length % itemsPerRow)) % itemsPerRow;
  const dataWithEmptySlots = _.concat(
    modifiedData,
    _.times(emptySlots, () => ({empty: true, id: _.uniqueId('empty_')})),
  );

  const calculateFlexBasis = () => {
    return isTablet ? '25%' : '50%';
  };

  const handlePressQuiz = () => {
    if (openQuiz) {
      navigation.navigate('Quiz', {id});
    } else {
      setMessage('Selesaikan semua materi terlebih dahulu');
    }
  };

  const handlePressMaterial = (item, index) => {
    const isAccessible = index === 0 || data[index - 1]?.is_done;

    if (isAccessible) {
      navigation.navigate('DetailLessons', {
        id_materials: item.id,
        id,
      });
    } else {
      setMessage('Selesaikan materi sebelumnya terlebih dahulu');
    }
  };

  const renderItem = ({item, index}) => {
    if (item.empty) {
      return <Box flexBasis={calculateFlexBasis()} />;
    }
    if (item.quiz) {
      return (
        <Box flexBasis={calculateFlexBasis()}>
          <Pressable
            opacity={openQuiz ? 1 : 0.5}
            onPress={handlePressQuiz}
            flex={1}
            h="180px"
            m={2}
            flexDirection="column">
            <Center
              roundedTop="2xl"
              h="80%"
              backgroundColor="Primary"
              borderTopWidth={1}
              borderRightWidth={1}
              borderLeftWidth={1}
              borderColor="Primary">
              <Image
                size="lg"
                source={require('../../assets/img/quiz.png')}
                alt="Quiz"
              />
            </Center>
            <Center
              roundedBottom="2xl"
              h="20%"
              backgroundColor="Secondary"
              borderWidth={1}
              borderColor="Primary">
              <Heading fontSize="lg" fontWeight="800" color="Primary">
                Quiz
              </Heading>
            </Center>
          </Pressable>
        </Box>
      );
    } else {
      const isAccessible = index === 0 || data[index - 1]?.is_done;

      return (
        <Box flexBasis={calculateFlexBasis()}>
          <Pressable
            opacity={isAccessible ? 1 : 0.5}
            onPress={() => handlePressMaterial(item, index)}
            flex={1}
            h="180px"
            m={2}
            flexDirection="column">
            <Center
              roundedTop="2xl"
              h="80%"
              backgroundColor="Primary"
              borderTopWidth={1}
              borderRightWidth={1}
              borderLeftWidth={1}
              p={1}
              borderColor="Primary">
              <Image
                rounded="2xl"
                w="100%"
                h="100%"
                source={{uri: item.cover}}
                alt={item.material_name}
              />
            </Center>
            <Center
              roundedBottom="2xl"
              h="20%"
              backgroundColor="Secondary"
              borderWidth={1}
              borderColor="Primary">
              <Heading
                numberOfLines={1}
                fontSize="md"
                fontWeight="800"
                color="Primary">
                {toUpperCase(item.material_name)}
              </Heading>
            </Center>
          </Pressable>
        </Box>
      );
    }
  };

  return (
    <View flex={1}>
      {renderItem.length > 0 ? (
        <FlatList
          key={isTablet ? 'tablet' : 'phone'}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          numColumns={itemsPerRow}
          px={4}
          data={dataWithEmptySlots}
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

export default Box_ListLessons;
