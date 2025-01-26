import { createBrowserRouter, RouteObject } from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth';
import Authorization from './pages/Authorization';
import Forms from './pages/Forms';
import Museums from './pages/Museums';
import DashboardLayout from './layouts/DashboardLayout';

const routes: RouteObject[] = [
  {
    path: '/', // Главный маршрут
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ), // Защищаем DashboardLayout
    children: [
      { path: '', element: <div>Добро пожаловать</div> },
      { path: '/forms', element: <Forms /> },
      { path: '/museums', element: <Museums /> },
    ],
  },
  {
    path: '/',
    element: <Authorization />,
  },
];

const router = createBrowserRouter(routes);

export default router;
