import { StyleSheet } from 'react-native';

import { IThemeOption } from '../types/theme';

export const themeConfig = {
  [IThemeOption.DARK]: {
    bgColor: '#000000',
    bgColor2: '#1a1a1a',
    contrast: '#ffffff', // probably used for icon
    textColor: '#ffffff',
    textLight: '#666666',
    overlayBg: 'rgba(0,0,0,0.3)',
  },
  [IThemeOption.LIGHT]: {
    bgColor: '#ffffff',
    bgColor2: '#e6e6e6',
    contrast: '#000000', // probably used for icon
    textColor: '#000000',
    textLight: '#999999',
    overlayBg: 'rgba(0,0,0,0.3)',
  },
};

export const blackToWhite = [
  '#000000',
  '#1a1a1a',
  '#333333',
  '#4d4d4d',
  '#666666',
  '#808080',
  '#999999',
  '#b3b3b3',
  '#cccccc',
  '#e6e6e6',
  '#ffffff',
];

export const commonStyles = StyleSheet.create({
  pageStyles: {
    display: 'flex',
    minHeight: '100%',
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
  },

  subtitleStyles: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
