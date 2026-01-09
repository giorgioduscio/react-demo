import App from './App';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { Ordinazioni } from './pages/Ordinazioni';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/ordinations',
        element: <Ordinazioni />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
];

export default routes;
