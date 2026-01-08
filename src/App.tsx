import { Link, Outlet } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import './App.scss';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            React Demo
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <button className="btn btn-secondary" onClick={toggleTheme}>
              Toggle Theme (current: {theme})
            </button>
          </div>
        </div>
      </nav>
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
