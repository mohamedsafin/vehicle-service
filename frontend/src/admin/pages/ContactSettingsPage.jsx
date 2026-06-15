import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminApi';
import { getErrorMessage } from '../services/api';
import PageHeader from '../components/PageHeader';
import { AlertCircle, CheckCircle, Loader2, Save } from 'lucide-react';

export default function ContactSettingsPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    address: '',
    workingHours: '',
    whatsappNumber: '',
    googleMapsEmbedUrl: '',
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPass: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await adminApi.getContactSettings();
        if (response.data?.success) {
          const { data } = response.data;
          setFormData({
            companyName: data.companyName || '',
            phone: data.phone || '',
            email: data.email || '',
            address: data.address || '',
            workingHours: data.workingHours || '',
            whatsappNumber: data.whatsappNumber || '',
            googleMapsEmbedUrl: data.googleMapsEmbedUrl || '',
            smtpHost: data.smtpHost || '',
            smtpPort: data.smtpPort || '',
            smtpUser: data.smtpUser || '',
            smtpPass: data.smtpPass || '',
          });
        }
      } catch (error) {
        setMessage({
          type: 'error',
          text: getErrorMessage(error, 'Failed to fetch contact settings'),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await adminApi.updateContactSettings(formData);
      if (response.data?.success) {
        setMessage({
          type: 'success',
          text: 'Contact settings updated successfully and are now live!',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: getErrorMessage(error, 'Failed to update contact settings'),
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Configuration"
        title="Contact Settings"
        description="Configure public support contacts, WhatsApp links, and Google Maps embed dynamically."
      />

      {message.text && (
        <div
          className={`flex items-center gap-3 rounded-xl border p-4 text-sm font-bold ${
            message.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-navy-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-navy-950">Company Information</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  Company Name
                </span>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Haulier & Service"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  Phone Number
                </span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. +91 98765 43210"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. operations@haulierandservice.com"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  Office Address
                </span>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ramanathapuram, Tamil Nadu, India"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  Working Hours
                </span>
                <input
                  type="text"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Monday - Saturday 9:00 AM - 7:00 PM"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-navy-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-navy-950">Integrations & Support Channels</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  WhatsApp Contact Number
                </span>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  required
                  placeholder="e.g. +919876543210 (include country code)"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  Google Maps Embed URL (iframe src)
                </span>
                <textarea
                  name="googleMapsEmbedUrl"
                  value={formData.googleMapsEmbedUrl}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Paste the Google Maps iframe src URL (starts with https://www.google.com/maps/embed...)"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10 resize-none font-mono text-xs"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-navy-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-navy-950">Email & SMTP Configuration</h3>
            <p className="text-xs font-semibold text-navy-500 leading-relaxed">
              Configure SMTP credentials for outgoing quote confirmation emails. If left blank, settings will fall back to environment variables or Ethereal test accounts.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  SMTP Host
                </span>
                <input
                  type="text"
                  name="smtpHost"
                  value={formData.smtpHost}
                  onChange={handleChange}
                  placeholder="e.g. smtp.gmail.com"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  SMTP Port
                </span>
                <input
                  type="number"
                  name="smtpPort"
                  value={formData.smtpPort}
                  onChange={handleChange}
                  placeholder="e.g. 587"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  SMTP Username
                </span>
                <input
                  type="text"
                  name="smtpUser"
                  value={formData.smtpUser}
                  onChange={handleChange}
                  placeholder="e.g. business-email@gmail.com"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">
                  SMTP Password
                </span>
                <input
                  type="password"
                  name="smtpPass"
                  value={formData.smtpPass}
                  onChange={handleChange}
                  placeholder="SMTP App Password"
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/10"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-orange-primary px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Changes
            </button>
          </div>
        </form>

        {/* Live Preview Sidebar */}
        <div className="space-y-4 lg:col-span-5">
          <div className="rounded-2xl border border-navy-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-navy-950 mb-4">Live Preview</h3>
            
            <div className="border border-navy-100 rounded-2xl overflow-hidden shadow-inner p-4 bg-navy-50/50 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-orange-primary">
                  {formData.companyName || 'Haulier & Service'}
                </p>
                <h4 className="text-base font-black text-navy-950">Contact Information</h4>
              </div>

              {/* Cards layout preview */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="rounded-xl border border-navy-200 bg-white p-3 shadow-sm">
                  <span className="text-lg">📞</span>
                  <p className="text-[10px] font-black text-navy-400 mt-1 uppercase">Call Us</p>
                  <p className="text-xs font-bold text-navy-900 break-all">{formData.phone || 'N/A'}</p>
                </div>
                <div className="rounded-xl border border-navy-200 bg-white p-3 shadow-sm">
                  <span className="text-lg">📧</span>
                  <p className="text-[10px] font-black text-navy-400 mt-1 uppercase">Email Us</p>
                  <p className="text-xs font-bold text-navy-900 break-all">{formData.email || 'N/A'}</p>
                </div>
                <div className="rounded-xl border border-navy-200 bg-white p-3 shadow-sm">
                  <span className="text-lg">📍</span>
                  <p className="text-[10px] font-black text-navy-400 mt-1 uppercase">Office Address</p>
                  <p className="text-xs font-bold text-navy-900 break-all">{formData.address || 'N/A'}</p>
                </div>
                <div className="rounded-xl border border-navy-200 bg-white p-3 shadow-sm">
                  <span className="text-lg">🕒</span>
                  <p className="text-[10px] font-black text-navy-400 mt-1 uppercase">Working Hours</p>
                  <p className="text-xs font-bold text-navy-900 break-all">{formData.workingHours || 'N/A'}</p>
                </div>
              </div>

              {/* Map embed preview container */}
              <div className="h-32 bg-navy-200 rounded-xl overflow-hidden flex items-center justify-center relative border border-navy-200">
                {formData.googleMapsEmbedUrl ? (
                  <div className="absolute inset-0 bg-emerald-50 flex items-center justify-center">
                    <span className="text-2xs font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-2 py-1 rounded-md border border-emerald-200 shadow-sm">
                      Google Maps Configured
                    </span>
                  </div>
                ) : (
                  <span className="text-2xs font-black text-navy-400 uppercase">Map preview unavailable</span>
                )}
              </div>

              {/* Buttons preview */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled
                  className="rounded-xl bg-[#25D366] text-white py-2 text-xs font-black shadow-sm"
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  disabled
                  className="rounded-xl bg-orange-primary text-white py-2 text-xs font-black shadow-sm"
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
