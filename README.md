# Todo Productivity App

A clean, modern todo/productivity mobile app built with **Expo** (React Native).

## Features

- Create, complete, and delete tasks
- Categorize tasks (Personal, Work, Shopping, Health)
- Set priority levels (Low, Medium, High)
- Filter tasks by status (All, Active, Done)
- Dashboard with task statistics
- Persistent storage using AsyncStorage
- Smooth animations and modern UI

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Installation

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS) to run on your device.

## Project Structure

```
├── App.js                     # App entry point with navigation
├── src/
│   ├── context/
│   │   └── TodoContext.js     # Global state management
│   ├── components/
│   │   ├── TodoItem.js        # Task list item component
│   │   ├── StatsCard.js       # Dashboard stat card
│   │   └── FilterChips.js     # Filter toggle chips
│   └── screens/
│       ├── HomeScreen.js      # Main task list with stats
│       ├── AddTaskScreen.js   # New task creation form
│       └── TaskDetailScreen.js # Task detail view
```

## Tech Stack

- **Expo** - Managed React Native workflow
- **React Navigation** - Screen navigation
- **AsyncStorage** - Local data persistence
- **React Context + useReducer** - State management
