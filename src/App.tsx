import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './shared/Navigation';
import { useEffect } from 'react';

export default function App() {
  const location = useLocation();

  // Scroll to top quando cambia la route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-wood">
      <div className='text-bg-st' style={{minHeight:'100vh'}}>
        <Outlet />
        <Navigation />
      </div>
    </div>
  );
}
