import React from 'react';
import { PackageOpen, Plane, Truck, CheckCircle2, Circle, AlertCircle, ArrowRight, ShieldCheck, MapPin, X } from 'lucide-react';

const MOCK_SHIPMENTS = {
  'TRK-AIR-102': {
    id: 'TRK-AIR-102',
    origin: 'London, LHR',
    destination: 'New York, JFK',
    carrier: 'LogixAir Flight LX-89',
    estimated: 'Today by 6:00 PM',
    statusStep: 3, // Out for Delivery
    type: 'Air Cargo',
    weight: '78 kg',
    dimensions: '120 x 80 x 95 cm',
    logs: [
      { time: '10:15 AM', location: 'Queens local hub, NY', desc: 'Out for delivery with driver' },
      { time: '08:30 AM', location: 'JFK Airport, NY', desc: 'Customs clearance completed' },
      { time: '06:12 AM', location: 'JFK Airport, NY', desc: 'Flight LX-89 landed successfully' },
      { time: 'Yesterday', location: 'Heathrow Airport, LHR', desc: 'Departed sorting facility' }
    ]
  },
  'TRK-OCEAN-779': {
    id: 'TRK-OCEAN-779',
    origin: 'Shanghai Port, CN',
    destination: 'Port of Rotterdam, NL',
    carrier: 'Ocean Queen Vessel OQ-511',
    estimated: 'June 18, 2026',
    statusStep: 2, // In Transit
    type: 'Ocean Freight',
    weight: '18,400 kg',
    dimensions: '1 x 40ft High Cube Container',
    logs: [
      { time: '2 days ago', location: 'Suez Canal, EG', desc: 'Transiting Suez Corridor' },
      { time: '5 days ago', location: 'Port of Singapore, SG', desc: 'Bunkering & security inspection completed' },
      { time: 'May 28', location: 'Port of Shanghai, CN', desc: 'Vessel departed berth' }
    ]
  },
  'TRK-LAND-854': {
    id: 'TRK-LAND-854',
    origin: 'Frankfurt, DE',
    destination: 'Paris, FR',
    carrier: 'LogixTruck Linehaul T-9',
    estimated: 'Delivered (June 3, 2026 at 2:30 PM)',
    statusStep: 4, // Delivered
    type: 'Road Freight',
    weight: '230 kg',
    dimensions: '80 x 60 x 50 cm (2 Pallets)',
    logs: [
      { time: 'June 3, 2:30 PM', location: 'Paris Hub Office, FR', desc: 'Delivered & signed by agent' },
      { time: 'June 3, 11:15 AM', location: 'Paris North Depot, FR', desc: 'Out for local delivery' },
      { time: 'June 3, 05:00 AM', location: 'Paris North Depot, FR', desc: 'Arrived at destination depot' },
      { time: 'June 2', location: 'Frankfurt Sorting Hub, DE', desc: 'Departed origin logistics center' }
    ]
  }
};

export default function TrackingDetail({ trackingId, onClose }) {
  const shipment = MOCK_SHIPMENTS[trackingId];

  // Helper to render tracking steps
  const steps = [
    { label: 'Booked', icon: PackageOpen },
    { label: 'In Transit', icon: Plane },
    { label: 'Out for Delivery', icon: Truck },
    { label: 'Delivered', icon: CheckCircle2 }
  ];

  if (!shipment) {
    return (
      <div className="max-w-3xl mx-auto px-4 mt-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="glass-card rounded-2xl p-6 md:p-8 border border-rose-200/50 dark:border-rose-900/30 shadow-lg text-center relative overflow-hidden">
          <button onClick={onClose} className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-rose-50 dark:hover:bg-navy-900 text-rose-500 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex p-3 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-heading font-extrabold text-navy-900 dark:text-white mb-2">
            No Records Found
          </h3>
          <p className="text-sm text-navy-600 dark:text-navy-300 max-w-md mx-auto mb-6">
            We couldn't locate a shipment with ID <strong className="font-mono text-orange-primary">{trackingId}</strong>. 
            Please check the spelling and try again.
          </p>
          <div className="bg-navy-50 dark:bg-navy-900/50 rounded-xl p-4 inline-block text-left">
            <p className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-2">Available Demo Tracking IDs:</p>
            <div className="flex flex-col gap-1.5 font-mono text-sm text-orange-primary">
              <div>• <strong className="underline decoration-dotted cursor-pointer" onClick={() => window.location.reload()}>TRK-AIR-102</strong> (Out for Delivery - Air)</div>
              <div>• <strong className="underline decoration-dotted cursor-pointer" onClick={() => window.location.reload()}>TRK-OCEAN-779</strong> (In Transit - Ocean)</div>
              <div>• <strong className="underline decoration-dotted cursor-pointer" onClick={() => window.location.reload()}>TRK-LAND-854</strong> (Delivered - Road)</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="tracking-info" className="max-w-4xl mx-auto px-4 mt-8 animate-in fade-in slide-in-from-bottom duration-300">
      <div className="glass rounded-3xl p-6 md:p-8 border border-orange-primary/20 shadow-xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 rounded-xl border border-navy-200/50 hover:bg-navy-100 dark:border-navy-800/50 dark:hover:bg-navy-900 text-navy-500 dark:text-navy-400 cursor-pointer transition-colors"
          aria-label="Close tracking"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-navy-200/40 dark:border-navy-800/40">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-orange-primary/10 text-orange-primary text-xs font-bold font-mono">
                {shipment.type}
              </span>
              <span className="text-xs text-navy-500 font-semibold font-mono">ID: {shipment.id}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading font-extrabold text-xl text-navy-900 dark:text-white">{shipment.origin}</span>
              <ArrowRight className="w-4 h-4 text-orange-primary" />
              <span className="font-heading font-extrabold text-xl text-navy-900 dark:text-white">{shipment.destination}</span>
            </div>
          </div>
          <div className="md:text-right pr-12">
            <p className="text-xs text-navy-500 font-semibold uppercase tracking-wider">Estimated Delivery</p>
            <p className="font-heading font-extrabold text-lg text-orange-primary">{shipment.estimated}</p>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="py-8 md:py-10">
          <div className="relative flex justify-between items-center max-w-2xl mx-auto">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-navy-200 dark:bg-navy-800 pointer-events-none z-0"></div>
            {/* Active Colored Line */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-primary transition-all duration-550 z-0 pointer-events-none"
              style={{ width: `${((shipment.statusStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const stepNum = idx + 1;
              const isActive = stepNum <= shipment.statusStep;
              const isCurrent = stepNum === shipment.statusStep;

              return (
                <div key={idx} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-orange-primary border-orange-primary text-white scale-110 shadow-lg shadow-orange-primary/30' 
                        : isActive 
                        ? 'bg-navy-900 border-navy-900 dark:bg-orange-primary/10 dark:border-orange-primary text-orange-primary' 
                        : 'bg-white border-navy-200 dark:bg-navy-900 dark:border-navy-800 text-navy-400'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span className={`absolute -bottom-7 text-xs font-bold whitespace-nowrap tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-navy-900 dark:text-white' : 'text-navy-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details & Telemetry Logs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-navy-200/40 dark:border-navy-800/40 text-left">
          {/* Metadata details */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-navy-950 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-primary" />
              Consignment Info
            </h4>
            <div className="glass-card rounded-2xl p-4 border border-navy-200/30 dark:border-navy-850 space-y-3.5 text-sm">
              <div className="flex justify-between">
                <span className="text-navy-500">Carrier Assigned:</span>
                <span className="font-semibold text-navy-900 dark:text-white">{shipment.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Consignment Mass:</span>
                <span className="font-semibold text-navy-900 dark:text-white">{shipment.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Volumetric Size:</span>
                <span className="font-mono text-xs font-semibold text-navy-900 dark:text-white">{shipment.dimensions}</span>
              </div>
              <div className="flex justify-between items-center pt-2.5 border-t border-navy-200/20">
                <span className="text-xs text-navy-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-primary" />
                  Telemetry Active
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-extrabold bg-emerald-500/10 text-emerald-500 animate-pulse">
                  ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Shipment Transit History */}
          <div className="md:col-span-7 space-y-4">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-navy-950 dark:text-white">
              Transit Telemetry Log
            </h4>
            <div className="relative pl-6 border-l-2 border-navy-200 dark:border-navy-850 space-y-6">
              {shipment.logs.map((log, index) => (
                <div key={index} className="relative">
                  {/* Bullet */}
                  <span className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 ${
                    index === 0 
                      ? 'bg-orange-primary border-orange-primary animate-pulse' 
                      : 'bg-navy-200 border-white dark:bg-navy-900 dark:border-navy-850'
                  }`}></span>
                  
                  {/* Log Card */}
                  <div className="text-sm">
                    <span className="inline-block text-xs font-bold text-orange-primary font-mono mb-0.5">
                      {log.time} • {log.location}
                    </span>
                    <p className="font-semibold text-navy-900 dark:text-white">
                      {log.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
