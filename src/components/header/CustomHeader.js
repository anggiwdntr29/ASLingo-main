import {Heading, HStack} from 'native-base';
import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({goBack, text, refreshItem, isLoading}) => {
  return (
    <HStack
      backgroundColor="Primary"
      py={4}
      px={6}
      justifyContent="space-between"
      alignItems="center">
      <Pressable onPress={goBack}>
        <Icon name="arrow-back-outline" size={24} color="#fff" />
      </Pressable>
      <Heading color="Text" fontSize="lg">
        {text}
      </Heading>
      <Pressable
        disabled
        onPress={isLoading ? null : refreshItem}
        opacity={isLoading ? 0.5 : 1}>
        <Icon name="refresh-outline" size={24} color="#008DDA" />
      </Pressable>
    </HStack>
  );
};

export default CustomHeader;
