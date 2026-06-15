import { useEffect, useState } from 'react';
import axios from 'axios';
import { Phone, Mail, MapPin, Clock, MessageSquare, Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function Contact() {
  const [settings, setSettings] = useState({
    companyName: 'Haulier & Service',
    phone: '+91 98765 43210',
    email: 'operations@haulierandservice.com',
    address: 'Ramanathapuram, Tamil Nadu',
    workingHours: 'Mon - Sat: 9AM - 7PM',
    whatsappNumber: '+919876543210',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125766.19658607147!2d78.75168019313936!3d9.36870024921609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01b3de33f6df23%3A0x8e83344cb8dcff!2sRamanathapuram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactSettings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/settings/contact`);
        if (response.data?.success && response.data?.data) {
          setSettings(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load contact settings, using fallback values.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactSettings();
  }, []);

  const whatsappLink = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`;

  return (
    <section id="contact" className="py-14 sm:py-20 bg-navy-50/50 dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-heading font-extrabold text-[11px] sm:text-xs uppercase tracking-widest text-orange-primary">
            {settings.companyName} Support
          </h2>
          <p className="font-heading font-extrabold text-2xl sm:text-4xl text-navy-900 dark:text-white tracking-tight">
            Contact Information & Support
          </p>
          <p className="text-navy-600 dark:text-navy-300 text-sm sm:text-base font-normal leading-relaxed">
            Get in touch with our operations desk for immediate assistance regarding dispatch, booking, and logistics planning.
          </p>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-orange-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Cards Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Call Us */}
              <a 
                href={`tel:${settings.phone}`}
                className="group flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-navy-900 rounded-2xl border border-navy-200/50 dark:border-navy-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-primary/30 text-left"
              >
                <div>
                  <div className="inline-flex p-3 bg-orange-primary/10 rounded-xl text-orange-primary mb-4 transition group-hover:scale-110">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-navy-450 uppercase tracking-wide">📞 Call Us</h3>
                  <p className="mt-2 text-sm sm:text-base font-bold text-navy-900 dark:text-white font-mono break-all">
                    {settings.phone}
                  </p>
                </div>
                <span className="mt-4 text-xs font-extrabold text-orange-primary group-hover:underline flex items-center gap-1">
                  Place call &rarr;
                </span>
              </a>

              {/* Email Us */}
              <a 
                href={`mailto:${settings.email}`}
                className="group flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-navy-900 rounded-2xl border border-navy-200/50 dark:border-navy-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-primary/30 text-left"
              >
                <div>
                  <div className="inline-flex p-3 bg-orange-primary/10 rounded-xl text-orange-primary mb-4 transition group-hover:scale-110">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-navy-450 uppercase tracking-wide">📧 Email Us</h3>
                  <p className="mt-2 text-sm sm:text-base font-bold text-navy-900 dark:text-white break-all">
                    {settings.email}
                  </p>
                </div>
                <span className="mt-4 text-xs font-extrabold text-orange-primary group-hover:underline flex items-center gap-1">
                  Send email &rarr;
                </span>
              </a>

              {/* Office Address */}
              <div 
                className="flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-navy-900 rounded-2xl border border-navy-200/50 dark:border-navy-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-primary/30 text-left"
              >
                <div>
                  <div className="inline-flex p-3 bg-orange-primary/10 rounded-xl text-orange-primary mb-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-navy-450 uppercase tracking-wide">📍 Office Address</h3>
                  <p className="mt-2 text-sm sm:text-base font-bold text-navy-900 dark:text-white">
                    {settings.address}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div 
                className="flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-navy-900 rounded-2xl border border-navy-200/50 dark:border-navy-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-primary/30 text-left"
              >
                <div>
                  <div className="inline-flex p-3 bg-orange-primary/10 rounded-xl text-orange-primary mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-navy-450 uppercase tracking-wide">🕒 Working Hours</h3>
                  <p className="mt-2 text-sm sm:text-base font-bold text-navy-900 dark:text-white">
                    {settings.workingHours}
                  </p>
                </div>
              </div>

            </div>

            {/* Embed Map & Buttons Panel */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              {/* Google Maps embed container */}
              <div className="relative flex-grow min-h-[280px] rounded-2xl overflow-hidden border border-navy-200/50 dark:border-navy-800 shadow-sm bg-navy-50">
                {settings.googleMapsEmbedUrl ? (
                  <iframe
                    title="Office Location Map"
                    src={settings.googleMapsEmbedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-navy-400">
                    Map Location Loading...
                  </div>
                )}
              </div>

              {/* Support Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Chat Now Button */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-sm shadow-md shadow-[#25D366]/20 hover:shadow-lg transition cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  Chat on WhatsApp
                </a>

                {/* Call Now Button */}
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center justify-center gap-2 px-5 py-4 bg-orange-primary hover:bg-orange-dark text-white rounded-xl font-bold text-sm shadow-md shadow-orange-primary/20 hover:shadow-lg transition cursor-pointer"
                >
                  <Phone className="w-5 h-5" />
                  Call Now Desk
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
