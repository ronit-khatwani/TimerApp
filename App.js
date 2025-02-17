import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { TimerProvider } from './src/context/TimerContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const AppContent = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <StatusBar
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.navBar}
      />
      <AppNavigator />
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <TimerProvider>
        <AppContent />
      </TimerProvider>
    </ThemeProvider>
  );
};

export default App;
