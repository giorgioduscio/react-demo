import { Outlet } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import { Navigation } from './shared/Navigation';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <Navigation />
      <div className="theme-toggle-container">
        <button className="btn btn-secondary theme-toggle" onClick={toggleTheme}>
          Toggle Theme (current: {theme})
        </button>
      </div>
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
}
