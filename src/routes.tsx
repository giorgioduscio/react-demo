import App from './App';
import { Ordinazioni } from './pages/Ordinazioni';
import { Resoconto } from './pages/Resoconto';
import { Storico } from './pages/Storico';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: '/',
        element: <Ordinazioni />,
      },
      {
        path: '/ordinazioni',
        element: <Ordinazioni />,
      },
      {
        path: '/resoconto',
        element: <Resoconto />,
      },
      {
        path: '/storico',
        element: <Storico />,
      },
    ],
  },
];

export default routes;
