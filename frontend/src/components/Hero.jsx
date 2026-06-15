import { MapPin, BarChart3, Clock, ArrowRight, CheckCircle2, Zap, Shield } from 'lucide-react';
import LogisticsAnimation from './LogisticsAnimation';

export default function Hero({ onGetQuote }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-white via-navy-50/30 to-white dark:from-navy-950 dark:via-navy-900/50 dark:to-navy-950 transition-colors duration-300">
      {/* Dynamic animated background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-primary/15 via-orange-primary/5 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-navy-400/10 dark:from-navy-400/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
          backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Content */}
        <div className="py-2 sm:py-6 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-3 sm:space-y-6 lg:space-y-8">
              {/* Badge with enhanced styling */}
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 bg-gradient-to-r from-orange-50 to-orange-50/50 dark:from-orange-primary/10 dark:to-orange-primary/5 border border-orange-200/60 dark:border-orange-primary/30 rounded-full hover:border-orange-300 dark:hover:border-orange-primary/50 transition-all duration-300 group cursor-pointer">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gradient-to-r from-orange-primary to-orange-600 rounded-full animate-pulse"></div>
                <span className="text-[11px] sm:text-sm font-bold text-orange-900 dark:text-orange-200">
                  🚀 Trusted Logistics Leader
                </span>
              </div>

              {/* Headline with better typography */}
              <div className="space-y-2 sm:space-y-5">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-black leading-[1.15] text-navy-900 dark:text-white tracking-tight">
                  Reliable Logistics for <br />
                  <span className="relative">
                    <span className="relative text-[#093F6D] dark:text-[#E8F1FA]">
                      Modern Businesses
                    </span>
                  </span>
                </h1>
                <p className="text-xs sm:text-base lg:text-lg text-navy-600 dark:text-navy-200 max-w-lg leading-relaxed font-medium">
                  Delivering goods safely and efficiently with a modern fleet, real-time tracking, and nationwide coverage.
                </p>
              </div>

              {/* CTA Buttons with enhanced styling */}
              <div className="flex flex-row gap-2 sm:gap-4 pt-2 sm:pt-6">
                <button
                  onClick={onGetQuote}
                  className="group relative flex-1 px-4 sm:px-8 py-2.5 sm:py-4 bg-[#093F6D] hover:bg-[#052f52] text-white font-bold text-xs sm:text-base rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#093F6D]/40 hover:-translate-y-1 active:translate-y-0 cursor-pointer overflow-hidden"
                >
                  <span className="relative flex items-center gap-2">
                    Get a Quote
                    <ArrowRight className="w-3.5 sm:w-5 h-3.5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                <button
                  onClick={() => {
                    const section = document.getElementById('contact');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex-1 px-4 sm:px-8 py-2.5 sm:py-4 border-2 border-navy-300 dark:border-navy-600 hover:border-orange-primary dark:hover:border-orange-primary bg-white/50 dark:bg-navy-900/50 hover:bg-gradient-to-r hover:from-orange-50 dark:hover:from-orange-primary/5 hover:to-white dark:hover:to-navy-900 text-navy-900 dark:text-white font-bold text-xs sm:text-base rounded-xl transition-all duration-300 backdrop-blur-sm cursor-pointer"
                >
                  Contact Us
                </button>
              </div>

              {/* Enhanced Trust Points */}
              <div className="grid grid-cols-3 gap-2 sm:gap-5 pt-4 sm:pt-10 border-t border-navy-200/40 dark:border-navy-800/60">
                <div className="group flex flex-col items-start gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-orange-50/40 dark:hover:bg-orange-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-orange-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm">Nationwide</h3>
                  </div>
                  <p className="text-xs text-navy-600 dark:text-navy-400 line-clamp-1">All regions</p>
                </div>
                <div className="group flex flex-col items-start gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-orange-50/40 dark:hover:bg-orange-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-orange-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm">Real-Time</h3>
                  </div>
                  <p className="text-xs text-navy-600 dark:text-navy-400 line-clamp-1">Live GPS</p>
                </div>
                <div className="group flex flex-col items-start gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-orange-50/40 dark:hover:bg-orange-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-orange-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm">24/7 Support</h3>
                  </div>
                  <p className="text-xs text-navy-600 dark:text-navy-400 line-clamp-1">Always on</p>
                </div>
              </div>
            </div>

            {/* Right Column - Visual with Enhanced Effects */}
            <div className="relative min-h-[220px] sm:min-h-[400px] lg:min-h-[460px] flex items-center justify-center overflow-visible">
              {/* Animated floating elements - hidden on mobile */}
              <div className="absolute inset-0 z-20 pointer-events-none hidden sm:block">
                {/* Floating card 1 */}
                <div 
                  className="absolute top-6 right-2 sm:right-8 p-3 sm:p-4 bg-white/95 dark:bg-navy-900/95 rounded-2xl shadow-xl border border-navy-200 dark:border-navy-700 backdrop-blur-sm animate-bounce" 
                  style={{ animation: 'bounce 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <BarChart3 className="w-3 sm:w-4 h-3 sm:h-4 text-orange-primary" />
                    <span className="text-navy-900 dark:text-white text-xs">5000+ Deliveries</span>
                  </div>
                </div>

                {/* Floating card 2 */}
                <div 
                  className="absolute bottom-24 left-2 sm:left-6 lg:bottom-28 lg:-left-10 p-3 sm:p-4 bg-white/95 dark:bg-navy-900/95 rounded-2xl shadow-xl border border-navy-200 dark:border-navy-700 backdrop-blur-sm" 
                  style={{ animation: 'float 6s ease-in-out infinite' }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle2 className="w-3 sm:w-4 h-3 sm:h-4 text-green-500" />
                    <span className="text-navy-900 dark:text-white text-xs">98% On-Time</span>
                  </div>
                </div>
              </div>

              {/* Main Truck Container */}
              <div className="relative z-10 w-full flex items-center justify-center px-4 py-2">
                <div className="relative w-full max-w-[260px] sm:max-w-md">
                  {/* Gradient background container */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/10 via-orange-primary/5 to-transparent rounded-3xl blur-2xl"></div>
                  
                  {/* Main container */}
                  <div className="relative w-full bg-gradient-to-br from-navy-50 via-white to-navy-50/50 dark:from-navy-900/80 dark:via-navy-800 dark:to-navy-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-navy-200/60 dark:border-navy-700/60 p-2.5 sm:p-4 flex items-center justify-center group hover:shadow-3xl hover:shadow-orange-primary/20 transition-all duration-500">
                    
                    {/* Decorative top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-primary to-transparent opacity-60"></div>

                    {/* 3D Logistics Animation */}
                    <div className="w-full flex items-center justify-center relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-navy-50/50 dark:from-navy-950 dark:to-navy-900 p-2 sm:p-4">
                      <LogisticsAnimation />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Section */}
        <div className="py-5 sm:py-12 lg:py-20 border-t border-navy-200/40 dark:border-navy-800/60">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {/* Stat Card 1 */}
            <div className="group relative p-3 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-navy-50/30 dark:from-navy-900/60 dark:to-navy-950 rounded-xl sm:rounded-2xl border border-navy-200/50 dark:border-navy-700/50 shadow-lg hover:shadow-2xl hover:shadow-orange-primary/20 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 group-hover:from-orange-primary/5 to-transparent transition-all duration-300 pointer-events-none"></div>
              <div className="relative flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-primary/20 dark:to-orange-primary/10 rounded-lg group-hover:scale-125 transition-transform duration-300">
                  <BarChart3 className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-orange-primary" />
                </div>
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-5xl font-black text-navy-900 dark:text-white mb-1 sm:mb-2">5000+</h3>
              <p className="text-xs sm:text-sm lg:text-base text-navy-600 dark:text-navy-300 font-semibold">Deliveries</p>
            </div>

            {/* Stat Card 2 */}
            <div className="group relative p-3 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-navy-50/30 dark:from-navy-900/60 dark:to-navy-950 rounded-xl sm:rounded-2xl border border-navy-200/50 dark:border-navy-700/50 shadow-lg hover:shadow-2xl hover:shadow-orange-primary/20 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 group-hover:from-orange-primary/5 to-transparent transition-all duration-300 pointer-events-none"></div>
              <div className="relative flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-primary/20 dark:to-green-primary/10 rounded-lg group-hover:scale-125 transition-transform duration-300">
                  <CheckCircle2 className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-5xl font-black text-navy-900 dark:text-white mb-1 sm:mb-2">98%</h3>
              <p className="text-xs sm:text-sm lg:text-base text-navy-600 dark:text-navy-300 font-semibold">On-Time</p>
            </div>

            {/* Stat Card 3 */}
            <div className="group relative p-3 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-navy-50/30 dark:from-navy-900/60 dark:to-navy-950 rounded-xl sm:rounded-2xl border border-navy-200/50 dark:border-navy-700/50 shadow-lg hover:shadow-2xl hover:shadow-orange-primary/20 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 group-hover:from-orange-primary/5 to-transparent transition-all duration-300 pointer-events-none"></div>
              <div className="relative flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-primary/20 dark:to-blue-primary/10 rounded-lg group-hover:scale-125 transition-transform duration-300">
                  <MapPin className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-5xl font-black text-navy-900 dark:text-white mb-1 sm:mb-2">50+</h3>
              <p className="text-xs sm:text-sm lg:text-base text-navy-600 dark:text-navy-300 font-semibold">Vehicles</p>
            </div>

            {/* Stat Card 4 */}
            <div className="group relative p-3 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-navy-50/30 dark:from-navy-900/60 dark:to-navy-950 rounded-xl sm:rounded-2xl border border-navy-200/50 dark:border-navy-700/50 shadow-lg hover:shadow-2xl hover:shadow-orange-primary/20 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 group-hover:from-orange-primary/5 to-transparent transition-all duration-300 pointer-events-none"></div>
              <div className="relative flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-primary/20 dark:to-purple-primary/10 rounded-lg group-hover:scale-125 transition-transform duration-300">
                  <Clock className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-5xl font-black text-navy-900 dark:text-white mb-1 sm:mb-2">10+</h3>
              <p className="text-xs sm:text-sm lg:text-base text-navy-600 dark:text-navy-300 font-semibold">Years</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}
