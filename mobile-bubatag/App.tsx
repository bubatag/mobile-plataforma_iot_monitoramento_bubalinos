import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterBubalinoScreen from './src/screens/RegisterBubalinoScreen';
import BubalinoStatusScreen, { type BubalinoStatusData } from './src/screens/BubalinoStatusScreen';
import "./global.css";

// Segura a tela de carregamento (splash screen) até que as fontes estejam prontas
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'home' | 'register' | 'status'>('home');
  const [selectedBubalino, setSelectedBubalino] = useState<BubalinoStatusData | null>(null);
  const [deletedBubalinoIds, setDeletedBubalinoIds] = useState<string[]>([]);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isAuthenticated ? (
        activeScreen === 'home' ? (
          <HomeScreen
            onLogout={() => {
              setIsAuthenticated(false);
              setActiveScreen('home');
            }}
            onAddBubalino={() => setActiveScreen('register')}
            deletedBubalinoIds={deletedBubalinoIds}
            onOpenBubalinoStatus={(bubalino) => {
              setSelectedBubalino(bubalino);
              setActiveScreen('status');
            }}
          />
        ) : activeScreen === 'register' ? (
          <RegisterBubalinoScreen onBack={() => setActiveScreen('home')} />
        ) : selectedBubalino ? (
          <BubalinoStatusScreen
            bubalino={selectedBubalino}
            onBack={() => setActiveScreen('home')}
            onUpdate={(updatedBubalino) => setSelectedBubalino(updatedBubalino)}
            onDelete={(id) => setDeletedBubalinoIds((current) => [...current, id])}
          />
        ) : (
          <HomeScreen
            onLogout={() => {
              setIsAuthenticated(false);
              setActiveScreen('home');
            }}
            onAddBubalino={() => setActiveScreen('register')}
            deletedBubalinoIds={deletedBubalinoIds}
          />
        )
      ) : (
        <AuthScreen onAuthSuccess={() => setIsAuthenticated(true)} />
      )}
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
