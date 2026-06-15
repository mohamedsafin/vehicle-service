import { useEffect, useState } from 'react';
import { BarChart3, CheckCircle2, MapPinned, Route, Truck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { ErrorBlock, LoadingBlock } from '../components/StateBlock';
import { adminApi } from '../services/adminApi';
import { getErrorMessage } from '../services/api';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await adminApi.analytics();
        setAnalytics(response.data.data);
      } catch (analyticsError) {
        setError(getErrorMessage(analyticsError, 'Unable to load analytics'));
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (isLoading) return <LoadingBlock label="Loading analytics" />;
  if (error) return <ErrorBlock message={error} />;

  const maxMonthly = Math.max(...analytics.monthlyQuotes.map((item) => item.count), 1);

  return (
    <div>
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="Track quote demand, popular routes, requested vehicles, and conversion performance."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Quote Requests" value={analytics.totalQuotes} icon={BarChart3} tone="navy" />
        <StatCard title="Most Requested Route" value={analytics.mostRequestedRoute[1]} icon={Route} tone="orange" detail={analytics.mostRequestedRoute[0]} />
        <StatCard title="Top Vehicle Type" value={analytics.mostRequestedVehicleType[1]} icon={Truck} tone="sky" detail={analytics.mostRequestedVehicleType[0]} />
        <StatCard title="Conversion Rate" value={`${analytics.conversionRate}%`} icon={CheckCircle2} tone="emerald" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-2xl border border-navy-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-navy-950">Monthly Quotes</h3>
              <p className="text-sm text-navy-500">Quote request volume by month.</p>
            </div>
            <BarChart3 className="h-5 w-5 text-orange-primary" />
          </div>
          <div className="space-y-4">
            {analytics.monthlyQuotes.length === 0 ? (
              <p className="text-sm font-semibold text-navy-500">No monthly quote data yet.</p>
            ) : (
              analytics.monthlyQuotes.map((item) => (
                <div key={item.month}>
                  <div className="mb-2 flex justify-between text-sm font-black">
                    <span>{item.month}</span>
                    <span>{item.count}</span>
                  </div>
                  <div className="h-3 rounded-full bg-navy-100">
                    <div
                      className="h-3 rounded-full bg-orange-primary transition-all"
                      style={{ width: `${Math.max((item.count / maxMonthly) * 100, 8)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-navy-200 bg-navy-950 p-5 text-white shadow-sm">
          <MapPinned className="h-8 w-8 text-orange-primary" />
          <h3 className="mt-5 text-xl font-black">Demand Intelligence</h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-navy-300">Most Requested Route</p>
              <p className="mt-2 text-sm font-bold">{analytics.mostRequestedRoute[0]}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-navy-300">Most Requested Vehicle Type</p>
              <p className="mt-2 text-sm font-bold">{analytics.mostRequestedVehicleType[0]}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-navy-300">Converted Quotes</p>
              <p className="mt-2 text-2xl font-black">{analytics.convertedQuotes}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
