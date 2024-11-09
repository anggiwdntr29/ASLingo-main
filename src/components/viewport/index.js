// useDeviceType.js
import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState({
    smallPhone: false,
    mediumPhone: false,
    isTablet: false,
  });

  const updateDeviceType = () => {
    const screenWidth = Dimensions.get('window').width;
    setDeviceType({
      smallPhone: screenWidth <= 360,
      mediumPhone: screenWidth > 360 && screenWidth < 768,
      isTablet: screenWidth >= 768,
    });
  };

  useEffect(() => {
    updateDeviceType();

    const subscription = Dimensions.addEventListener(
      'change',
      updateDeviceType,
    );

    return () => subscription?.remove();
  }, []);

  return deviceType;
};

export default useDeviceType;
