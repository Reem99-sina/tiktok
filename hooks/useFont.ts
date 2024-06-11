import * as Font from 'expo-font';

export const useFont =  () =>
   Font.loadAsync({
    light: require('../assets/fonts/Outfit-Regular.ttf'),
    bold: require('../assets/fonts/Outfit-Bold.ttf'),
  });