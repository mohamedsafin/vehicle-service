import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Loader2, LockKeyhole, Mail, Truck } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { getErrorMessage } from '../services/api';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(credentials);
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch (loginError) {
      setError(getErrorMessage(loginError, 'Unable to sign in'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-navy-950 px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(9,63,109,0.6),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.22),transparent_30%)]" />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-orange-primary text-white shadow-lg">
            <Truck className="h-7 w-7" />
          </div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-orange-primary">Haulier & Service Admin</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-navy-950">Control Center Login</h1>
          <p className="mt-2 text-sm text-navy-500">Sign in to manage quote requests, fleet, contacts, and analytics.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-navy-500">
              <Mail className="h-4 w-4" />
              Email
            </span>
            <input
              type="email"
              value={credentials.email}
              onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
              required
              className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
              placeholder="admin@haulierandservice.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-navy-500">
              <LockKeyhole className="h-4 w-4" />
              Password
            </span>
            <input
              type="password"
              value={credentials.password}
              onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
              required
              className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
              placeholder="Enter admin password"
            />
          </label>

          {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-primary px-5 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
