# React Demo Application

A React + TypeScript + Vite demo application showcasing modern React development with routing, theming, and responsive design.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📋 Project Overview

This is a business management React application built with:

- **React 19** with TypeScript
- **Vite 7** for fast development and building
- **React Router v7** for client-side routing
- **Bootstrap 5** for responsive UI components
- **SASS** for CSS preprocessing (pure indented syntax)
- **Theme Context** for dark/light theme switching
- **ESLint** for code quality

## 🎯 Features

- **Business-focused routing**: Ordinazioni, Resoconto, and Storico pages
- **Custom Navigation**: Modern button-based navigation system
- **Theme switching**: Toggle between light and dark themes
- **Responsive design**: Mobile-friendly layout
- **TypeScript**: Full type safety throughout the application
- **Modern tooling**: Vite for fast HMR and optimized builds

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── contexts/        # React context providers
│   ├── ThemeContext.tsx  # Theme management
│   └── ComposeProviders.tsx # Provider composition
├── pages/           # Page components
│   ├── Ordinazioni.tsx  # Orders management page
│   ├── Resoconto.tsx    # Daily summary page
│   └── Storico.tsx      # Historical records page
├── shared/          # Shared components
│   ├── Navigation.tsx   # Navigation component
│   └── Navigation.scss # Navigation styles
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── routes.tsx       # Route configuration
└── styles.sass      # Global SASS styles (pure syntax)
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build production-ready assets |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🌐 Development

The development server runs on `http://localhost:5173` by default. The application includes:

- **Custom Navigation**: Three buttons for Ordinazioni, Resoconto, and Storico
- **Ordinazioni page**: Order management interface
- **Resoconto page**: Daily summary and statistics
- **Storico page**: Historical records archive
- **Theme switching** button to toggle between light/dark modes

## 📄 Application Pages

### Ordinazioni
The main orders management page where you can:
- View and manage active orders
- Track order status
- Handle order processing workflow

### Resoconto
Daily summary and analytics page featuring:
- Sales statistics
- Performance metrics
- Daily activity overview

### Storico
Historical records archive with:
- Complete operation history
- Search and filter capabilities
- Export functionality

## 🎨 Theming

The application supports theme switching using a React Context:

```typescript
// Toggle theme in any component
const { theme, toggleTheme } = useTheme();

// Current theme is available as: theme ('light' or 'dark')
```

## 📦 Dependencies

### Production
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `react-router-dom` ^7.12.0
- `bootstrap` ^5.3.8
- `sass` ^1.97.2

### Development
- `vite` ^7.2.4
- `@vitejs/plugin-react` ^5.1.1
- `typescript` ~5.9.3
- `eslint` ^9.39.1
- `@typescript-eslint` ^8.46.4

## 🔍 Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and all rights are reserved.
