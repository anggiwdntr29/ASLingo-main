import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingBar = ({icon, text, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        borderWidth={1}
        borderColor={'Primary'}
        rounded={'md'}
        h={10}
        alignItems={'center'}
        px={4}
        space={4}>
        <Icon name={icon} size={24} color={'#008DDA'} />
        <Text
          textAlign={'center'}
          fontSize={'lg'}
          fontWeight={600}
          color={'Primary'}>
          {text}
        </Text>
      </HStack>
    </Pressable>
  );
};
export default SettingBar;
