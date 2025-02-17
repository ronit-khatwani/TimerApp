import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Platform,
} from 'react-native';
import CategoryGroup from '../components/CategoryGroup';
import { useTimers } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ navigation }) => {
  const { timers, categories, categoryFilter, setCategoryFilter } = useTimers();
  const { theme } = useTheme();
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const renderCategoryFilter = () => {
    if (categories.length === 0) return null;

    return (
      <View style={[styles.filterContainer, { 
        backgroundColor: theme.colors.surface,
        borderBottomColor: theme.name === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      }]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              { backgroundColor: theme.name === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
              !categoryFilter && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setCategoryFilter(null)}>
            <Text style={[
              styles.filterChipText,
              { color: theme.name === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)' },
              !categoryFilter && styles.filterChipTextSelected,
            ]}>
              All
            </Text>
          </TouchableOpacity>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                { backgroundColor: theme.name === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
                categoryFilter === category && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setCategoryFilter(category)}>
              <Text style={[
                styles.filterChipText,
                { color: theme.name === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)' },
                categoryFilter === category && styles.filterChipTextSelected,
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const getVisibleTimers = (category) => {
    return timers.filter(timer => timer.category === category);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {renderCategoryFilter()}
      <ScrollView style={styles.scrollView}>
        {categories.map((category) => {
          if (categoryFilter && category !== categoryFilter) return null;
          const categoryTimers = getVisibleTimers(category);
          if (categoryTimers.length === 0) return null;
          
          return (
            <CategoryGroup
              key={category}
              category={category}
              timers={categoryTimers}
              isExpanded={expandedCategories[category]}
              onToggle={() => toggleCategory(category)}
            />
          );
        })}
        {timers.length === 0 && (
          <View style={styles.emptyContainer}>
            <Icon name="clock" size={64} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No timers yet. Create one by tapping the + button!
            </Text>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.historyButton, { backgroundColor: theme.colors.secondary }]}
          onPress={() => navigation.navigate('History')}>
          <Icon name="list" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('AddTimer')}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  historyButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default HomeScreen;
