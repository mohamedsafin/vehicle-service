import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrackingDetail from './components/TrackingDetail';
import Services from './components/Services';
import FleetShowcase from './components/FleetShowcase';
import Stats from './components/Stats';
import QuoteCalculator from './components/QuoteCalculator';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

  // Synchronize class list with dark mode state
  const toggleDarkMode = () => {
    const updatedDark = !darkMode;
    setDarkMode(updatedDark);
    if (updatedDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  const handleTrack = (id) => {
    setTrackingId(id);
    // Smooth scroll down to the tracking details container
    setTimeout(() => {
      const element = document.getElementById('tracking-info');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (title) => {
    // When details is clicked on services, redirect them to the quote form to inquire
    handleScrollToSection('quote');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-navy-50 dark:bg-navy-950 text-navy-900 dark:text-navy-100">
      {/* Navigation */}
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero 
          onTrack={handleTrack} 
          onGetQuote={() => handleScrollToSection('quote')} 
        />

        {/* Conditional Shipment Tracking Info display */}
        {trackingId && (
          <div className="py-8 bg-navy-100/50 dark:bg-navy-900/30">
            <TrackingDetail 
              trackingId={trackingId} 
              onClose={() => setTrackingId(null)} 
            />
          </div>
        )}

        {/* Core Services */}
        <Services onSelectService={handleSelectService} />

        {/* Fleet Specs Showcase */}
        <FleetShowcase />

        {/* Animated Metrics Strip */}
        <Stats />

        {/* Dynamic Tariff Multi-step Calculator */}
        <QuoteCalculator />

        {/* Enterprise Testimonials */}
        <Testimonials />

        {/* Contact form & offices mapping */}
        <Contact />
      </main>

      {/* Footer Navigation */}
      <Footer onScrollToSection={handleScrollToSection} />
    </div>
  );
}
