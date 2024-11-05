import {Box, Pressable, Spinner, Text} from 'native-base';
import React, {useState} from 'react';

const Btn_Secondary = ({
  isLoading,
  w,
  padding,
  pb,
  text,
  textColor,
  borderWidth,
  onPress,
  opacity,
  pl,
  pr,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  return (
    <Pressable
      pl={pl}
      pr={pr}
      opacity={opacity}
      w={w}
      px={padding}
      pb={pb}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Box
        borderWidth={borderWidth}
        borderColor={'Secondary'}
        rounded={'sm'}
        bg={isPressed ? 'LightBlue' : 'Primary'}
        borderRadius={8}
        h={10}
        justifyContent={'center'}>
        {isLoading ? (
          <Spinner color={'Primary'} />
        ) : (
          <Text
            textAlign={'center'}
            fontSize={'xl'}
            fontWeight={700}
            color={textColor}>
            {text}
          </Text>
        )}
      </Box>
    </Pressable>
  );
};

export default Btn_Secondary;
