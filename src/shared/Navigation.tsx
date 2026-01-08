import { Link } from 'react-router-dom';
import './Navigation.scss';

export function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/ordinazioni" className="nav-button">
            Ordinazioni
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/resoconto" className="nav-button">
            Resoconto
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/storico" className="nav-button">
            Storico
          </Link>
        </li>
      </ul>
    </nav>
  );
}