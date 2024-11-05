import {Heading, HStack, Stack, Text} from 'native-base';
import React from 'react';
import {toCapitalCase} from '../formatter';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderContent = ({data}) => {
  return (
    <HStack
      backgroundColor={'Primary'}
      px={6}
      py={4}
      h={20}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Stack>
        <Heading color={'Text'} fontSize={'md'} fontWeight={600}>
          Hi, {toCapitalCase(data.user.name)}
        </Heading>
        <Text
          color={'Text'}
          fontSize={'sm'}
          fontWeight={400}
          letterSpacing={'lg'}>
          What do you want to learn today?
        </Text>
      </Stack>
      <Stack bg={'Text'} p={2} rounded={'full'}>
        <Icon name="person" size={28} color={'#008DDA'} />
      </Stack>
    </HStack>
  );
};

export default HeaderContent;
