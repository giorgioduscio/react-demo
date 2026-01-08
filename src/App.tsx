import { Outlet } from 'react-router-dom';
import { Navigation } from './shared/Navigation';

export default function App() {

  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}
