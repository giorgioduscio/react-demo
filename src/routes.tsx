import { Navigate } from 'react-router-dom';
import App from './App';
import { Cart } from './pages/Cart';
import { History } from './pages/History';
import { Dishes } from './pages/Dishes';
import { Payment } from './pages/Payment';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: '/history',
        element: <History />,
      },
      {
        path: '/dishes',
        element: <Dishes />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/',
        element: <Navigate to="/dishes" replace />
      },
    ],
  },
];

export default routes;
