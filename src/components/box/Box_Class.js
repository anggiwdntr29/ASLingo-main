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
} from 'native-base';

const Box_Class = ({data, navigation, isLoading}) => {
  const handlePress = id => {
    navigation.navigate('Class', {id});
  };

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

  const formatProgress = progress => {
    return Math.round(progress);
  };

  return (
    <Stack px={6} pt={3}>
      <Heading color={'Primary'} fontSize={'md'} fontWeight={600} mb={2}>
        Class
      </Heading>
      <VStack space={3}>
        {isLoading ? (
          <VStack space={1}>
            {[1, 2, 3].map((_, index) => (
              <Skeleton key={index} h="60px" my={2} rounded="lg" />
            ))}
          </VStack>
        ) : data && data.data && data.data.length > 0 ? (
          data.data.map(item => (
            <Pressable
              key={item.class}
              mb={2}
              onPress={() => handlePress(item.class)}>
              <HStack
                alignItems="center"
                backgroundColor="Primary"
                px={3}
                py={4}
                rounded="xl"
                space={3}>
                <Heading
                  w={12}
                  textAlign="left"
                  fontSize="2xl"
                  fontWeight={800}
                  color="Text"
                  letterSpacing="xl">
                  {arabicToRoman(item.class)}
                </Heading>
                <VStack flex={1} space={1.5}>
                  <Heading
                    fontSize="md"
                    fontWeight={800}
                    color="Text"
                    letterSpacing="lg">
                    {item.lesson_sum} Lessons
                  </Heading>
                  <HStack
                    space={1}
                    justifyContent={'flex-start'}
                    alignItems={'center'}>
                    <VStack w={'82%'}>
                      <Progress
                        size="lg"
                        value={item.progress}
                        _filledTrack={{
                          bg: 'Green',
                        }}
                      />
                    </VStack>
                    <VStack w={'18%'}>
                      <Text fontSize={'sm'} fontWeight={600} color={'Text'}>
                        <Text fontWeight={600}>
                          {formatProgress(item.progress)}%
                        </Text>
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </HStack>
            </Pressable>
          ))
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
