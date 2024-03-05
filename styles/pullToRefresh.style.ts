import {StyleSheet} from 'react-native';

export default (headerHeight: number) => {
  return StyleSheet.create({
    text: {
      fontSize: 14,
      lineHeight: 21,
      paddingHorizontal: 14,
      textAlign: 'center',
      color: '#222222',
    },
    loading: {
      width: 56,
      height: 56,
    },
    headerContainer: {
      minHeight: headerHeight,
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 30,
    },
  });
};
