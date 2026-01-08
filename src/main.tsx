import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.sass';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes.tsx';
import { ComposeProviders, providers } from './contexts/ComposeProviders.tsx';
import customStyle from './styles.ts';

customStyle();
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComposeProviders providers={providers}>
      <RouterProvider router={router} />
    </ComposeProviders>
  </StrictMode>
);
