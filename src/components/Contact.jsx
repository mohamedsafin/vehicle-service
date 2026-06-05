import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          {/* Info panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8 text-left">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-heading font-extrabold text-[11px] sm:text-xs uppercase tracking-widest text-orange-primary">
                Get In Touch
              </h2>
              <p className="font-heading font-extrabold text-2xl sm:text-4xl text-navy-900 dark:text-white tracking-tight">
                Connect With Our Logistics Hubs
              </p>
              <p className="text-navy-600 dark:text-navy-300 text-sm sm:text-base font-normal leading-relaxed">
                Have an inquiry about routing networks, APIs, contract logistics, or volume brokerages? Contact our dispatch offices directly.
              </p>
            </div>

            {/* Direct contact channels */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-navy-55 rounded-xl text-orange-primary border border-navy-200/35 dark:bg-navy-900 dark:border-navy-800">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-2xs font-extrabold text-navy-450 uppercase tracking-wider">Enterprise Dispatch</p>
                  <p className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white font-mono">+1 (800) 555-FLOW</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-navy-55 rounded-xl text-orange-primary border border-navy-200/35 dark:bg-navy-900 dark:border-navy-800">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-2xs font-extrabold text-navy-450 uppercase tracking-wider">Brokerage Intake</p>
                  <p className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white font-mono">dispatch@logixflow.net</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-navy-55 rounded-xl text-orange-primary border border-navy-200/35 dark:bg-navy-900 dark:border-navy-800">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-2xs font-extrabold text-navy-450 uppercase tracking-wider">Global Headquarters</p>
                  <p className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white">
                    42 Wall Street, Terminal 4B, New York, NY
                  </p>
                </div>
              </div>
            </div>

            {/* Micro map container */}
            <div className="relative h-32 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden border border-navy-200/40 dark:border-navy-800 bg-navy-50 dark:bg-navy-900 flex items-center justify-center">
              {/* Graphic map lines representing flight paths */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 20 80 Q 150 20 280 60 T 400 30" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="4" />
                  <path d="M 50 120 Q 200 40 380 130" fill="none" stroke="#F97316" strokeWidth="1.5" strokeDasharray="3" />
                  <circle cx="280" cy="60" r="4" fill="#F97316" />
                  <circle cx="150" cy="20" r="3" fill="#64748B" />
                  <circle cx="380" cy="130" r="5" fill="#F97316" />
                </svg>
              </div>
              <div className="relative text-center p-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-orange-primary mx-auto mb-1.5 sm:mb-2 animate-bounce" />
                <span className="text-xs font-bold text-navy-900 dark:text-white block">Main Control Terminal</span>
                <span className="text-3xs text-navy-500 block mt-0.5">Latitude 40.7128° N, Longitude 74.0060° W</span>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-7 w-full">
            <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-navy-200/30 dark:border-navy-800 shadow-xl h-full flex flex-col justify-center">
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-navy-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-navy-500 mb-4 sm:mb-6">
                Fill out the secure communication form below, and an operational agent will reach out in under 15 minutes.
              </p>

              {submitted ? (
                <div className="p-5 sm:p-8 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/30 rounded-2xl text-center space-y-2 animate-in zoom-in-95 duration-200">
                  <span className="text-2xl">✉️</span>
                  <h4 className="font-heading font-bold text-base text-emerald-800 dark:text-emerald-400">Message Dispatched!</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500">Telemetry connection open. A dispatcher will ping your address shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold text-navy-450 uppercase tracking-wide">Business Email</label>
                    <input 
                      type="email"
                      id="contact-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-navy-950 text-navy-900 dark:text-white rounded-xl text-xs sm:text-sm border border-navy-200 dark:border-navy-800 focus:border-orange-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-bold text-navy-450 uppercase tracking-wide">How can we help?</label>
                    <textarea 
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your freight, volume demands, or transit questions..."
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-navy-950 text-navy-900 dark:text-white rounded-xl text-xs sm:text-sm border border-navy-200 dark:border-navy-800 focus:border-orange-primary focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-navy-900 hover:bg-navy-800 dark:bg-orange-primary dark:hover:bg-orange-dark text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
