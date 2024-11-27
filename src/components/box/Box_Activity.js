import React from 'react';
import {HStack, Heading, Stack, Skeleton, Text} from 'native-base';
import CustomVideoPlayer from '../videoPlayer';
import {toUpperCase} from '../formatter';
import useDeviceType from '../viewport';

const Box_Activity = ({data, isLoading, thumbnail}) => {
  const {smallPhone, mediumPhone, isTablet} = useDeviceType();

  const videoHeight = smallPhone
    ? '200px'
    : mediumPhone
    ? '240px'
    : isTablet
    ? '420px'
    : '200px';

  return (
    <Stack px={6} py={3}>
      <Heading color={'Primary'} fontSize={'md'} fontWeight={600} mb={2}>
        Baru Saja Dilihat
      </Heading>
      <Stack>
        {isLoading ? (
          <Stack>
            <Skeleton h="20px" my={2} rounded="lg" />
            <Skeleton h="200px" my={2} rounded="lg" />
          </Stack>
        ) : data ? (
          <Stack flex={1}>
            <HStack
              py={3}
              space={2}
              backgroundColor={'Primary'}
              px={6}
              borderTopRadius={'lg'}
              alignItems={'center'}>
              <Heading color={'Text'} fontSize={'xl'}>
                {toUpperCase(data.text_en)}
              </Heading>
            </HStack>
            <Stack
              h={videoHeight}
              borderWidth={2}
              borderColor={'Primary'}
              borderBottomRadius={'lg'}
              p={2}>
              <CustomVideoPlayer
                videoUri={data.video}
                thumbnailUri={thumbnail}
              />
            </Stack>
          </Stack>
        ) : (
          <Stack h={videoHeight}>
            <HStack
              h={'20%'}
              space={2}
              backgroundColor={'Primary'}
              px={6}
              borderTopRadius={'lg'}
              alignItems={'center'}>
              <Heading color={'Text'} fontSize={'xl'}>
                -
              </Heading>
            </HStack>
            <Stack
              h={'80%'}
              borderWidth={2}
              borderColor={'Primary'}
              borderBottomRadius={'lg'}
              justifyContent={'center'}
              alignItems={'center'}
              p={2}>
              <Text>No Recent Activity</Text>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Box_Activity;
