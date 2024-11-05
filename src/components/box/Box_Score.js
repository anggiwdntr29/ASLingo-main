import {Box, Heading, Stack} from 'native-base';
import React from 'react';

const Box_Score = () => {
  return (
    <Stack mb={4} space={1} justifyContent={'center'} alignItems={'center'}>
      <Box borderWidth={3} px={4} py={3} rounded={'xl'} borderColor={'Primary'}>
        <Heading fontSize={'4xl'} fontWeight={800} color={'Primary'}>
          0
        </Heading>
      </Box>
      <Heading fontSize={'2xl'} fontWeight={800} color={'Primary'}>
        Score
      </Heading>
    </Stack>
  );
};

export default Box_Score;
