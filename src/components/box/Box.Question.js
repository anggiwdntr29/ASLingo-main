import React from 'react';
import {Box, Text, Pressable, Stack, HStack} from 'native-base';
import CustomVideoPlayer from '../videoPlayer';
import Icon from 'react-native-vector-icons/Ionicons';

const Box_Question = ({
  index,
  item,
  expandedIndex,
  setExpandedIndex,
  videoHeight,
}) => {
  const isExpanded = expandedIndex === index;
  const hasUserAnswer = item.user_answer !== null;

  const toggleAccordion = () => {
    if (hasUserAnswer) {
      setExpandedIndex(isExpanded ? null : index);
    }
  };

  return (
    <Stack key={index} mb={3}>
      <Pressable onPress={toggleAccordion} disabled={!hasUserAnswer}>
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          h={10}
          px={4}
          bg={hasUserAnswer ? 'Primary' : 'LightBlue'}
          roundedTop="xl"
          roundedBottom={isExpanded ? 'none' : 'xl'}>
          <Text fontSize="lg" fontWeight={500} color="Secondary">
            Pertanyaan {index + 1}
          </Text>
          <Icon
            name={isExpanded ? 'caret-down-outline' : 'caret-forward-outline'}
            size={20}
            color="#ffffff"
          />
        </HStack>
      </Pressable>

      {isExpanded && (
        <Box p={4} borderWidth={2} borderColor="Primary" roundedBottom="lg">
          <Stack h={videoHeight} mb={2}>
            <CustomVideoPlayer
              videoUri={item.asset_url}
              thumbnailUri={item.cover}
            />
          </Stack>

          <Stack flex={1} space={2}>
            {['col_1', 'col_2', 'col_3', 'col_4'].map((col, idx) => (
              <Option
                key={idx}
                item={item[col]}
                correctAnswer={item.correct_answer}
                userAnswer={item.user_answer}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

const Option = ({item, correctAnswer, userAnswer}) => {
  const isCorrect = item === correctAnswer;
  const isUserAnswer = item === userAnswer;

  const backgroundColor = isCorrect
    ? 'Green'
    : isUserAnswer
    ? 'Danger'
    : 'white';
  const borderColor = isCorrect ? 'Green' : isUserAnswer ? 'Danger' : 'Primary';
  const textColor = isCorrect || isUserAnswer ? 'Text' : 'Primary';

  return (
    <Stack
      borderWidth={1.5}
      px={2}
      py={2}
      rounded="lg"
      borderColor={borderColor}
      bg={backgroundColor}>
      <Text fontSize="sm" fontWeight={600} color={textColor}>
        {item}
      </Text>
    </Stack>
  );
};

export default Box_Question;
