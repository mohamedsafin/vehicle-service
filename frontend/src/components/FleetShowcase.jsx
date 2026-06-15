import React, { useState } from 'react';
import { Box, TrendingUp, Package, Snowflake, Cog, Droplet, Navigation } from 'lucide-react';

const FLEETS = [
  {
    id: 'container',
    name: 'Container Trucks',
    icon: Box,
    tagline: 'Secure Box Transport Solutions',
    desc: 'Versatile container trucks designed for maximum load capacity and protection. Our container fleet handles various cargo types with weather-resistant containers and safety mechanisms for secure transport across all terrains.',
    specs: [
      { name: 'Payload Capacity', value: '20-25 Tons', detail: 'Standard containers' },
      { name: 'Container Size', value: '20/40 ft', detail: 'Multiple configurations' },
      { name: 'Coverage', value: 'All regions', detail: 'Interstate routes' },
      { name: 'Protection Level', value: 'Weatherproof', detail: 'Sealed containers' }
    ],
    highlight: 'Best for: General cargo, packaged goods, retail supplies, and containerized shipments.'
  },
  {
    id: 'flatbed',
    name: 'Flatbed Trucks',
    icon: TrendingUp,
    tagline: 'Heavy & Oversized Cargo Transport',
    desc: 'Purpose-built flatbed trailers for transporting heavy machinery, construction materials, and oversized loads. Equipped with tie-down systems and professional handlers for secure loading and transport.',
    specs: [
      { name: 'Payload Capacity', value: '20-30 Tons', detail: 'Heavy-duty rated' },
      { name: 'Platform Length', value: '40-60 ft', detail: 'Customizable setups' },
      { name: 'Load Type', value: 'Oversized items', detail: 'Machinery & materials' },
      { name: 'Special Feature', value: 'Tie-down systems', detail: 'Professional securing' }
    ],
    highlight: 'Best for: Construction equipment, industrial machinery, and oversized materials.'
  },
  {
    id: 'mini',
    name: 'Mini Trucks',
    icon: Package,
    tagline: 'Compact Urban Delivery Fleet',
    desc: 'Agile and fuel-efficient mini trucks perfect for urban distribution and small package deliveries. Ideal for navigating congested city streets while maintaining reliable delivery standards.',
    specs: [
      { name: 'Payload Capacity', value: '1-3 Tons', detail: 'Light cargo loads' },
      { name: 'Fuel Efficiency', value: 'Excellent', detail: 'City optimized' },
      { name: 'Maneuverability', value: 'High', detail: 'Urban streets' },
      { name: 'Delivery Time', value: 'Fast', detail: 'Quick turnaround' }
    ],
    highlight: 'Best for: Parcel delivery, small e-commerce shipments, and urban logistics.'
  },
  {
    id: 'refrigerated',
    name: 'Refrigerated Vehicles',
    icon: Snowflake,
    tagline: 'Temperature-Controlled Transport',
    desc: 'State-of-the-art refrigerated trucks maintaining precise temperature control from -25°C to +25°C. Ideal for perishable goods, pharmaceuticals, and temperature-sensitive cargo requiring strict climate management.',
    specs: [
      { name: 'Temperature Range', value: '-25°C to +25°C', detail: 'Precise control' },
      { name: 'Payload Capacity', value: '10-20 Tons', detail: 'Refrigerated capacity' },
      { name: 'Monitoring', value: 'Real-time GPS', detail: 'Continuous tracking' },
      { name: 'Certification', value: 'FSSAI approved', detail: 'Food safe standards' }
    ],
    highlight: 'Best for: Perishables, pharmaceuticals, dairy products, and cold chain logistics.'
  },
  {
    id: 'heavy',
    name: 'Heavy Load Trailers',
    icon: Cog,
    tagline: 'Industrial Heavy-Haul Solutions',
    desc: 'Specialized trailers engineered for transporting extremely heavy industrial loads and equipment. Equipped with advanced suspension systems and multi-axle configurations for maximum stability and load distribution.',
    specs: [
      { name: 'Payload Capacity', value: '30-50+ Tons', detail: 'Heavy-duty rated' },
      { name: 'Axle Config', value: 'Multi-axle', detail: 'Load distribution' },
      { name: 'Special Equipment', value: 'Hydraulic', detail: 'Loading systems' },
      { name: 'Permits', value: 'All included', detail: 'Oversized routing' }
    ],
    highlight: 'Best for: Industrial machinery, construction vehicles, and heavy equipment transport.'
  },
  {
    id: 'tanker',
    name: 'Tanker Trucks',
    icon: Droplet,
    tagline: 'Liquid & Bulk Transport Specialists',
    desc: 'Certified tanker vehicles for safe transport of liquids, fuels, chemicals, and bulk materials. Built with safety compartments, pressure gauges, and specialized handling protocols for hazardous and non-hazardous liquids.',
    specs: [
      { name: 'Capacity', value: '10,000-15,000 liters', detail: 'Multiple compartments' },
      { name: 'Safety Grade', value: 'Certified', detail: 'Hazmat compliant' },
      { name: 'Material Type', value: 'Food & Chemical', detail: 'Dual certified' },
      { name: 'Monitoring', value: 'Pressure & Temp', detail: 'Real-time sensors' }
    ],
    highlight: 'Best for: Fuel delivery, chemical transport, edible oils, and bulk liquid logistics.'
  }
];

export default function FleetShowcase() {
  const [activeTab, setActiveTab] = useState('container');
  const activeFleet = FLEETS.find(f => f.id === activeTab);

  return (
    <section id="fleet" className="py-14 sm:py-20 bg-navy-50 dark:bg-navy-950/70 border-y border-navy-200/20 dark:border-navy-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h2 className="font-heading font-extrabold text-[11px] sm:text-xs uppercase tracking-widest text-orange-primary">
            Fleet Capabilities
          </h2>
          <p className="font-heading font-extrabold text-2xl sm:text-4xl text-navy-900 dark:text-white tracking-tight">
            Specialized Truck Fleet
          </p>
          <p className="text-navy-600 dark:text-navy-300 text-sm sm:text-base max-w-xl mx-auto font-normal">
            From container transport to tanker logistics, our diverse fleet is equipped to handle all your transportation needs.
          </p>
        </div>

        {/* Fleet Tab Selector */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex max-w-full gap-1 overflow-x-auto p-1 bg-navy-100 dark:bg-navy-900 rounded-xl sm:rounded-2xl border border-navy-200/50 dark:border-navy-800/40">
            {FLEETS.map((fleet) => {
              const TabIcon = fleet.icon;
              return (
                <button
                  key={fleet.id}
                  onClick={() => setActiveTab(fleet.id)}
                  className={`flex shrink-0 items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    activeTab === fleet.id
                      ? 'bg-white dark:bg-navy-800 text-orange-primary shadow-md dark:shadow-navy-950/20'
                      : 'text-navy-600 hover:text-navy-900 dark:text-navy-400 dark:hover:text-navy-200'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {window.innerWidth > 640 ? fleet.name : fleet.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase panel */}
        <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-navy-200/30 dark:border-navy-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center text-left min-h-0 sm:min-h-[400px]">
          {/* Text and stats */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-orange-primary font-mono uppercase tracking-wider">
                {activeFleet.tagline}
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-3xl text-navy-900 dark:text-white mt-1">
                {activeFleet.name}
              </h3>
            </div>
            
            <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed font-normal">
              {activeFleet.desc}
            </p>

            <div className="p-3 sm:p-4 bg-orange-light/40 dark:bg-orange-primary/5 rounded-xl sm:rounded-2xl border border-orange-primary/10 text-orange-dark dark:text-orange-primary text-xs sm:text-sm font-semibold">
              {activeFleet.highlight}
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {activeFleet.specs.map((spec, index) => (
                <div key={index} className="p-3 sm:p-4 bg-white/70 dark:bg-navy-900/60 rounded-xl sm:rounded-2xl border border-navy-200/30 dark:border-navy-800">
                  <p className="text-2xs font-extrabold text-navy-400 uppercase tracking-wider">{spec.name}</p>
                  <p className="text-xs sm:text-base font-extrabold text-navy-900 dark:text-white font-mono mt-0.5">{spec.value}</p>
                  <p className="hidden sm:block text-3xs text-navy-500 mt-0.5">{spec.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Graphical display */}
          <div className="lg:col-span-5 flex items-center justify-center p-2 sm:p-6 relative">
            <div className="absolute inset-0 bg-orange-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative w-44 h-44 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-navy-300/40 dark:border-navy-800/40 flex items-center justify-center animate-[spin_60s_linear_infinite]">
              {/* Floating orbits */}
              <div className="absolute top-0 w-8 h-8 bg-orange-primary text-white rounded-full flex items-center justify-center shadow-lg"><Navigation className="w-4 h-4 rotate-90" /></div>
              <div className="absolute bottom-10 left-0 w-8 h-8 bg-navy-900 text-white dark:bg-navy-800 rounded-full flex items-center justify-center shadow-lg"><Navigation className="w-4 h-4 rotate-45" /></div>
              <div className="absolute right-0 top-1/3 w-8 h-8 bg-orange-primary/10 border border-orange-primary text-orange-primary rounded-full flex items-center justify-center shadow-lg"><Navigation className="w-4 h-4" /></div>
            </div>

            {/* Central massive icon wrapper */}
            <div className="absolute p-5 sm:p-8 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 shadow-2xl rounded-2xl sm:rounded-3xl flex items-center justify-center text-orange-primary animate-pulse">
              {React.createElement(activeFleet.icon, { className: "w-11 h-11 sm:w-20 sm:h-20" })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
