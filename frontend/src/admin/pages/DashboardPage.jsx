import { useEffect, useState } from 'react';
import { CheckCircle2, Clock3, MessageSquareText, PhoneCall, TrendingUp, Truck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { EmptyBlock, ErrorBlock, LoadingBlock } from '../components/StateBlock';
import { adminApi } from '../services/adminApi';
import { getErrorMessage } from '../services/api';
import { formatDate, statusClass } from '../utils/format';

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [analyticsResponse, quotesResponse] = await Promise.all([
          adminApi.analytics(),
          adminApi.quotes({ limit: 6 }),
        ]);

        setAnalytics(analyticsResponse.data.data);
        setQuotes(quotesResponse.data.data);
      } catch (dashboardError) {
        setError(getErrorMessage(dashboardError, 'Unable to load dashboard'));
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (isLoading) return <LoadingBlock />;
  if (error) return <ErrorBlock message={error} />;

  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Dashboard Overview"
        description="Live operational snapshot for quote activity, customer messages, and conversions."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Quotes" value={analytics.totalQuotes} icon={Truck} tone="navy" />
        <StatCard title="Pending Quotes" value={analytics.pendingQuotes} icon={Clock3} tone="orange" />
        <StatCard title="Contacted Quotes" value={analytics.contactedQuotes} icon={PhoneCall} tone="sky" />
        <StatCard title="Converted Quotes" value={analytics.convertedQuotes} icon={CheckCircle2} tone="emerald" />
        <StatCard title="Total Messages" value={analytics.totalMessages} icon={MessageSquareText} tone="navy" />
      </div>

      <section className="mt-8 rounded-2xl border border-navy-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-navy-200 px-5 py-4">
          <div>
            <h3 className="text-lg font-black text-navy-950">Recent Quote Requests</h3>
            <p className="text-sm text-navy-500">Latest customer transport inquiries from MongoDB Atlas.</p>
          </div>
          <TrendingUp className="h-5 w-5 text-orange-primary" />
        </div>

        {quotes.length === 0 ? (
          <div className="p-5">
            <EmptyBlock description="New quote requests will appear here as soon as customers submit them." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-navy-200 text-left text-sm">
              <thead className="bg-navy-50 text-xs font-black uppercase tracking-wide text-navy-500">
                <tr>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Pickup</th>
                  <th className="px-5 py-3">Drop</th>
                  <th className="px-5 py-3">Vehicle</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {quotes.map((quote) => (
                  <tr key={quote._id} className="transition hover:bg-orange-light/50">
                    <td className="px-5 py-4 font-black text-navy-950">{quote.name}</td>
                    <td className="px-5 py-4 font-semibold text-navy-600">{quote.phone}</td>
                    <td className="px-5 py-4 text-navy-600">{quote.pickupLocation}</td>
                    <td className="px-5 py-4 text-navy-600">{quote.dropLocation}</td>
                    <td className="px-5 py-4 text-navy-600">{quote.vehicleType}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${statusClass(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-navy-500">{formatDate(quote.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
