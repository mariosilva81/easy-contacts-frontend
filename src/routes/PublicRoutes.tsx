import { Navigate, Outlet } from 'react-router-dom';
import { useClientContext } from '../providers/ClientContext';

const PublicRoutes = () => {
  const { client } = useClientContext();

  return !client ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoutes;
