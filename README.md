# Next.js Application

A modern Next.js application with TypeScript, Tailwind CSS, and essential libraries for building production-ready web applications.

## Features

- ⚡ **Next.js 15** with App Router and Turbopack
- 🎨 **Tailwind CSS 4** for styling
- 📘 **TypeScript** for type safety
- 🧪 **Vitest** with React Testing Library for testing
- 🎯 **ESLint** and **Prettier** for code quality
- 🔄 **React Query** for server state management
- 🎭 **Zustand** for client state management
- 📝 **React Hook Form** with Zod validation
- 🌙 **next-themes** for dark mode support
- 🎨 **Lucide React** for beautiful icons

## Getting Started

### Prerequisites

- Node.js 18.19.1 or later
- npm 9.2.0 or later

### Installation

Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # UI components
│   └── providers.tsx  # App providers
├── lib/               # Utility functions
│   ├── utils.ts       # Helper utilities
│   └── constants.ts   # App constants
├── types/             # TypeScript types
├── hooks/             # Custom React hooks
├── test/              # Test setup and utilities
└── public/            # Static files
```

## Technologies

### Core
- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

### Styling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [class-variance-authority](https://cva.style/) - Component variants
- [clsx](https://github.com/lukeed/clsx) - Class names utility
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind classes

### State Management & Data Fetching
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Query](https://tanstack.com/query) - Server state management
- [Axios](https://axios-http.com/) - HTTP client

### Forms & Validation
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### UI & Icons
- [Lucide React](https://lucide.dev/) - Icons
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

### Testing
- [Vitest](https://vitest.dev/) - Test runner
- [React Testing Library](https://testing-library.com/react) - Component testing

### Code Quality
- [ESLint](https://eslint.org/) - Linting
- [Prettier](https://prettier.io/) - Code formatting

## License

MIT
