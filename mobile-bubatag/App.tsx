import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './src/screens/LoginScreen';
import "./global.css";

// Segura a tela de carregamento (splash screen) até que as fontes estejam prontas
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Fonarto': require('./assets/fonts/Fonarto.ttf'),
    'Lato': require('./assets/fonts/Lato-Regular.ttf'),

  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);


  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <>
      <LoginScreen />
      <StatusBar style="light" />
    </>
  );
}