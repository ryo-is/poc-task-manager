import { useAtomValue } from 'jotai';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AuthCallback } from './pages/auth/AuthCallback';
import { Login } from './pages/login/Login';
import { Top } from './pages/top/Top';
import { authStateAtom } from './stores/auth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authState = useAtomValue(authStateAtom);

  if (authState.isLoading) {
    return <LoadingSpinner message="認証状態を確認中..." />;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Top />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
