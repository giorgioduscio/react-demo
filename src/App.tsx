import { Outlet } from 'react-router-dom';
import { Navigation } from './shared/Navigation';

export default function App() {
  return (
    <div id='AppComponent' className='bg-wood'>
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Navigation />
    </div>
  );
}
