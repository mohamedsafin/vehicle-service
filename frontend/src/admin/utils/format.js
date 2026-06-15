export const formatDate = (value) => {
  if (!value) return 'Not available';

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
};

export const formatDateTime = (value) => {
  if (!value) return 'Not available';

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
};

export const statusClass = (status) => {
  const styles = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Contacted: 'bg-sky-50 text-sky-700 border-sky-200',
    Quoted: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Completed: 'bg-navy-100 text-navy-700 border-navy-200',
    Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'In Transit': 'bg-sky-50 text-sky-700 border-sky-200',
    Maintenance: 'bg-orange-50 text-orange-700 border-orange-200',
    Unavailable: 'bg-red-50 text-red-700 border-red-200',
  };

  return styles[status] || 'bg-navy-100 text-navy-700 border-navy-200';
};
