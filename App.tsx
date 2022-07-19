import { NativeBaseProvider, StatusBar } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';

import { Signin } from './src/screens/Signin';
import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';
import { Register } from './src/screens/Register';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
      <NativeBaseProvider theme={ THEME }>
        <StatusBar barStyle="light-content"
                   backgroundColor="transparent"
                   translucent
        />
        { fontsLoaded ? <Register/> : <Loading/> }
      </NativeBaseProvider>
  );
}
