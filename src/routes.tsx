import { Navigate } from 'react-router-dom';
import App from './App';
import { Cart } from './pages/Cart';
import { Order } from './pages/Order';
import { Dishes } from './pages/Dishes';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: '/order',
        element: <Order />,
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
        path: '/',
        element: <Navigate to="/dishes" replace />
      }
    ],
  },
];

export default routes;
