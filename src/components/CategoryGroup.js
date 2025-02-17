import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Timer from './Timer';
import Icon from 'react-native-vector-icons/Feather';
import { useTimers } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';

const CategoryGroup = ({ category, timers, isExpanded, onToggle }) => {
  const { startAllTimers, pauseAllTimers, resetAllTimers } = useTimers();
  const { theme } = useTheme();

  const handleStartAll = () => {
    startAllTimers(category);
  };

  const handlePauseAll = () => {
    pauseAllTimers(category);
  };

  const handleResetAll = () => {
    resetAllTimers(category);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity style={styles.header} onPress={onToggle}>
        <View style={styles.titleContainer}>
          <Icon
            name={isExpanded ? 'chevron-down' : 'chevron-right'}
            size={24}
            color={theme.colors.text}
          />
          <Text style={[styles.title, { color: theme.colors.text }]}>{category}</Text>
          <Text style={[styles.count, { color: theme.colors.textSecondary }]}>({timers.length})</Text>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
            onPress={handleStartAll}>
            <Icon name="play" size={20} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.error }]}
            onPress={handlePauseAll}>
            <Icon name="pause" size={20} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.info }]}
            onPress={handleResetAll}>
            <Icon name="rotate-ccw" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.timerList}>
          {timers.map((timer) => (
            <Timer key={timer.id} timer={timer} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  count: {
    fontSize: 14,
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  timerList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default CategoryGroup;
