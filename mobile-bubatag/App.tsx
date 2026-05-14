import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterBubalinoScreen from './src/screens/RegisterBubalinoScreen';
import "./global.css";

// Segura a tela de carregamento (splash screen) até que as fontes estejam prontas
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'home' | 'register'>('home');
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
      {isAuthenticated ? (
        activeScreen === 'home' ? (
          <HomeScreen
            onLogout={() => {
              setIsAuthenticated(false);
              setActiveScreen('home');
            }}
            onAddBubalino={() => setActiveScreen('register')}
          />
        ) : (
          <RegisterBubalinoScreen onBack={() => setActiveScreen('home')} />
        )
      ) : (
        <AuthScreen onAuthSuccess={() => setIsAuthenticated(true)} />
      )}
      <StatusBar style="light" />
    </>
  );
}
