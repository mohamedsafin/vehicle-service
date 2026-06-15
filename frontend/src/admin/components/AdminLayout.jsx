import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Gauge,
  LogOut,
  Menu,
  MessageSquareText,
  Settings,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: Gauge, end: true },
  { label: 'Quote Requests', path: '/admin/quotes', icon: Truck },
  { label: 'Fleet Management', path: '/admin/fleet', icon: Truck },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { label: 'System Settings', path: '/admin/settings', icon: Settings },
  { label: 'Contact Settings', path: '/admin/contact-settings', icon: Settings },
];

function Sidebar({ onClose, onLogout }) {
  return (
    <aside className="flex h-full w-72 flex-col bg-navy-950 text-white">
      <div className="flex h-20 items-center justify-between px-5">
        <Link to="/admin" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-primary text-white shadow-lg">
            <Truck className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-base font-black tracking-tight">Haulier & Service</span>
            <span className="text-xs font-semibold text-navy-300">Admin Control</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-lg text-navy-300 transition hover:bg-white/10 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={path}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? 'bg-orange-primary text-white shadow-lg shadow-orange-primary/20'
                  : 'text-navy-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-navy-300 transition hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-navy-50 text-navy-900">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
        <Sidebar onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy-950/60"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="relative h-full">
            <Sidebar onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
          </div>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-navy-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-navy-200 text-navy-700 transition hover:border-orange-primary hover:text-orange-primary lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-primary">Haulier & Service</p>
              <h1 className="text-lg font-black tracking-tight sm:text-2xl">Admin Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-navy-200 bg-navy-50 px-3 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-navy-950 text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-black">{admin?.name || 'Admin'}</p>
              <p className="text-xs font-semibold text-navy-500">{admin?.email || 'admin@haulierandservice.com'}</p>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
