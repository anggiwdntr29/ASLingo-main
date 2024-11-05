import {Box, Pressable, Avatar} from 'native-base';
import React from 'react';

const Btn_Icon = ({w, padding, pb, boxBgColor, source, size}) => {
  return (
    <Pressable w={w} px={padding} pb={pb}>
      <Box
        rounded={'sm'}
        bg={boxBgColor}
        borderRadius={8}
        h={10}
        justifyContent={'center'}
        alignItems={'center'}>
        <Avatar source={source} size={size} bg={'transparent'} />
      </Box>
    </Pressable>
  );
};

export default Btn_Icon;
