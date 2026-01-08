import App from './App';
import About from './pages/About';
import Home from './pages/Home';

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
        path: '/about',
        element: <About />,
      },
    ],
  },
];

export default routes;
