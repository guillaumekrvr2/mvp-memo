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
2. **Cards**: HomeScreen → CardsSettingsScreen → CardsGame (memorization with swipe gestures) → CardsRecall (tactile grid recall)
3. **Settings**: Mode selection, time objectives, auto-advance preferences stored in AsyncStorage

### Cards Recall Screen
- **CardsRecallScreen**: Tactile grid interface for recalling exact card order
- **Features**: Suit-based grid layout, thumb glide selection, swipe-up commit, undo/redo
- **Navigation**: Triggered after CardsGame completion, hides header/tab bar
- **Grid Organization**: Cards organized by suit (spades, hearts, diamonds, clubs) with ≥44pt touch targets
- **Interaction**: Continuous thumb glide for preselection, swipe up to commit batches to output slots
- **Visual Feedback**: High contrast, used cards disabled/hidden, haptic feedback on commit

### Styling
- **Styled Components**: Primary styling approach with theme provider
- **Theme Structure**: colors, typography, spacing, borders defined in theme/
- **Responsive**: Uses React Native's Flexbox for layout

## 🚨 CRITICAL SECURITY RULES 🚨

**NEVER perform ANY of these destructive operations without EXPLICIT user confirmation:**

### ❌ FORBIDDEN DATABASE OPERATIONS
- **NEVER DROP** tables, views, schemas, or databases
- **NEVER TRUNCATE** or DELETE FROM tables without WHERE clauses
- **NEVER ALTER** table structures in production
- **NEVER REVOKE** permissions or drop users
- **NEVER MODIFY** RLS (Row Level Security) policies without review

### ❌ FORBIDDEN FILE OPERATIONS  
- **NEVER DELETE** entire directories or critical files
- **NEVER REMOVE** package.json, .env files, or config files
- **NEVER OVERWRITE** without backing up important data
- **NEVER MODIFY** .gitignore to expose secrets

### ❌ FORBIDDEN SUPABASE OPERATIONS
- **NEVER DELETE** user accounts or authentication records
- **NEVER MODIFY** storage buckets or policies
- **NEVER CHANGE** API keys or service roles
- **NEVER RESET** production databases

### ❌ FORBIDDEN DEPLOYMENT OPERATIONS
- **NEVER DEPLOY** to production without testing
- **NEVER MODIFY** environment variables in production
- **NEVER DELETE** production builds or releases
- **NEVER CHANGE** DNS or domain configurations

### ✅ SAFE PRACTICES TO FOLLOW
- **ALWAYS** create backups before major changes
- **ALWAYS** test database changes in development first
- **ALWAYS** use transactions for multi-step operations
- **ALWAYS** validate user inputs and sanitize data
- **ALWAYS** preserve existing functionality when refactoring
- **ALWAYS** ask for confirmation before destructive operations

### 🔒 SECURITY REMINDERS
- **SECRETS**: Never commit API keys, passwords, or tokens
- **VALIDATION**: Always validate and sanitize user inputs
- **PERMISSIONS**: Follow principle of least privilege
- **LOGGING**: Never log sensitive information
- **AUTHENTICATION**: Always verify user permissions before operations

**If asked to perform ANY destructive operation, STOP and ask for explicit confirmation with details about the risks.**