import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import NotFoundPage from './Pages/NotFond';
import Layout from './Pages/layout';
import SuspenseLoading from './Pages/layout/SuspenseLoading';

const LoginPage = React.lazy(() => import('./Pages/login'));
const Chat = React.lazy(() => import('./Pages/Chat'));
const Home = React.lazy(() => import('./Pages/home'));
export const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      id: 'layout',
      element: <Layout />,
      children: [
        { path: '/login', element: <LoginPage /> },
        { index: true, element: <Home /> },
        { path: '/chat', element: <Chat /> },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ]
  // { basename: import.meta.env.VITE_BASE_URL || "/" }
);

export default function AppRouter() {
  return (
    <SuspenseLoading>
      <RouterProvider router={ROUTER} />
    </SuspenseLoading>
  );
}
