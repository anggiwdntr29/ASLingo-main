import {Box, Pressable, Spinner, Text} from 'native-base';
import React, {useState} from 'react';

const Btn_Primary = ({
  isLoading,
  w,
  padding,
  pb,
  boxBgColor,
  text,
  textColor,
  onPress,
  boxBgColorPressed,
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
      w={w}
      px={padding}
      pb={pb}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Box
        rounded={'sm'}
        bg={isPressed ? 'Grey' : 'Secondary'}
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

export default Btn_Primary;
