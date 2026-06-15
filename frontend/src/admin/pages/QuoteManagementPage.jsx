import { useCallback, useEffect, useState } from 'react';
import { Eye, Search, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import { EmptyBlock, ErrorBlock, LoadingBlock } from '../components/StateBlock';
import { adminApi } from '../services/adminApi';
import { getErrorMessage } from '../services/api';
import { formatDateTime, statusClass } from '../utils/format';

const STATUSES = ['All', 'Pending', 'Contacted', 'Quoted', 'Confirmed', 'Completed'];

export default function QuoteManagementPage() {
  const [quotes, setQuotes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({ search: '', status: 'All', page: 1 });
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadQuotes = useCallback(async ({ showLoading = false } = {}) => {
    if (showLoading) setIsLoading(true);
    try {
      const response = await adminApi.quotes({
        search: filters.search,
        status: filters.status,
        page: filters.page,
        limit: 8,
      });
      setQuotes(response.data.data);
      setPagination(response.data.pagination);
      setError('');
    } catch (quoteError) {
      setError(getErrorMessage(quoteError, 'Unable to load quotes'));
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    let isMounted = true;

    const loadInitialQuotes = async () => {
      try {
        const response = await adminApi.quotes({
          search: filters.search,
          status: filters.status,
          page: filters.page,
          limit: 8,
        });
        if (!isMounted) return;
        setQuotes(response.data.data);
        setPagination(response.data.pagination);
        setError('');
      } catch (quoteError) {
        if (isMounted) setError(getErrorMessage(quoteError, 'Unable to load quotes'));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadInitialQuotes();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  const updateStatus = async (quoteId, status) => {
    const previousQuotes = quotes;
    setQuotes((current) => current.map((quote) => (quote._id === quoteId ? { ...quote, status } : quote)));

    try {
      await adminApi.updateQuoteStatus(quoteId, status);
      await loadQuotes({ showLoading: true });
    } catch (statusError) {
      setQuotes(previousQuotes);
      setError(getErrorMessage(statusError, 'Unable to update quote status'));
    }
  };

  const deleteQuote = async (quoteId) => {
    if (!window.confirm('Delete this quote request?')) return;

    try {
      await adminApi.deleteQuote(quoteId);
      await loadQuotes({ showLoading: true });
      if (selectedQuote?._id === quoteId) setSelectedQuote(null);
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, 'Unable to delete quote'));
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Requests"
        title="Quote Management"
        description="Search, filter, update, review, and remove customer quote requests."
      />

      <div className="mb-5 grid gap-3 rounded-2xl border border-navy-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_220px]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            type="search"
            value={filters.search}
            onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value, page: 1 }))}
            placeholder="Search customer, phone, route, or vehicle"
            className="w-full rounded-xl border border-navy-200 bg-navy-50 py-3 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-orange-primary focus:bg-white"
          />
        </label>
        <select
          value={filters.status}
          onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value, page: 1 }))}
          className="rounded-xl border border-navy-200 bg-navy-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-orange-primary focus:bg-white"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="mb-5"><ErrorBlock message={error} /></div>}
      {isLoading ? (
        <LoadingBlock label="Loading quote requests" />
      ) : quotes.length === 0 ? (
        <EmptyBlock description="Try changing your search or status filter." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-navy-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-navy-200 text-left text-sm">
              <thead className="bg-navy-50 text-xs font-black uppercase tracking-wide text-navy-500">
                <tr>
                  <th className="px-5 py-3">Customer Name</th>
                  <th className="px-5 py-3">Phone Number</th>
                  <th className="px-5 py-3">Pickup Location</th>
                  <th className="px-5 py-3">Drop Location</th>
                  <th className="px-5 py-3">Vehicle Type</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
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
                      <select
                        value={quote.status}
                        onChange={(event) => updateStatus(quote._id, event.target.value)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-black outline-none ${statusClass(quote.status)}`}
                      >
                        {STATUSES.filter((status) => status !== 'All').map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-navy-500">{formatDateTime(quote.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedQuote(quote)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-navy-200 text-navy-600 transition hover:border-orange-primary hover:text-orange-primary"
                          aria-label="View quote"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteQuote(quote._id)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                          aria-label="Delete quote"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-navy-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-navy-500">
              Showing page {pagination.page} of {pagination.pages}, {pagination.total} total quotes
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={filters.page <= 1}
                onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}
                className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-black text-navy-700 transition hover:border-orange-primary disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={filters.page >= pagination.pages}
                onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}
                className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-black text-navy-700 transition hover:border-orange-primary disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedQuote && (
        <Modal title="Quote Request Details" onClose={() => setSelectedQuote(null)}>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Customer Name', selectedQuote.name],
              ['Email', selectedQuote.email],
              ['Phone Number', selectedQuote.phone],
              ['Vehicle Type', selectedQuote.vehicleType],
              ['Pickup Location', selectedQuote.pickupLocation],
              ['Drop Location', selectedQuote.dropLocation],
              ['Status', selectedQuote.status],
              ['Date', formatDateTime(selectedQuote.createdAt)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-navy-200 bg-navy-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-navy-400">{label}</p>
                <p className="mt-1 text-sm font-bold text-navy-950">{value}</p>
              </div>
            ))}
            <div className="rounded-xl border border-navy-200 bg-navy-50 p-4 sm:col-span-2">
              <p className="text-xs font-black uppercase tracking-wide text-navy-400">Message</p>
              <p className="mt-2 text-sm leading-6 text-navy-700">{selectedQuote.message}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
