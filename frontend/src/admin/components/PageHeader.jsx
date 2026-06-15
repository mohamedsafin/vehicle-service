export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-primary">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-navy-950 sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-navy-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
