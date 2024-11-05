import {Center, HStack, Skeleton, Stack} from 'native-base';
import React from 'react';

const CustomSkeleton = ({w}) => {
  return (
    <HStack px={4}>
      <Stack p={2} w={'50%'}>
        <Stack
          space={2}
          p={2.5}
          rounded={'lg'}
          borderWidth={1}
          borderColor={'Grey'}>
          <Skeleton h={'100px'} rounded={'lg'} startColor={'Grey'} />
          <Center>
            <Skeleton
              h={3.5}
              justifyContent={'center'}
              w={20}
              rounded={'full'}
              startColor={'Grey'}
            />
          </Center>
          <Skeleton
            h={3.5}
            justifyContent={'center'}
            rounded={'full'}
            startColor={'Grey'}
          />
        </Stack>
      </Stack>
      <Stack p={2} w={'50%'}>
        <Stack
          space={2}
          p={2.5}
          rounded={'lg'}
          borderWidth={1}
          borderColor={'Grey'}>
          <Skeleton h={'100px'} rounded={'lg'} startColor={'Grey'} />
          <Center>
            <Skeleton
              h={3.5}
              justifyContent={'center'}
              w={20}
              rounded={'full'}
              startColor={'Grey'}
            />
          </Center>
          <Skeleton
            h={3.5}
            justifyContent={'center'}
            rounded={'full'}
            startColor={'Grey'}
          />
        </Stack>
      </Stack>
    </HStack>
  );
};

export default CustomSkeleton;
