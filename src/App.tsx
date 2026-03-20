import type { ReactElement } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/ui/Main';
import Auth from './pages/Auth/Page';
import { getAuthToken } from './shared/auth/session';

function ProtectedRoute({ children }: { children: ReactElement }) {
  const token = getAuthToken();
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={getAuthToken() ? '/main' : '/auth'} replace />} />
      </Routes>
    </div>
  );
}

export default App;
