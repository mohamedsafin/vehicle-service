import { useEffect, useState } from 'react';
import { Eye, Mail, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import { EmptyBlock, ErrorBlock, LoadingBlock } from '../components/StateBlock';
import { adminApi } from '../services/adminApi';
import { getErrorMessage } from '../services/api';
import { formatDateTime } from '../utils/format';

export default function ContactMessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadContacts = async ({ showLoading = false } = {}) => {
    if (showLoading) setIsLoading(true);
    try {
      const response = await adminApi.contacts();
      setContacts(response.data.data);
      setError('');
    } catch (contactError) {
      setError(getErrorMessage(contactError, 'Unable to load contact messages'));
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialContacts = async () => {
      try {
        const response = await adminApi.contacts();
        if (!isMounted) return;
        setContacts(response.data.data);
      } catch (contactError) {
        if (isMounted) setError(getErrorMessage(contactError, 'Unable to load contact messages'));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadInitialContacts();
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this contact message?')) return;

    try {
      await adminApi.deleteContact(id);
      await loadContacts({ showLoading: true });
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, 'Unable to delete message'));
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Inbox"
        title="Contact Messages"
        description="Review customer messages submitted through the website contact form."
      />

      {error && <div className="mb-5"><ErrorBlock message={error} /></div>}
      {isLoading ? (
        <LoadingBlock label="Loading contact messages" />
      ) : contacts.length === 0 ? (
        <EmptyBlock description="New contact form submissions will appear here." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-navy-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-navy-200 text-left text-sm">
              <thead className="bg-navy-50 text-xs font-black uppercase tracking-wide text-navy-500">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="transition hover:bg-orange-light/50">
                    <td className="px-5 py-4 font-black text-navy-950">{contact.name}</td>
                    <td className="px-5 py-4 font-semibold text-navy-600">{contact.email}</td>
                    <td className="px-5 py-4 text-navy-600">{contact.phone || 'Not provided'}</td>
                    <td className="max-w-sm truncate px-5 py-4 text-navy-600">{contact.message}</td>
                    <td className="px-5 py-4 text-navy-500">{formatDateTime(contact.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedMessage(contact)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-navy-200 text-navy-600 transition hover:border-orange-primary hover:text-orange-primary"
                          aria-label="View message"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteContact(contact._id)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                          aria-label="Delete message"
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
        </div>
      )}

      {selectedMessage && (
        <Modal title="Contact Message" onClose={() => setSelectedMessage(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-navy-200 bg-navy-50 p-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-primary text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-black text-navy-950">{selectedMessage.name}</p>
                <p className="text-sm font-semibold text-navy-500">{selectedMessage.email}</p>
              </div>
            </div>
            <div className="rounded-xl border border-navy-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-wide text-navy-400">Phone</p>
              <p className="mt-1 text-sm font-bold text-navy-950">{selectedMessage.phone || 'Not provided'}</p>
            </div>
            <div className="rounded-xl border border-navy-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-wide text-navy-400">Message</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-navy-700">{selectedMessage.message}</p>
            </div>
            <p className="text-xs font-bold text-navy-400">{formatDateTime(selectedMessage.createdAt)}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
