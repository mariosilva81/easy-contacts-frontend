import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';
import RegisterPage from '../pages/Register/Register';
import DashboardPage from '../pages/Dashboard/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';

export const RoutesMain = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};
