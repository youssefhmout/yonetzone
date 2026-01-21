import { Navigate } from 'react-router-dom';

export default function Logout() {
  localStorage.removeItem('Token');
  localStorage.removeItem('Data');

  return <Navigate to="/" replace />;
}


