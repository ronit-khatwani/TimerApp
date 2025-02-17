import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

export const ThemeIcon = ({ isDark, size = 24, color = '#FFFFFF' }) => (
  <Feather name={isDark ? 'sun' : 'moon'} size={size} color={color} />
);

export const PlayIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="play" size={size} color={color} />
);

export const PauseIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="pause" size={size} color={color} />
);

export const ResetIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="rotate-ccw" size={size} color={color} />
);

export const ListIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="list" size={size} color={color} />
);

export const PlusIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="plus" size={size} color={color} />
);

export const CheckIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="check-circle" size={size} color={color} />
);

export const TimeIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="clock" size={size} color={color} />
);

export const CalendarIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="calendar" size={size} color={color} />
);

export const ChevronDownIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="chevron-down" size={size} color={color} />
);

export const ChevronRightIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Feather name="chevron-right" size={size} color={color} />
);
