# Timer App

A modern React Native app for managing multiple customizable timers with features like categories, progress visualization, and grouped actions.

## Features

- Create and manage multiple timers
- Organize timers by categories
- Real-time progress visualization
- Bulk actions for timer groups
- Timer completion notifications
- Timer history tracking
- Modern and intuitive UI

## Prerequisites

- Node.js >= 14
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TimerApp
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies:
```bash
cd ios
pod install
cd ..
```

## Running the App

### iOS
```bash
npx react-native run-ios
```

### Android
```bash
npx react-native run-android
```

## Project Structure

- `/src`
  - `/components` - Reusable UI components
  - `/screens` - Main app screens
  - `/context` - App state management
  - `/navigation` - Navigation configuration

## Technical Details

- Built with React Native CLI
- Uses Context API for state management
- AsyncStorage for data persistence
- React Navigation for screen navigation
- Modern UI with react-native-vector-icons

## Assumptions

1. Users prefer a clean, modern interface over complex UI elements
2. Timer durations are specified in seconds
3. Users need visual feedback for timer progress
4. Category-based organization improves timer management
5. Users want to track completed timer history

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
