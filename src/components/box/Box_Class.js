import React from 'react';
import {
  HStack,
  Heading,
  Pressable,
  Progress,
  Stack,
  Text,
  VStack,
  Skeleton,
  Image,
} from 'native-base';
import useDeviceType from '../viewport';

const Box_Class = ({data, navigation, isLoading}) => {
  const {smallPhone, mediumPhone, isTablet} = useDeviceType();

  const handlePress = id => {
    navigation.navigate('Class', {id});
  };

  const illustrationSize = smallPhone
    ? '128px'
    : mediumPhone
    ? '140px'
    : isTablet
    ? '180px'
    : '128px';

  const classText = smallPhone
    ? '24px'
    : mediumPhone
    ? '30px'
    : isTablet
    ? '36px'
    : '24px';

  const classText1 = smallPhone
    ? '16px'
    : mediumPhone
    ? '18px'
    : isTablet
    ? '24px'
    : '16px';

  const classText2 = smallPhone
    ? '14px'
    : mediumPhone
    ? '16px'
    : isTablet
    ? '20px'
    : '2px';

  const arabicToRoman = number => {
    switch (parseInt(number, 10)) {
      case 7:
        return 'VII';
      case 8:
        return 'VIII';
      case 9:
        return 'IX';
      default:
        return '';
    }
  };

  const getIllustration = number => {
    switch (parseInt(number, 10)) {
      case 7:
        return require('../../assets/img/vii.png');
      case 8:
        return require('../../assets/img/viii.png');
      case 9:
        return require('../../assets/img/ix.png');
      default:
        return null;
    }
  };

  const formatProgress = progress => {
    return Math.round(progress);
  };

  return (
    <Stack px={6} pt={3}>
      <Heading color={'Primary'} fontSize={'md'} fontWeight={600} mb={2}>
        Kelas
      </Heading>
      <VStack space={1}>
        {isLoading ? (
          <VStack space={1}>
            {[1, 2, 3].map((_, index) => (
              <Skeleton key={index} h="80px" my={2} rounded="lg" />
            ))}
          </VStack>
        ) : data && data.length > 0 ? (
          data.map(item => {
            const isOdd = item.class % 2 !== 0;
            return (
              <Pressable
                flex={1}
                key={item.class}
                mb={2}
                onPress={() => handlePress(item.class)}>
                <HStack
                  flex={1}
                  justifyContent="space-between"
                  backgroundColor="Primary"
                  borderTopRadius={8}
                  flexDirection={isOdd ? 'row' : 'row-reverse'}>
                  <Stack
                    flex={1}
                    pl={isOdd ? 4 : 0}
                    pr={isOdd ? 0 : 4}
                    py={4}
                    justifyContent={'space-between'}>
                    <Stack>
                      <Heading
                        textAlign={isOdd ? 'left' : 'right'}
                        fontSize={classText}
                        fontWeight={800}
                        color="Text"
                        letterSpacing="xl">
                        {arabicToRoman(item.class)}
                      </Heading>
                      <Heading
                        textAlign={isOdd ? 'left' : 'right'}
                        fontSize={classText1}
                        fontWeight={800}
                        color="Text"
                        letterSpacing="lg">
                        {item.lesson_sum} Mata Pelajaran
                      </Heading>
                    </Stack>
                    <HStack
                      space={1}
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Progress
                        flex={1}
                        size="lg"
                        value={item.progress}
                        _filledTrack={{
                          bg: 'Green',
                        }}
                      />
                      <Text
                        fontSize={classText2}
                        fontWeight={600}
                        color={'Text'}
                        ml={2}>
                        {formatProgress(item.progress)}%
                      </Text>
                    </HStack>
                  </Stack>
                  <Stack w={illustrationSize} h={illustrationSize} p={2}>
                    <Image
                      resizeMode="contain"
                      source={getIllustration(item.class)}
                      alt="illustration"
                      w={'100%'}
                      h={'100%'}
                    />
                  </Stack>
                </HStack>
                <Stack
                  bg={'Text'}
                  borderLeftWidth={2}
                  borderRightWidth={2}
                  borderBottomWidth={2}
                  borderColor={'Primary'}
                  borderBottomRadius={8}
                  px={3}
                  py={2}>
                  <Text
                    fontWeight={'semibold'}
                    fontSize={'xs'}
                    color={'TextBlack'}
                    textAlign={'right'}>
                    Lihat Selengkapnya...
                  </Text>
                </Stack>
              </Pressable>
            );
          })
        ) : (
          <Text fontSize="md" color="Text" textAlign="center">
            No classes available.
          </Text>
        )}
      </VStack>
    </Stack>
  );
};

export default Box_Class;
