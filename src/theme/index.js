import {extendTheme} from 'native-base';

export const customTheme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: 'Inter-Thin',
      },
      200: {
        normal: 'Inter-ExtraLight',
      },
      300: {
        normal: 'Inter-Light',
      },
      400: {
        normal: 'Inter-Regular',
      },
      500: {
        normal: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-SemiBold',
      },
      700: {
        normal: 'Inter-Bold',
      },
      800: {
        normal: 'Inter-ExtraBold',
      },
      900: {
        normal: 'Inter-Black',
      },
    },
  },
  fonts: {
    Inter: 'Inter',
  },

  colors: {
    Primary: '#008DDA',
    Secondary: '#FFFFFF',
    Grey: '#E3DCDC',
    LightBlue: '#50A6D6',
    Text: '#FFF7FC',
    Green: '#74E291',
    TextBlack: '#31363F',
    Danger: '#E72929',
  },
});
