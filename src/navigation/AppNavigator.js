import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import AddTimerScreen from '../screens/AddTimerScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.navBar,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: Platform.select({
            ios: {
              fontSize: 17,
              fontWeight: '600',
            },
            android: {
              fontSize: 20,
              fontFamily: 'sans-serif-medium',
              fontWeight: 'normal',
            },
          }),
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity 
              onPress={toggleTheme} 
              style={{ 
                marginRight: Platform.OS === 'ios' ? 16 : 8,
                padding: 8,
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Icon
                name={theme.name === 'dark' ? 'light-mode' : 'dark-mode'}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          ),
        }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'My Timers',
          }}
        />
        <Stack.Screen 
          name="AddTimer" 
          component={AddTimerScreen}
          options={{
            title: 'Create Timer',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen}
          options={{
            title: 'Timer History',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
