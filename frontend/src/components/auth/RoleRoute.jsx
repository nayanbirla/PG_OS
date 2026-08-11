import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Restricts routes to specific user roles.
 * Redirects to the appropriate dashboard if role doesn't match.
 */
export default function RoleRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to the correct dashboard based on role
    const roleRedirects = {
      OWNER: '/owner',
      CARETAKER: '/caretaker',
      RESIDENT: '/resident',
    };
    const redirect = roleRedirects[user.role] || '/login';
    return <Navigate to={redirect} replace />;
  }

  return children;
}
