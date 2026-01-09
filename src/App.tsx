import { Outlet } from 'react-router-dom';
import { Navigation } from './shared/Navigation';

export default function App() {
  return (
    <div id='AppComponent' className='bg-wood'>
      <div className="text-bg-st" style={{height: '100vh'}}>
      <Outlet />
      <Navigation />
      </div>
    </div>
  );
}
