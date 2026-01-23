import { Navigate } from 'react-router-dom';
import { createElement, lazy, Suspense } from 'react';
import App from './App';

// Componente di fallback per il caricamento lazy
const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center min-vh-100">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Caricamento...</span>
    </div>
  </div>
);

// Helper per creare route con lazy loading
const createLazyRoute = (path: string, lazyComponent: any) => ({
  path,
  element: (
    <Suspense fallback={<LoadingFallback />}>
      {createElement(lazyComponent)}
    </Suspense>
  ),
});

// Import lazy delle pagine (compatibile con Vite)
const lazyPages = {
  History: lazy(() => import('./pages/History').then(module => ({ default: module.History }))),
  Dishes: lazy(() => import('./pages/Dishes').then(module => ({ default: module.Dishes }))),
  Cart: lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart }))),
  Payment: lazy(() => import('./pages/Payment').then(module => ({ default: module.Payment }))),
  Result: lazy(() => import('./pages/Result').then(module => ({ default: module.Result }))),
};

// Definizione delle pagine e dei loro percorsi
const pages = [
  { path: '/history', component: lazyPages.History },
  { path: '/dishes', component: lazyPages.Dishes },
  { path: '/cart', component: lazyPages.Cart },
  { path: '/payment', component: lazyPages.Payment },
  { path: '/result', component: lazyPages.Result },
];

// Generazione dinamica delle route
const pageRoutes = pages.map(page => createLazyRoute(page.path, page.component));

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <div className='d-flex justify-content-center align-items-center'>Not Found</div>,
    children: [
      ...pageRoutes,
      {
        path: '/',
        element: <Navigate to="/dishes" replace />
      },
    ],
  },
];

export default routes;
