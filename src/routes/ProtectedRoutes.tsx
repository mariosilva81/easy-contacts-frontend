import { Navigate, Outlet } from 'react-router-dom';
import { useClientContext } from '../providers/ClientContext';

const ProtectedRoutes = () => {
  const { client } = useClientContext();

  return client ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
