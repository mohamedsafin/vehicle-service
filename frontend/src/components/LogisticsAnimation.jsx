import { useState, useEffect } from 'react';

// SVG Sub-components for premium animations

function TruckAnimation() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background speed lines */}
      <line x1="90" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-speed-line-1 opacity-20 text-navy-400 dark:text-navy-500" />
      <line x1="85" y1="45" x2="65" y2="45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-speed-line-2 opacity-30 text-navy-600 dark:text-navy-300" />
      <line x1="95" y1="55" x2="75" y2="55" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-speed-line-3 opacity-20 text-navy-400 dark:text-navy-500" />
      
      {/* Truck Chassis and Cabin */}
      <g className="animate-truck-bounce">
        {/* Trailer */}
        <rect x="15" y="40" width="45" height="25" rx="3" fill="url(#trailer-grad)" stroke="#093F6D" strokeWidth="1.5" />
        {/* Trailer details / stripes */}
        <line x1="20" y1="45" x2="55" y2="45" stroke="#E8F1FA" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <line x1="20" y1="52" x2="55" y2="52" stroke="#E8F1FA" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <line x1="20" y1="59" x2="55" y2="59" stroke="#E8F1FA" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        
        {/* Cabin Connector */}
        <rect x="59" y="55" width="6" height="8" fill="#475569" />
        
        {/* Cabin */}
        <path d="M63 45C63 45 74 45 77 48C80 51 81 55 81 65H63V45Z" fill="url(#cab-grad)" stroke="#093F6D" strokeWidth="1.5" />
        {/* Cabin Window */}
        <path d="M68 49H74C75 49 76.5 50.5 76.5 52V56H68V49Z" fill="#E8F1FA" stroke="#093F6D" strokeWidth="1" />
        {/* Bumper */}
        <rect x="79" y="61" width="4" height="4" rx="1" fill="#94A3B8" />
        {/* Headlight glow */}
        <path d="M83 62L98 58V66L83 62Z" fill="url(#headlight-glow)" opacity="0.6" />
      </g>
      
      {/* Rotating Wheels */}
      <g className="animate-truck-bounce">
        {/* Rear Wheel 1 */}
        <g className="animate-wheel-spin" style={{ transformOrigin: '23px 66px' }}>
          <circle cx="23" cy="66" r="6" fill="#1E293B" stroke="#093F6D" strokeWidth="1" />
          <circle cx="23" cy="66" r="2.5" fill="#94A3B8" />
          <line x1="23" y1="60" x2="23" y2="72" stroke="#475569" strokeWidth="1" />
          <line x1="17" y1="66" x2="29" y2="66" stroke="#475569" strokeWidth="1" />
        </g>
        {/* Rear Wheel 2 */}
        <g className="animate-wheel-spin" style={{ transformOrigin: '38px 66px' }}>
          <circle cx="38" cy="66" r="6" fill="#1E293B" stroke="#093F6D" strokeWidth="1" />
          <circle cx="38" cy="66" r="2.5" fill="#94A3B8" />
          <line x1="38" y1="60" x2="38" y2="72" stroke="#475569" strokeWidth="1" />
          <line x1="32" y1="66" x2="44" y2="66" stroke="#475569" strokeWidth="1" />
        </g>
        {/* Front Wheel */}
        <g className="animate-wheel-spin" style={{ transformOrigin: '72px 66px' }}>
          <circle cx="72" cy="66" r="6" fill="#1E293B" stroke="#093F6D" strokeWidth="1" />
          <circle cx="72" cy="66" r="2.5" fill="#94A3B8" />
          <line x1="72" y1="60" x2="72" y2="72" stroke="#475569" strokeWidth="1" />
          <line x1="66" y1="66" x2="78" y2="66" stroke="#475569" strokeWidth="1" />
        </g>
      </g>
      
      {/* Road / Ground line */}
      <line x1="5" y1="72" x2="95" y2="72" stroke="#093F6D" strokeWidth="2" strokeDasharray="6 4" className="animate-road-scroll" />

      {/* Gradients */}
      <defs>
        <linearGradient id="trailer-grad" x1="15" y1="40" x2="60" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#093F6D" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="cab-grad" x1="63" y1="45" x2="81" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="headlight-glow" x1="83" y1="62" x2="98" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WarehouseAnimation() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background sky grid */}
      <path d="M10 80H90" stroke="#CBD5E1" strokeWidth="1" opacity="0.3" />
      
      {/* Warehouse structure */}
      <path d="M15 80V45L35 35L55 45V80H15Z" fill="url(#warehouse-grad)" stroke="#093F6D" strokeWidth="1.5" />
      <path d="M55 80V50L70 42L85 50V80H55Z" fill="url(#warehouse-grad-2)" stroke="#093F6D" strokeWidth="1.5" />
      
      {/* Slanted roofs highlights */}
      <line x1="14" y1="45" x2="35" y2="34" stroke="#CBD5E1" strokeWidth="1.5" opacity="0.5" />
      <line x1="35" y1="34" x2="56" y2="45" stroke="#CBD5E1" strokeWidth="1.5" opacity="0.5" />
      
      {/* Windows */}
      <rect x="22" y="52" width="6" height="6" rx="1" fill="#E8F1FA" stroke="#093F6D" strokeWidth="1" />
      <rect x="32" y="52" width="6" height="6" rx="1" fill="#E8F1FA" stroke="#093F6D" strokeWidth="1" />
      <rect x="42" y="52" width="6" height="6" rx="1" fill="#E8F1FA" stroke="#093F6D" strokeWidth="1" />
      
      {/* Main loading dock door */}
      <rect x="25" y="65" width="20" height="15" fill="#475569" stroke="#093F6D" strokeWidth="1" />
      {/* Door shutters */}
      <line x1="25" y1="68" x2="45" y2="68" stroke="#334155" strokeWidth="0.8" />
      <line x1="25" y1="71" x2="45" y2="71" stroke="#334155" strokeWidth="0.8" />
      <line x1="25" y1="74" x2="45" y2="74" stroke="#334155" strokeWidth="0.8" />
      <line x1="25" y1="77" x2="45" y2="77" stroke="#334155" strokeWidth="0.8" />
      
      {/* Secondary dock door (open) */}
      <rect x="62" y="65" width="16" height="15" fill="#1E293B" stroke="#093F6D" strokeWidth="1" />
      
      {/* Conveyor belt leading out of dock */}
      <line x1="60" y1="78" x2="95" y2="78" stroke="#093F6D" strokeWidth="3" />
      <circle cx="65" cy="79.5" r="1.5" fill="#94A3B8" />
      <circle cx="75" cy="79.5" r="1.5" fill="#94A3B8" />
      <circle cx="85" cy="79.5" r="1.5" fill="#94A3B8" />
      <circle cx="93" cy="79.5" r="1.5" fill="#94A3B8" />
      
      {/* Sliding boxes on conveyor */}
      <g className="animate-conveyor-box">
        <rect x="66" y="70" width="8" height="8" rx="1" fill="#D97706" stroke="#92400E" strokeWidth="1" />
        <line x1="66" y1="74" x2="74" y2="74" stroke="#92400E" strokeWidth="0.8" />
      </g>
      <g className="animate-conveyor-box-delay">
        <rect x="80" y="70" width="8" height="8" rx="1" fill="#D97706" stroke="#92400E" strokeWidth="1" />
        <line x1="80" y1="74" x2="88" y2="74" stroke="#92400E" strokeWidth="0.8" />
      </g>
      
      {/* High-tech antenna on top */}
      <line x1="35" y1="35" x2="35" y2="18" stroke="#093F6D" strokeWidth="1.5" />
      <circle cx="35" cy="18" r="2" fill="#F97316" className="animate-ping-node" />
      {/* Radio waves */}
      <path d="M30 15C32 12 38 12 40 15" stroke="#F97316" strokeWidth="1" strokeLinecap="round" className="animate-antenna-wave-1" />
      <path d="M26 12C30 7 40 7 44 12" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" className="animate-antenna-wave-2" />
      
      {/* Pushing Green status light */}
      <circle cx="50" cy="70" r="2.5" fill="#22C55E" className="animate-pulse-light" />
      
      <defs>
        <linearGradient id="warehouse-grad" x1="15" y1="35" x2="55" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#093F6D" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="warehouse-grad-2" x1="55" y1="42" x2="85" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DeliveryBoxAnimation() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rotating Ring shadow under the box */}
      <ellipse cx="50" cy="82" rx="28" ry="8" fill="none" stroke="url(#ring-grad)" strokeWidth="2" strokeDasharray="8 4" className="animate-wheel-spin" style={{ transformOrigin: '50px 82px' }} />
      <ellipse cx="50" cy="82" rx="20" ry="5.5" fill="#E8F1FA" opacity="0.3" />
      
      {/* Floating isometric package group */}
      <g className="animate-box-float">
        {/* Shadow of box on the ring */}
        <ellipse cx="50" cy="78" rx="15" ry="4" fill="#020617" opacity="0.25" />
        
        {/* Isometric Box */}
        {/* Left Side Face */}
        <path d="M50 72L22 58V34L50 48V72Z" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
        
        {/* Right Side Face */}
        <path d="M50 72L78 58V34L50 48V72Z" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
        
        {/* Top Face */}
        <path d="M50 48L22 34L50 20L78 34L50 48Z" fill="#F59E0B" stroke="#92400E" strokeWidth="1.5" />
        
        {/* Fragile Glass Stamp Icon on Box Side */}
        <path d="M33 46L39 43V50H33V46ZM36 50V53M34 53H38" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
        
        {/* Tape seal running down center */}
        <path d="M50 20L36 27L50 34L64 27L50 20Z" fill="#1E293B" opacity="0.2" />
        <path d="M50 20L50 48" stroke="#1E293B" strokeWidth="2" opacity="0.35" />
        <path d="M50 48L50 72" stroke="#1E293B" strokeWidth="2" opacity="0.35" />

        {/* Floating security badge */}
        <g className="animate-badge-bounce" style={{ transform: 'translate(54px, 12px)' }}>
          <circle cx="12" cy="12" r="10" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        
        {/* Floating cargo details label */}
        <g className="animate-label-slide" style={{ transform: 'translate(10px, 10px)' }}>
          <rect x="0" y="0" width="22" height="10" rx="2" fill="white" stroke="#093F6D" strokeWidth="0.8" />
          <line x1="4" y1="3" x2="18" y2="3" stroke="#093F6D" strokeWidth="1" />
          <line x1="4" y1="5.5" x2="14" y2="5.5" stroke="#F97316" strokeWidth="1" />
          <line x1="4" y1="8" x2="10" y2="8" stroke="#093F6D" strokeWidth="0.8" />
        </g>
      </g>
      
      <defs>
        <linearGradient id="ring-grad" x1="22" y1="82" x2="78" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#093F6D" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#093F6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TrackerRadarAnimation() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Radar Screen */}
      <circle cx="50" cy="50" r="45" fill="#020617" stroke="#093F6D" strokeWidth="2" />
      
      {/* Concentric grid circles */}
      <circle cx="50" cy="50" r="33" stroke="#093F6D" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="50" r="21" stroke="#093F6D" strokeWidth="1" opacity="0.4" />
      <circle cx="50" cy="50" r="9" stroke="#093F6D" strokeWidth="1" strokeDasharray="1 3" opacity="0.3" />
      
      {/* Radar Crosshairs */}
      <line x1="5" y1="50" x2="95" y2="50" stroke="#093F6D" strokeWidth="1" opacity="0.4" />
      <line x1="50" y1="5" x2="50" y2="95" stroke="#093F6D" strokeWidth="1" opacity="0.4" />
      
      {/* Radar Sweep overlay line */}
      <g className="animate-radar-sweep" style={{ transformOrigin: '50px 50px' }}>
        <line x1="50" y1="50" x2="50" y2="5" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 5C74.8528 5 95 25.1472 95 50" fill="url(#radar-sweep-grad)" opacity="0.35" />
      </g>
      
      {/* Pulsating tracked items */}
      {/* Node 1 */}
      <g>
        <circle cx="32" cy="38" r="2.5" fill="#F97316" />
        <circle cx="32" cy="38" r="8" stroke="#F97316" strokeWidth="1.5" className="animate-ping-node-slow" style={{ transformOrigin: '32px 38px' }} />
      </g>
      {/* Node 2 */}
      <g>
        <circle cx="68" cy="62" r="2" fill="#22C55E" />
        <circle cx="68" cy="62" r="6" stroke="#22C55E" strokeWidth="1" className="animate-ping-node" style={{ transformOrigin: '68px 62px' }} />
      </g>
      {/* Node 3 */}
      <g>
        <circle cx="70" cy="28" r="2" fill="#E8F1FA" opacity="0.8" />
        <circle cx="70" cy="28" r="6" stroke="#E8F1FA" strokeWidth="1.2" className="animate-ping-node-slow" style={{ transformOrigin: '70px 28px' }} opacity="0.5" />
      </g>
      
      {/* Radar Coordinate HUD Overlay */}
      <text x="12" y="20" fill="#F97316" fontSize="4.5" fontFamily="monospace" fontWeight="bold">SYS.TRK: ONLINE</text>
      <text x="12" y="26" fill="#475569" fontSize="3.5" fontFamily="monospace">LAT: 34.0522 N</text>
      <text x="12" y="31" fill="#475569" fontSize="3.5" fontFamily="monospace">LNG: 118.2437 W</text>
      
      <defs>
        <radialGradient id="radar-sweep-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="1" />
          <stop offset="70%" stopColor="#F97316" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function RoutePathAnimation() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background silhouette */}
      <path d="M5 25C15 20 22 28 35 24C48 20 52 30 65 25C78 20 88 32 95 28V75C85 78 78 70 65 74C52 78 48 68 35 72C22 76 12 64 5 68V25Z" fill="#F8FAFC" opacity="0.05" stroke="#CBD5E1" strokeWidth="0.5" />
      
      {/* Connected hub nodes */}
      {/* Origin Node */}
      <g>
        <circle cx="20" cy="60" r="4" fill="#093F6D" stroke="#E8F1FA" strokeWidth="1" />
        <circle cx="20" cy="60" r="10" stroke="#093F6D" strokeWidth="1.5" className="animate-ping-node" style={{ transformOrigin: '20px 60px' }} />
        <text x="12" y="72" fill="#093F6D" fontSize="3.5" fontWeight="bold" className="dark:fill-white">SFO</text>
      </g>
      
      {/* Mid Transit Hub */}
      <g>
        <circle cx="55" cy="40" r="4" fill="#093F6D" stroke="#E8F1FA" strokeWidth="1" />
        <circle cx="55" cy="40" r="10" stroke="#093F6D" strokeWidth="1.5" className="animate-ping-node-slow" style={{ transformOrigin: '55px 40px' }} />
        <text x="50" y="32" fill="#093F6D" fontSize="3.5" fontWeight="bold" className="dark:fill-white">DFW</text>
      </g>

      {/* Destination Node */}
      <g>
        <circle cx="85" cy="55" r="4" fill="#F97316" stroke="#FEF3C7" strokeWidth="1" />
        <circle cx="85" cy="55" r="10" stroke="#F97316" strokeWidth="1.5" className="animate-ping-node" style={{ transformOrigin: '85px 55px' }} />
        <text x="80" y="67" fill="#F97316" fontSize="3.5" fontWeight="bold">JFK</text>
      </g>
      
      {/* Route Path line 1 (SFO to DFW) */}
      <path id="route1" d="M20 60Q38 45 55 40" stroke="#093F6D" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" opacity="0.4" />
      <path d="M20 60Q38 45 55 40" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="100" className="animate-route-flow" />
      
      {/* Route Path line 2 (DFW to JFK) */}
      <path id="route2" d="M55 40Q70 48 85 55" stroke="#093F6D" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" opacity="0.4" />
      <path d="M55 40Q70 48 85 55" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="100" className="animate-route-flow-delay" />
      
      {/* Glowing tracer plane/vehicle sliding along path */}
      <circle r="3" fill="#F97316" className="animate-tracer-ball">
        <animateMotion dur="4s" repeatCount="indefinite" path="M20 60Q38 45 55 40Q70 48 85 55" />
      </circle>
      
    </svg>
  );
}

export default function LogisticsAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  // Cycle through animations every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, [resetKey]);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setResetKey((prev) => prev + 1); // Reset timer on click
  };

  const elements = [
    {
      title: 'Trucks',
      icon: '🚚',
      description: 'Modern fleet management',
      component: <TruckAnimation />
    },
    {
      title: 'Warehouses',
      icon: '🏭',
      description: 'Strategic distribution centers',
      component: <WarehouseAnimation />
    },
    {
      title: 'Delivery Boxes',
      icon: '📦',
      description: 'Safe package handling',
      component: <DeliveryBoxAnimation />
    },
    {
      title: 'GPS Markers',
      icon: '📍',
      description: 'Real-time location tracking',
      component: <TrackerRadarAnimation />
    },
    {
      title: 'Routes',
      icon: '🛣️',
      description: 'Optimized delivery paths',
      component: <RoutePathAnimation />
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-2 sm:px-0">
      {/* Animated SVG Container */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 mb-2 sm:mb-4 perspective">
        {elements.map((element, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center rounded-2xl transition-all duration-700 ease-out transform`}
            style={{
              opacity: activeIndex === index ? 1 : 0,
              transform: activeIndex === index 
                ? 'scale(1) rotateY(0deg)' 
                : index < activeIndex 
                  ? 'scale(0.7) rotateY(-30deg) translateX(-20px)' 
                  : 'scale(0.7) rotateY(30deg) translateX(20px)',
              pointerEvents: activeIndex === index ? 'auto' : 'none',
              zIndex: activeIndex === index ? 10 : 0,
            }}
          >
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-primary/10 to-orange-primary/5 dark:from-orange-primary/15 dark:to-orange-primary/5 rounded-2xl border border-orange-primary/25 dark:border-orange-primary/20 shadow-2xl backdrop-blur-sm p-2 sm:p-4">
              <div className="w-full h-full flex items-center justify-center">
                {element.component}
              </div>
            </div>
          </div>
        ))}

        {/* Glow background effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-primary/15 to-transparent blur-3xl opacity-50 -z-10 animate-pulse"></div>
      </div>

      {/* Title and Description */}
      <div className="text-center space-y-1 sm:space-y-1.5 mb-2 sm:mb-4 transition-all duration-500">
        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#093F6D] dark:text-white line-clamp-1">
          {elements[activeIndex].title}
        </h3>
        <p className="text-navy-600 dark:text-navy-300 font-semibold text-xs sm:text-sm line-clamp-1\">
          {elements[activeIndex].description}
        </p>
      </div>

      {/* Navigation Dots */}
      <div className="flex gap-1.5 sm:gap-2 items-center justify-center mb-2 sm:mb-4\">
        {elements.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === index
                ? 'bg-[#093F6D] w-5 sm:w-6'
                : 'bg-navy-300 dark:bg-navy-700 w-1.5 sm:w-2 hover:bg-[#093F6D]/60'
            }`}
            aria-label={`Show ${elements[index].title}`}
          />
        ))}
      </div>

      {/* Compact Interactive Panel */}
      <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-navy-200/50 dark:border-navy-800/50 text-center w-full max-w-sm">
        <p className="text-[8px] sm:text-[10px] font-bold text-navy-400 dark:text-navy-500 mb-1.5 sm:mb-2.5 tracking-wider uppercase">
          Operations Monitor
        </p>
        <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
          {elements.map((element, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`p-1 sm:p-1.5 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                activeIndex === index
                  ? 'bg-gradient-to-br from-[#093F6D]/15 to-[#093F6D]/5 border-[#093F6D] shadow-md scale-105'
                  : 'bg-white dark:bg-navy-900 border-navy-100 dark:border-navy-800 hover:border-[#093F6D]/50'
              }`}
            >
              <div className="text-base sm:text-lg text-center">{element.icon}</div>
              <p className="text-[7px] sm:text-[9px] font-bold text-navy-800 dark:text-navy-200 text-center mt-0.5 truncate">
                {element.title.split(' ')[0]}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* CSS for custom animations */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        @keyframes wheel-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-wheel-spin {
          animation: wheel-spin 1.2s linear infinite;
        }
        @keyframes road-scroll {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        .animate-road-scroll {
          animation: road-scroll 0.6s linear infinite;
        }
        @keyframes truck-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
        .animate-truck-bounce {
          animation: truck-bounce 1.2s ease-in-out infinite;
        }
        @keyframes speed-line {
          0% { transform: translateX(40px); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateX(-40px); opacity: 0; }
        }
        .animate-speed-line-1 {
          animation: speed-line 1.5s linear infinite;
        }
        .animate-speed-line-2 {
          animation: speed-line 1.2s linear infinite 0.3s;
        }
        .animate-speed-line-3 {
          animation: speed-line 1.8s linear infinite 0.6s;
        }
        @keyframes conveyor-box {
          0% { transform: translateX(-15px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateX(15px); opacity: 0; }
        }
        .animate-conveyor-box {
          animation: conveyor-box 2.2s linear infinite;
        }
        .animate-conveyor-box-delay {
          animation: conveyor-box 2.2s linear infinite 1.1s;
        }
        @keyframes antenna-wave {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .animate-antenna-wave-1 {
          animation: antenna-wave 1.8s ease-in-out infinite;
          transform-origin: 35px 18px;
        }
        .animate-antenna-wave-2 {
          animation: antenna-wave 1.8s ease-in-out infinite 0.6s;
          transform-origin: 35px 18px;
        }
        @keyframes pulse-light {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-pulse-light {
          animation: pulse-light 1s ease-in-out infinite;
          transform-origin: 50px 70px;
        }
        @keyframes box-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-box-float {
          animation: box-float 3s ease-in-out infinite;
        }
        @keyframes badge-bounce {
          0%, 100% { transform: translate(54px, 12px); }
          50% { transform: translate(54px, 8px); }
        }
        .animate-badge-bounce {
          animation: badge-bounce 3s ease-in-out infinite;
        }
        @keyframes label-slide {
          0%, 100% { transform: translate(10px, 10px); }
          50% { transform: translate(10px, 13px); }
        }
        .animate-label-slide {
          animation: label-slide 3s ease-in-out infinite;
        }
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-radar-sweep {
          animation: radar-sweep 4s linear infinite;
        }
        @keyframes ping-node {
          0% { transform: scale(0.3); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .animate-ping-node {
          animation: ping-node 1.5s ease-out infinite;
        }
        .animate-ping-node-slow {
          animation: ping-node 2.2s ease-out infinite 0.5s;
        }
        @keyframes route-flow {
          0% { stroke-dashoffset: 100; }
          50%, 100% { stroke-dashoffset: 0; }
        }
        .animate-route-flow {
          animation: route-flow 4s ease-in-out infinite;
        }
        .animate-route-flow-delay {
          animation: route-flow 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}
