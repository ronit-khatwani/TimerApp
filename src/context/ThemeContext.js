import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    colors: {
      primary: '#2ECC71',
      secondary: '#3498DB',
      accent: '#E74C3C',
      background: '#F5F6FA',
      surface: '#FFFFFF',
      text: '#2C3E50',
      textSecondary: '#7F8C8D',
      border: '#E5E7EB',
      navBar: '#2C3E50',
      statusBar: '#2C3E50',
      card: '#FFFFFF',
      success: '#2ECC71',
      error: '#E74C3C',
      warning: '#F1C40F',
      info: '#3498DB',
      progressBackground: '#EAECEE',
    },
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#2ECC71',
      secondary: '#3498DB',
      accent: '#E74C3C',
      background: '#1A1B1E',
      surface: '#2D2D2D',
      text: '#FFFFFF',
      textSecondary: '#A0A0A0',
      border: '#404040',
      navBar: '#121212',
      statusBar: '#121212',
      card: '#2D2D2D',
      success: '#2ECC71',
      error: '#E74C3C',
      warning: '#F1C40F',
      info: '#3498DB',
      progressBackground: '#404040',
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(themes[savedTheme]);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme.name === 'light' ? themes.dark : themes.light;
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme.name);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
