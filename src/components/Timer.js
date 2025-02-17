import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Feather';
import { useTimers } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';

const Timer = ({ timer }) => {
  const { startTimer, pauseTimer, resetTimer } = useTimers();
  const { theme } = useTheme();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = timer.remainingTime / timer.duration;

  const getStatusColor = () => {
    switch (timer.status) {
      case 'running':
        return theme.colors.success;
      case 'paused':
        return theme.colors.error;
      case 'completed':
        return theme.colors.info;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{timer.name}</Text>
        <View style={[styles.status, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{timer.status}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={6}
          color={getStatusColor()}
          unfilledColor={theme.colors.progressBackground}
          borderWidth={0}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.time, { color: theme.colors.text }]}>
          {formatTime(timer.remainingTime)}
        </Text>
        
        <View style={styles.controls}>
          {timer.status !== 'completed' && (
            <>
              {timer.status === 'paused' ? (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.colors.success }]}
                  onPress={() => startTimer(timer.id)}>
                  <Icon name="play" size={20} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.colors.error }]}
                  onPress={() => pauseTimer(timer.id)}>
                  <Icon name="pause" size={20} color="#fff" />
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.info }]}
                onPress={() => resetTimer(timer.id)}>
                <Icon name="rotate-ccw" size={20} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  progressContainer: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 20,
    fontWeight: '700',
  },
  controls: {
    flexDirection: 'row',
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default Timer;
