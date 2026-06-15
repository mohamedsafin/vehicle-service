import { useState } from 'react';
import { Waypoints, Mail, Globe, ArrowRight } from 'lucide-react';

const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer({ onScrollToSection }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-navy-950 text-navy-300 border-t border-navy-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start text-left">
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="p-1.5 sm:p-2 bg-orange-primary rounded-lg sm:rounded-xl text-white shadow-sm flex items-center justify-center">
                <Waypoints className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white">
                Haulier & <span className="text-orange-primary">Service</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-navy-400 max-w-sm font-normal leading-relaxed">
              Moving enterprise cargo across air, ocean, and highways. Driven by digital precision, IoT telemetry tracking, and sustainable fuels.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 bg-navy-900 hover:bg-navy-800 text-navy-400 hover:text-white rounded-xl transition-colors border border-navy-800" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-navy-900 hover:bg-navy-800 text-navy-400 hover:text-white rounded-xl transition-colors border border-navy-800" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-navy-900 hover:bg-navy-800 text-navy-400 hover:text-white rounded-xl transition-colors border border-navy-800" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-navy-400">
              <li><button onClick={() => onScrollToSection('services')} className="hover:text-orange-primary transition-colors cursor-pointer">Air Freight</button></li>
              <li><button onClick={() => onScrollToSection('services')} className="hover:text-orange-primary transition-colors cursor-pointer">Ocean Carriers</button></li>
              <li><button onClick={() => onScrollToSection('services')} className="hover:text-orange-primary transition-colors cursor-pointer">Land Linehaul</button></li>
              <li><button onClick={() => onScrollToSection('services')} className="hover:text-orange-primary transition-colors cursor-pointer">Warehousing</button></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-navy-400">
              <li><a href="#" className="hover:text-orange-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-primary transition-colors">Press room</a></li>
              <li><a href="#" className="hover:text-orange-primary transition-colors">Sustainability</a></li>
              <li><button onClick={() => onScrollToSection('contact')} className="hover:text-orange-primary transition-colors cursor-pointer">Contact Support</button></li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="md:col-span-4 space-y-3 sm:space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Subscribe to Cargo Updates</h4>
            <p className="text-xs sm:text-sm text-navy-400 font-normal leading-relaxed">
              Get monthly newsletters detailing capacity forecasts, fuel pricing shifts, and global shipping guidelines.
            </p>

            {subscribed ? (
              <div className="p-3 bg-orange-primary/10 border border-orange-primary/20 rounded-xl text-xs text-orange-primary font-bold animate-in fade-in duration-200">
                Email added to newsletter dispatch!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-550" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter business email"
                    className="w-full pl-9 pr-3 py-2.5 bg-navy-900 border border-navy-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-primary transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-orange-primary hover:bg-orange-dark text-white font-bold rounded-xl text-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  Join
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright strip */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-8 border-t border-navy-900 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-navy-500">
          <p>© {new Date().getFullYear()} Haulier & Service Solutions Inc. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Carrier Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
