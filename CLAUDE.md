# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start
# or
npx expo start

# Platform-specific builds
npm run android    # Android emulator
npm run ios       # iOS simulator
npm run web       # Web browser

# Development tools
npm run lint      # Run ESLint
npm test         # Run Jest tests with watch mode
npm run doctor   # Run expo-doctor diagnostics
```

## Architecture Overview

This is a React Native Expo memory training app with the following key architecture:

### Navigation Structure
- **Root Navigation**: App.js → MainStackNavigator → AppNavigator (bottom tabs)
- **Bottom Tab Navigation**: Home, Discover, Community, Shop tabs
- **Home Stack**: Contains all memory training screens (Numbers, Cards, etc.)
- **Dynamic Header/Tab Bar**: Hides on certain screens (Memorisation, Decompte, Recall, Cards, CardsGame)

### Core Features
1. **Numbers Memory Training**: Memorization → Recall → Correction flow
2. **Cards Memory Training**: Card deck memorization with swipe gestures
3. **Game Modes**: Memory League, IAM, and Custom modes with different timing
4. **Authentication**: Supabase-based auth with AsyncStorage persistence

### State Management
- **Contexts**: AccountContext, ModeVariantContext for global state
- **Async Storage**: User preferences, auto-advance settings, game records
- **Supabase**: User data, leaderboards, mode variants

### Component Organization
- **atoms/**: Basic UI components (buttons, text, inputs)
- **molecules/**: Composed components (modals, headers, pickers)
- **organisms/**: Complex components (grids, lists)
- **screens/**: Full screen components organized by feature

### Key Directories
- `hooks/`: Custom React hooks for game logic, storage, and UI state
- `contexts/`: React context providers for global state
- `data/repositories/`: Data access layer with Supabase repositories
- `usecases/`: Business logic layer
- `config/`: Game configuration, Supabase config, default variants
- `theme/`: Styled-components theme (colors, typography, spacing)
- `navigation/`: React Navigation stack and tab navigators

### Data Flow
1. **Repository Pattern**: Supabase repositories implement data access
2. **Use Cases**: Business logic layer between UI and repositories  
3. **Context Providers**: Global state management for user and game data
4. **Custom Hooks**: Component-level state and side effects

### Testing
- Jest with jest-expo preset
- Test files should follow `*.test.js` or `*.spec.js` naming

### Memory Game Flow
1. **Numbers**: HomeScreen → NumbersScreen → Decompte → Memorisation → Recall → Correction
2. **Cards**: HomeScreen → CardsSettingsScreen → CardsGame (with swipe gestures)
3. **Settings**: Mode selection, time objectives, auto-advance preferences stored in AsyncStorage

### Styling
- **Styled Components**: Primary styling approach with theme provider
- **Theme Structure**: colors, typography, spacing, borders defined in theme/
- **Responsive**: Uses React Native's Flexbox for layout