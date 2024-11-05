import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const Box_Option = ({
  isSelected,
  bg,
  onPress,
  text,
  textColor,
  borderColor,
  onClear,
}) => {
  return (
    <HStack
      px={4}
      justifyContent={'space-between'}
      alignItems={'center'}
      bg={bg}
      borderColor={'Primary'}
      rounded={'md'}
      borderWidth={2}
      flex={1}>
      <Pressable py={1} onPress={onPress} w={isSelected ? '90%' : 'full'}>
        <Text
          fontSize={'md'}
          fontWeight={700}
          color={textColor}
          letterSpacing={'lg'}>
          {text}
        </Text>
      </Pressable>
      {isSelected && (
        <Pressable onPress={onClear}>
          <Icon name="close-outline" size={20} color={'#ffffff'} />
        </Pressable>
      )}
    </HStack>
  );
};

export default Box_Option;
