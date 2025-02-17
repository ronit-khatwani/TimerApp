import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTimers } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';

const AddTimerScreen = ({ navigation }) => {
  const { addTimer } = useTimers();
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const durationInputRef = useRef(null);
  const categoryInputRef = useRef(null);

  const handleSubmit = () => {
    if (!name || !duration || !category) {
      setError('Please fill in all fields');
      return;
    }

    const durationInSeconds = parseInt(duration, 10);
    if (isNaN(durationInSeconds) || durationInSeconds <= 0) {
      setError('Please enter a valid duration');
      return;
    }

    addTimer({
      id: Date.now().toString(),
      name,
      duration: durationInSeconds,
      category,
      status: 'paused',
      remainingTime: durationInSeconds,
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Timer Name</Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Enter timer name"
              placeholderTextColor={theme.colors.textSecondary}
              returnKeyType="next"
              onSubmitEditing={() => durationInputRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Duration (seconds)</Text>
            <TextInput
              ref={durationInputRef}
              style={[
                styles.input,
                { 
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              value={duration}
              onChangeText={setDuration}
              placeholder="Enter duration in seconds"
              keyboardType="numeric"
              placeholderTextColor={theme.colors.textSecondary}
              returnKeyType="next"
              onSubmitEditing={() => categoryInputRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Category</Text>
            <TextInput
              ref={categoryInputRef}
              style={[
                styles.input,
                { 
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              value={category}
              onChangeText={setCategory}
              placeholder="Enter category"
              placeholderTextColor={theme.colors.textSecondary}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>

          {error ? (
            <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>
          ) : null}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Timer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AddTimerScreen;
