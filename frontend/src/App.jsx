import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleRoute from './components/auth/RoleRoute';
import DashboardLayout from './components/layout/DashboardLayout';

import LoginPage from './pages/LoginPage';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import CaretakerDashboard from './pages/caretaker/CaretakerDashboard';
import ResidentHome from './pages/resident/ResidentHome';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Owner Protected Routes */}
            <Route
              path="/owner"
              element={
                <ProtectedRoute>
                  <RoleRoute allowedRoles={['OWNER', 'SUPER_ADMIN']}>
                    <DashboardLayout role="OWNER" />
                  </RoleRoute>
                </ProtectedRoute>
              }
            >
              <Route index element={<OwnerDashboard />} />
              <Route path="properties" element={<div className="card">Properties Module (Sprint 2)</div>} />
              <Route path="residents" element={<div className="card">Resident Directory (Sprint 3)</div>} />
              <Route path="rent" element={<div className="card">Rent Financial Module (Sprint 4)</div>} />
              <Route path="complaints" element={<div className="card">Complaint System (Sprint 4)</div>} />
              <Route path="settings" element={<div className="card">Owner Settings</div>} />
            </Route>

            {/* Caretaker Protected Routes */}
            <Route
              path="/caretaker"
              element={
                <ProtectedRoute>
                  <RoleRoute allowedRoles={['CARETAKER', 'SUPER_ADMIN']}>
                    <DashboardLayout role="CARETAKER" />
                  </RoleRoute>
                </ProtectedRoute>
              }
            >
              <Route index element={<CaretakerDashboard />} />
              <Route path="room-map" element={<div className="card">Room Map Allocations (Sprint 2)</div>} />
              <Route path="residents" element={<div className="card">Resident Onboarding (Sprint 3)</div>} />
              <Route path="rent" element={<div className="card">Rent Collection (Sprint 4)</div>} />
              <Route path="complaints" element={<div className="card">Complaint Resolution (Sprint 4)</div>} />
            </Route>

            {/* Resident App Protected Route */}
            <Route
              path="/resident"
              element={
                <ProtectedRoute>
                  <RoleRoute allowedRoles={['RESIDENT']}>
                    <ResidentHome />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            {/* Default Redirection */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155',
              borderRadius: '8px',
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
