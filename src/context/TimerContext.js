import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Platform, Alert } from 'react-native';
import { useTheme } from './ThemeContext';

const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMERS':
      return { ...state, timers: action.payload };
    case 'SET_HISTORY':
      return { ...state, history: action.payload };
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? action.payload : timer
        ),
      };
    case 'ADD_TO_HISTORY':
      const newHistory = [...state.history, action.payload];
      AsyncStorage.setItem('timerHistory', JSON.stringify(newHistory));
      return {
        ...state,
        history: newHistory,
      };
    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const [completedTimer, setCompletedTimer] = useState(null);
  const [halfwayAlert, setHalfwayAlert] = useState(null);
  const { theme } = useTheme();
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
    loadTimers();
    loadHistory();
  }, []);

  const loadTimers = async () => {
    try {
      const timersData = await AsyncStorage.getItem('timers');
      if (timersData) {
        dispatch({ type: 'SET_TIMERS', payload: JSON.parse(timersData) });
      }
    } catch (error) {
      console.error('Error loading timers:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const historyData = await AsyncStorage.getItem('timerHistory');
      if (historyData) {
        dispatch({ type: 'SET_HISTORY', payload: JSON.parse(historyData) });
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const saveTimers = async (timers) => {
    try {
      await AsyncStorage.setItem('timers', JSON.stringify(timers));
    } catch (error) {
      console.error('Error saving timers:', error);
    }
  };

  const addTimer = (timer) => {
    dispatch({ type: 'ADD_TIMER', payload: timer });
    saveTimers([...state.timers, timer]);
  };

  const updateTimer = (timer) => {
    dispatch({ type: 'UPDATE_TIMER', payload: timer });
    saveTimers(state.timers.map(t => t.id === timer.id ? timer : t));
  };

  const startTimer = (timerId) => {
    const timer = state.timers.find(t => t.id === timerId);
    if (timer && timer.status !== 'completed') {
      updateTimer({ ...timer, status: 'running' });
    }
  };

  const pauseTimer = (timerId) => {
    const timer = state.timers.find(t => t.id === timerId);
    if (timer && timer.status === 'running') {
      updateTimer({ ...timer, status: 'paused' });
    }
  };

  const resetTimer = (timerId) => {
    const timer = state.timers.find(t => t.id === timerId);
    if (timer) {
      updateTimer({
        ...timer,
        status: 'paused',
        remainingTime: timer.duration,
      });
    }
  };

  const startAllTimers = (category) => {
    const updatedTimers = state.timers.map(timer => {
      if (timer.category === category && timer.status !== 'completed') {
        return { ...timer, status: 'running' };
      }
      return timer;
    });
    dispatch({ type: 'SET_TIMERS', payload: updatedTimers });
    saveTimers(updatedTimers);
  };

  const pauseAllTimers = (category) => {
    const updatedTimers = state.timers.map(timer => {
      if (timer.category === category && timer.status === 'running') {
        return { ...timer, status: 'paused' };
      }
      return timer;
    });
    dispatch({ type: 'SET_TIMERS', payload: updatedTimers });
    saveTimers(updatedTimers);
  };

  const resetAllTimers = (category) => {
    const updatedTimers = state.timers.map(timer => {
      if (timer.category === category) {
        return {
          ...timer,
          status: 'paused',
          remainingTime: timer.duration,
        };
      }
      return timer;
    });
    dispatch({ type: 'SET_TIMERS', payload: updatedTimers });
    saveTimers(updatedTimers);
  };

  const showHalfwayAlert = (timer) => {
    if (!halfwayAlert || halfwayAlert.id !== timer.id) {
      setHalfwayAlert(timer);
      Alert.alert(
        'Halfway Point!',
        `${timer.name} is at 50% completion`,
        [{ text: 'OK', onPress: () => setHalfwayAlert(null) }]
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = state.timers.map(timer => {
        if (timer.status === 'running' && timer.remainingTime > 0) {
          const newRemainingTime = timer.remainingTime - 1;
          
          // Check for halfway point
          if (newRemainingTime === Math.floor(timer.duration / 2)) {
            showHalfwayAlert(timer);
          }
          
          if (newRemainingTime === 0) {
            const historyEntry = {
              id: Date.now().toString(),
              name: timer.name,
              category: timer.category,
              duration: timer.duration,
              completedAt: new Date().toISOString(),
            };
            
            dispatch({ type: 'ADD_TO_HISTORY', payload: historyEntry });
            setCompletedTimer(timer);
            
            return {
              ...timer,
              status: 'completed',
              remainingTime: newRemainingTime,
            };
          }
          return { ...timer, remainingTime: newRemainingTime };
        }
        return timer;
      });

      if (JSON.stringify(updatedTimers) !== JSON.stringify(state.timers)) {
        dispatch({ type: 'SET_TIMERS', payload: updatedTimers });
        saveTimers(updatedTimers);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timers]);

  useEffect(() => {
    if (Platform.OS === 'android' && completedTimer) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        setCompletedTimer(null);
        return true;
      });
      return () => backHandler.remove();
    }
  }, [completedTimer]);

  const exportHistory = async () => {
    try {
      const historyData = JSON.stringify(state.history, null, 2);
      Alert.alert('Export Success', 'Timer history exported successfully');
      return historyData;
    } catch (error) {
      Alert.alert('Export Error', 'Failed to export timer history');
      console.error('Error exporting history:', error);
    }
  };

  const categories = [...new Set(state.timers.map(timer => timer.category))];
  
  const getFilteredTimers = () => {
    if (!categoryFilter) return state.timers;
    return state.timers.filter(timer => timer.category === categoryFilter);
  };

  return (
    <TimerContext.Provider
      value={{
        timers: getFilteredTimers(),
        history: state.history,
        categories,
        categoryFilter,
        setCategoryFilter,
        addTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        startAllTimers,
        pauseAllTimers,
        resetAllTimers,
        exportHistory,
      }}>
      {children}
      <Modal
        isVisible={!!completedTimer}
        onBackdropPress={() => setCompletedTimer(null)}
        onBackButtonPress={() => setCompletedTimer(null)}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
            Timer Completed! 🎉
          </Text>
          <Text style={[styles.modalText, { color: theme.colors.textSecondary }]}>
            {completedTimer?.name} has finished.
          </Text>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => setCompletedTimer(null)}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TimerContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const useTimers = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimers must be used within a TimerProvider');
  }
  return context;
};

export default TimerContext;
