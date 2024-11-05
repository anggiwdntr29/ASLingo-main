import React from 'react';
import {HStack, Heading, Stack, Skeleton, Text} from 'native-base';
import CustomVideoPlayer from '../videoPlayer';
import {toUpperCase} from '../formatter';

const Box_Activity = ({data, isLoading, thumbnail}) => {
  return (
    <Stack px={6} py={3}>
      <Heading color={'Primary'} fontSize={'md'} fontWeight={600} mb={2}>
        Recent Activity
      </Heading>
      <Stack>
        {isLoading ? (
          <Stack>
            <Skeleton h="20px" my={2} rounded="lg" />
            <Skeleton h="200px" my={2} rounded="lg" />
          </Stack>
        ) : data.recent_activity ? (
          <Stack h={'240px'}>
            <HStack
              h={'20%'}
              space={2}
              backgroundColor={'Primary'}
              px={6}
              borderTopRadius={'lg'}
              alignItems={'center'}>
              <Heading color={'Text'} fontSize={'xl'}>
                {toUpperCase(data.recent_activity.text_en)}
              </Heading>
            </HStack>
            <Stack
              h={'80%'}
              borderWidth={2}
              borderColor={'Primary'}
              borderBottomRadius={'lg'}
              p={2}>
              <CustomVideoPlayer
                videoUri={data.recent_activity.video}
                thumbnailUri={thumbnail}
              />
            </Stack>
          </Stack>
        ) : (
          <Stack h={'240px'}>
            <HStack
              h={'20%'}
              space={2}
              backgroundColor={'Primary'}
              px={6}
              borderTopRadius={'lg'}
              alignItems={'center'}>
              {/* <Heading color={'Text'} fontSize={'xl'}>
                {toUpperCase(data.recent_activity.text_en)}
              </Heading> */}
            </HStack>
            <Stack
              h={'80%'}
              borderWidth={2}
              borderColor={'Primary'}
              borderBottomRadius={'lg'}
              justifyContent={'center'}
              alignItems={'center'}
              p={2}>
              <Text>No Activity Recent</Text>
              {/* <CustomVideoPlayer
                videoUri={data.recent_activity.video}
                thumbnailUri={thumbnail}
              /> */}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Box_Activity;
