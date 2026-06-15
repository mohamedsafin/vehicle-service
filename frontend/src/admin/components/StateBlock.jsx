import { Loader2 } from 'lucide-react';

export function LoadingBlock({ label = 'Loading dashboard data' }) {
  return (
    <div className="grid min-h-56 place-items-center rounded-2xl border border-navy-200 bg-white">
      <div className="flex items-center gap-3 text-sm font-bold text-navy-500">
        <Loader2 className="h-5 w-5 animate-spin text-orange-primary" />
        {label}
      </div>
    </div>
  );
}

export function EmptyBlock({ title = 'No records found', description }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy-300 bg-white p-10 text-center">
      <p className="text-base font-black text-navy-900">{title}</p>
      {description && <p className="mt-2 text-sm text-navy-500">{description}</p>}
    </div>
  );
}

export function ErrorBlock({ message }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-700">
      {message}
    </div>
  );
}
