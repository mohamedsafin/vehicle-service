export default function StatCard({ title, value, icon: Icon, tone = 'navy', detail }) {
  const tones = {
    navy: 'bg-navy-950 text-white',
    orange: 'bg-orange-primary text-white',
    emerald: 'bg-emerald-600 text-white',
    sky: 'bg-sky-600 text-white',
  };

  return (
    <div className="rounded-2xl border border-navy-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-navy-500">{title}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-navy-950">{value}</p>
          {detail && <p className="mt-2 text-xs font-semibold text-navy-400">{detail}</p>}
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
