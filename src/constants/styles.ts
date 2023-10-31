import { StyleSheet } from 'react-native';

export const commonStylesC = {
  themeColor1: '#5B0888',
  themeColor2: '#713ABE ',
  themeColor3: '#9D76C1',
  backgroundColor: '#E5CFF7',
  textColor: '#333',
  overlayBg: 'rgba(0,0,0,0.3)',
  piechartStartColor: '#240038',
  piechartEndColor: '#F3DBFF',
};

export const chartColors = [
  '#240038',
  '#3B0055',
  '#53006C',
  '#6A0083',
  '#81009A',
  '#9900B1',
  '#B000C9',
  '#C800E0',
  '#DF00F7',
  '#E429FF',
  '#E74DFF',
  '#EA70FF',
  '#ED94FF',
  '#F0B8FF',
  '#F3DBFF',
  '#F6FFFF',
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
