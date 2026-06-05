import React, { useState } from 'react';
import { Calculator, Plane, Ship, Truck, Check, ChevronRight, ChevronLeft, Shield } from 'lucide-react';

const CARGO_TYPES = [
  { id: 'air', name: 'Air Cargo', icon: Plane, rate: 4.5, speed: '24-48 Hours' },
  { id: 'ocean', name: 'Ocean Container', icon: Ship, rate: 0.8, speed: '14-25 Days' },
  { id: 'ground', name: 'Land Linehaul', icon: Truck, rate: 1.5, speed: '2-5 Days' }
];

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [cargoType, setCargoType] = useState('air');
  const [weight, setWeight] = useState(100);
  const [origin, setOrigin] = useState('London (LHR)');
  const [destination, setDestination] = useState('New York (JFK)');
  const [distanceZone, setDistanceZone] = useState('intercontinental'); // domestic, transcontinental, intercontinental
  const [speedOption, setSpeedOption] = useState('express'); // economy, express, priority
  const [insurance, setInsurance] = useState(true);

  // Dynamic calculations
  const selectedCargo = CARGO_TYPES.find(c => c.id === cargoType);
  const baseRate = selectedCargo.rate;
  
  const getZoneMultiplier = () => {
    switch (distanceZone) {
      case 'domestic': return 1.0;
      case 'transcontinental': return 1.5;
      case 'intercontinental': return 2.2;
      default: return 1.0;
    }
  };

  const getSpeedMultiplier = () => {
    switch (speedOption) {
      case 'economy': return 1.0;
      case 'express': return 1.4;
      case 'priority': return 2.0;
      default: return 1.0;
    }
  };

  const calculatedBase = weight * baseRate * getZoneMultiplier();
  const speedCost = calculatedBase * (getSpeedMultiplier() - 1);
  const insuranceCost = insurance ? 120 : 0;
  const totalCost = calculatedBase + speedCost + insuranceCost;

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Quote Inquiry Submitted! One of our dispatch brokers will contact you shortly with a firm booking confirmation.');
  };

  return (
    <section id="quote" className="py-14 sm:py-20 bg-white dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start text-left">
          {/* Info Block */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 lg:sticky lg:top-28">
            <h2 className="font-heading font-extrabold text-[11px] sm:text-xs uppercase tracking-widest text-orange-primary">
              Pricing Calculator
            </h2>
            <p className="font-heading font-extrabold text-2xl sm:text-4xl text-navy-900 dark:text-white tracking-tight">
              Get an Instant Logistics Estimate
            </p>
            <p className="text-navy-600 dark:text-navy-300 text-sm sm:text-base font-normal leading-relaxed">
              Use our interactive pricing wizard to compute high-level cargo logistics tariffs. Adjust transit modes, weight classes, and speeds for instant calculations.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-navy-50 dark:bg-navy-900 border border-navy-200/40 dark:border-navy-800">
                <div className="p-2 sm:p-2.5 bg-orange-light dark:bg-orange-primary/10 text-orange-primary rounded-lg sm:rounded-xl shrink-0 flex items-center justify-center">
                  <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white">Enterprise Rates</h4>
                  <p className="text-xs text-navy-500 mt-0.5">High-volume volume discounts apply automatically at booking.</p>
                </div>
              </div>
              
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-navy-50 dark:bg-navy-900 border border-navy-200/40 dark:border-navy-800">
                <div className="p-2 sm:p-2.5 bg-orange-light dark:bg-orange-primary/10 text-orange-primary rounded-lg sm:rounded-xl shrink-0 flex items-center justify-center">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white">Fully Bonded & Insured</h4>
                  <p className="text-xs text-navy-500 mt-0.5">All cargo valuations are fully insured under standard ocean/air carrier acts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Widget */}
          <div className="lg:col-span-7 w-full">
            <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-navy-200/30 dark:border-navy-800 shadow-xl">
              {/* Stepper Indicator */}
              <div className="flex items-center gap-2 mb-5 sm:mb-8">
                {[1, 2, 3].map((num) => (
                  <React.Fragment key={num}>
                    <div 
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                        step === num 
                          ? 'bg-orange-primary border-orange-primary text-white' 
                          : step > num 
                          ? 'bg-navy-900 border-navy-900 text-white dark:bg-orange-primary/10 dark:border-orange-primary dark:text-orange-primary' 
                          : 'bg-white dark:bg-navy-900 border-navy-200 dark:border-navy-800 text-navy-400'
                      }`}
                    >
                      {step > num ? <Check className="w-4 h-4" /> : num}
                    </div>
                    {num < 3 && <div className={`flex-grow h-0.5 ${step > num ? 'bg-orange-primary' : 'bg-navy-200 dark:bg-navy-850'}`}></div>}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Step 1: Cargo Info */}
                {step === 1 && (
                  <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-navy-900 dark:text-white">Step 1: Cargo Specifications</h3>
                    
                    {/* Cargo Mode selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-navy-400 uppercase tracking-wide">Transit Mode</label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {CARGO_TYPES.map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setCargoType(type.id)}
                              className={`flex flex-col items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-center transition-all cursor-pointer ${
                                cargoType === type.id
                                  ? 'border-orange-primary bg-orange-primary/5 text-orange-primary'
                                  : 'border-navy-200 dark:border-navy-850 hover:bg-navy-50 dark:hover:bg-navy-900 text-navy-600 dark:text-navy-300'
                              }`}
                            >
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1.5 sm:mb-2" />
                              <span className="text-[11px] sm:text-xs font-bold">{type.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Weight slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <label className="text-xs font-bold text-navy-400 uppercase tracking-wide">Shipment weight</label>
                        <span className="font-mono text-base font-extrabold text-navy-900 dark:text-white">{weight} kg</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="5000" 
                        step="10"
                        value={weight} 
                        onChange={(e) => setWeight(parseInt(e.target.value))}
                        className="w-full h-2 bg-navy-200 dark:bg-navy-800 rounded-lg appearance-none cursor-pointer accent-orange-primary"
                      />
                      <div className="flex justify-between text-3xs text-navy-400 font-mono">
                        <span>10 kg</span>
                        <span>2,500 kg</span>
                        <span>5,000 kg</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-navy-900 hover:bg-navy-800 dark:bg-orange-primary dark:hover:bg-orange-dark text-white rounded-xl font-bold text-xs sm:text-sm cursor-pointer"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Route details */}
                {step === 2 && (
                  <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-navy-900 dark:text-white">Step 2: Routing Details</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy-400 uppercase tracking-wide">Origin Terminal</label>
                        <input 
                          type="text" 
                          value={origin} 
                          onChange={(e) => setOrigin(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-navy-950 text-navy-900 dark:text-white rounded-xl text-xs sm:text-sm border border-navy-200 dark:border-navy-800 focus:border-orange-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy-400 uppercase tracking-wide">Destination Terminal</label>
                        <input 
                          type="text" 
                          value={destination} 
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-navy-950 text-navy-900 dark:text-white rounded-xl text-xs sm:text-sm border border-navy-200 dark:border-navy-800 focus:border-orange-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-navy-400 uppercase tracking-wide">Distance Bracket</label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {[
                          { id: 'domestic', label: 'Regional', mult: '1.0x' },
                          { id: 'transcontinental', label: 'Cross-Border', mult: '1.5x' },
                          { id: 'intercontinental', label: 'Global', mult: '2.2x' }
                        ].map((zone) => (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => setDistanceZone(zone.id)}
                            className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                              distanceZone === zone.id
                                ? 'border-orange-primary bg-orange-primary/5 text-orange-primary'
                                : 'border-navy-200 dark:border-navy-850 hover:bg-navy-50 dark:hover:bg-navy-900 text-navy-600 dark:text-navy-300'
                            }`}
                          >
                            <span className="block text-xs font-bold">{zone.label}</span>
                            <span className="block text-3xs text-navy-450 font-mono mt-0.5">{zone.mult}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="flex items-center gap-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 text-navy-700 dark:text-navy-200 rounded-xl font-bold text-xs sm:text-sm cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-navy-900 hover:bg-navy-800 dark:bg-orange-primary dark:hover:bg-orange-dark text-white rounded-xl font-bold text-xs sm:text-sm cursor-pointer"
                      >
                        Calculate Estimate
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Calculation & Pricing details */}
                {step === 3 && (
                  <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200 text-left">
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-navy-900 dark:text-white">Step 3: Instant Quotation</h3>
                    
                    {/* Delivery summary */}
                    <div className="p-4 bg-navy-50 dark:bg-navy-900 rounded-2xl border border-navy-200/40 dark:border-navy-850 text-xs sm:text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-navy-500">Route:</span>
                        <strong className="text-navy-900 dark:text-white">{origin} to {destination} ({distanceZone})</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy-500">Service Mode:</span>
                        <strong className="text-navy-900 dark:text-white">{selectedCargo.name}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy-500">Total Mass:</span>
                        <strong className="text-navy-900 dark:text-white">{weight} kg</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy-500">Average Transit time:</span>
                        <strong className="text-orange-primary">{selectedCargo.speed}</strong>
                      </div>
                    </div>

                    {/* Speed options selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-navy-400 uppercase tracking-wide">Transit Priority</label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {[
                          { id: 'economy', label: 'Economy', desc: 'Standard rate' },
                          { id: 'express', label: 'Express', desc: '+40% speed' },
                          { id: 'priority', label: 'Next-Flight', desc: '+100% urgency' }
                        ].map((sp) => (
                          <button
                            key={sp.id}
                            type="button"
                            onClick={() => setSpeedOption(sp.id)}
                            className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                              speedOption === sp.id
                                ? 'border-orange-primary bg-orange-primary/5 text-orange-primary'
                                : 'border-navy-200 dark:border-navy-850 hover:bg-navy-50 dark:hover:bg-navy-900 text-navy-600 dark:text-navy-300'
                            }`}
                          >
                            <span className="block text-xs font-bold">{sp.label}</span>
                            <span className="block text-3xs text-navy-450 mt-0.5">{sp.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Insurance Addon */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-navy-200/40 dark:border-navy-850 hover:bg-navy-50 dark:hover:bg-navy-900/30">
                      <input 
                        type="checkbox" 
                        id="insurance" 
                        checked={insurance} 
                        onChange={(e) => setInsurance(e.target.checked)}
                        className="w-4.5 h-4.5 rounded border-navy-350 text-orange-primary focus:ring-orange-primary accent-orange-primary cursor-pointer"
                      />
                      <label htmlFor="insurance" className="flex-grow text-xs cursor-pointer select-none">
                        <span className="block font-bold text-navy-900 dark:text-white">Add Smart Cargo Insurance</span>
                        <span className="block text-navy-500 mt-0.5">Protects up to $15,000 cargo loss (+ $120.00)</span>
                      </label>
                    </div>

                    {/* Calculation breakdown */}
                    <div className="pt-4 border-t border-navy-200/40 dark:border-navy-800 space-y-2 text-xs sm:text-sm font-mono">
                      <div className="flex justify-between text-navy-500">
                        <span>Base Freight Charge:</span>
                        <span>${calculatedBase.toFixed(2)}</span>
                      </div>
                      {speedCost > 0 && (
                        <div className="flex justify-between text-navy-500">
                          <span>Priority Dispatch:</span>
                          <span>+${speedCost.toFixed(2)}</span>
                        </div>
                      )}
                      {insuranceCost > 0 && (
                        <div className="flex justify-between text-navy-500">
                          <span>Cargo Insurance:</span>
                          <span>+${insuranceCost.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-extrabold border-t border-dashed border-navy-200 dark:border-navy-850 pt-2.5 text-navy-900 dark:text-white">
                        <span>Estimated Total:</span>
                        <span className="text-orange-primary text-lg">${totalCost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="flex items-center gap-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 text-navy-700 dark:text-navy-200 rounded-xl font-bold text-xs sm:text-sm cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-primary hover:bg-orange-dark text-white rounded-xl font-bold text-xs sm:text-sm shadow-md cursor-pointer"
                      >
                        Submit Broker Inquiry
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
