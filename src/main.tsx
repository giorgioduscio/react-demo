import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.sass';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes.tsx';
import { ComposeProviders, providers } from './contexts/ComposeProviders.tsx';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComposeProviders providers={providers}>
      <RouterProvider router={router} />
    </ComposeProviders>
  </StrictMode>
);
