import { Globe, Users, Shield, Rocket } from 'lucide-react';

const STATS = [
  {
    icon: Globe,
    value: '50+',
    label: 'Countries Covered',
    desc: 'Bespoke global distribution corridors.'
  },
  {
    icon: Rocket,
    value: '1.2M+',
    label: 'Annual Deliveries',
    desc: 'High-volume container and parcel processing.'
  },
  {
    icon: Shield,
    value: '99.8%',
    label: 'On-Time Telemetry',
    desc: 'Uncompromising schedule precision.'
  },
  {
    icon: Users,
    value: '450+',
    label: 'Enterprise Clients',
    desc: 'Serving Fortune 500 logistics structures.'
  }
];

export default function Stats() {
  return (
    <section id="metrics" className="py-10 sm:py-16 bg-navy-900 text-white relative overflow-hidden transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="group flex flex-col items-center text-center p-4 sm:p-6 bg-navy-800/40 hover:bg-navy-800/60 rounded-xl sm:rounded-2xl border border-navy-800 hover:border-orange-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-2 sm:p-3 bg-navy-800 text-orange-primary rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-orange-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                <h3 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white font-mono tracking-tight">
                  {stat.value}
                </h3>
                
                <p className="text-xs sm:text-sm font-bold text-navy-200 mt-1.5 sm:mt-2">
                  {stat.label}
                </p>
                
                <p className="hidden sm:block text-2xs text-navy-400 mt-1 max-w-[180px]">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
