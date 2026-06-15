import { Database, KeyRound, Link as LinkIcon, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { API_BASE_URL } from '../services/api';
import { useAuth } from '../context/useAuth';

export default function SettingsPage() {
  const { admin } = useAuth();

  return (
    <div>
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Deployment values used by the admin dashboard and backend services."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-navy-200 bg-white p-5 shadow-sm">
          <ShieldCheck className="h-8 w-8 text-orange-primary" />
          <h3 className="mt-4 text-lg font-black text-navy-950">Admin Profile</h3>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-black uppercase tracking-wide text-navy-400">Name</dt>
              <dd className="mt-1 font-bold text-navy-900">{admin?.name || 'Admin'}</dd>
            </div>
            <div>
              <dt className="font-black uppercase tracking-wide text-navy-400">Email</dt>
              <dd className="mt-1 font-bold text-navy-900">{admin?.email || 'Not available'}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-navy-200 bg-white p-5 shadow-sm">
          <Database className="h-8 w-8 text-orange-primary" />
          <h3 className="mt-4 text-lg font-black text-navy-950">MongoDB Atlas</h3>
          <p className="mt-3 text-sm leading-6 text-navy-600">
            Set `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `backend/.env`, then run `npm run seed:admin` from the backend folder.
          </p>
        </section>

        <section className="rounded-2xl border border-navy-200 bg-white p-5 shadow-sm">
          <LinkIcon className="h-8 w-8 text-orange-primary" />
          <h3 className="mt-4 text-lg font-black text-navy-950">API Base URL</h3>
          <p className="mt-3 break-all rounded-xl bg-navy-50 p-3 text-sm font-bold text-navy-700">{API_BASE_URL}</p>
        </section>

        <section className="rounded-2xl border border-navy-200 bg-white p-5 shadow-sm">
          <KeyRound className="h-8 w-8 text-orange-primary" />
          <h3 className="mt-4 text-lg font-black text-navy-950">Protected Routes</h3>
          <p className="mt-3 text-sm leading-6 text-navy-600">
            Dashboard pages require a valid JWT token. The token is attached to each Axios request and cleared automatically after an unauthorized response.
          </p>
        </section>
      </div>
    </div>
  );
}
