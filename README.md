# TaskFlow - Modern Task Manager

TaskFlow is a modern, feature-rich task management application built with React, Redux, and TypeScript. It offers a clean, intuitive interface with dark mode support and smooth animations.

## Features

- ✨ Clean, modern UI with dark mode support
- 🔄 Recurring tasks (daily, weekly, monthly)
- 🎙️ Voice input for task creation
- 💾 Local storage persistence
- 🔍 Task filtering (all, active, completed)
- 📱 Responsive design
- 🌓 Automatic dark mode detection
- 🔄 Smooth animations with Framer Motion
- 📤 Task sharing capabilities
- 🗑️ Confirmation dialogs for deletions

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Web Speech API
- Vitest for testing

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Browser Support

The voice input feature requires a modern browser that supports the Web Speech API. The application will gracefully degrade when this feature is not available.

## Design Choices

- **TypeScript**: For type safety and better developer experience
- **Redux Toolkit**: For predictable state management
- **Tailwind CSS**: For rapid UI development and consistent styling
- **Framer Motion**: For smooth, professional animations
- **Local Storage**: For data persistence without backend requirements
- **Web Speech API**: For natural voice input support
- **Modular Components**: For maintainability and reusability
- **Responsive Design**: For optimal viewing across all devices
- **Dark Mode**: For reduced eye strain and modern aesthetics
