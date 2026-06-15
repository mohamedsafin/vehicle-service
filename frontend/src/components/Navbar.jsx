import { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Services', id: 'services' },
  { name: 'Fleet', id: 'fleet' },
  { name: 'Metrics', id: 'metrics' },
  { name: 'Testimonials', id: 'testimonials' },
  { name: 'Contact', id: 'contact' }
];

const observedSectionIds = ['hero', ...navLinks.map((link) => link.id), 'quote'];

export default function Navbar({ darkMode, toggleDarkMode, onScrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const navSectionIds = new Set(navLinks.map((link) => link.id));
    const sections = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const updateActiveSection = () => {
      const anchorLine = window.innerHeight * 0.35;
      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= anchorLine && rect.bottom >= anchorLine;
      });

      setActiveSection(
        currentSection && navSectionIds.has(currentSection.id)
          ? currentSection.id
          : ''
      );
    };

    const observer = new IntersectionObserver(
      () => updateActiveSection(),
      {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    );

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-50 py-3 sm:py-4">
  <div className="max-w-7xl mx-auto px-3 sm:px-4">
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full px-4 sm:px-8 h-14 sm:h-20 flex items-center justify-between shadow-sm">

      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => {
          setActiveSection('');
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img 
          src="/logo.png" 
          alt="Haulier & Service Logo" 
          className="h-10 w-auto object-contain sm:h-16"
        />
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleLinkClick(link.id)}
            className={`relative pb-1.5 text-sm transition-colors duration-300 hover:text-orange-500 dark:hover:text-orange-500 ${
              activeSection === link.id
                ? 'font-semibold text-[#0F3D75] dark:text-[#0F3D75]'
                : 'font-medium text-gray-700 dark:text-white'
            } after:absolute after:left-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[#0F3D75] after:transition-all after:duration-300 ${
              activeSection === link.id ? 'after:w-full' : 'after:w-0'
            }`}
            aria-current={activeSection === link.id ? 'page' : undefined}
          >
            {link.name}
          </button>
        ))}
      </nav>

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-4">

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-orange-500" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={() => onScrollToSection("quote")}
          className="bg-[#093F6D] hover:bg-[#052f52] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition"
        >
          Get Quote
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="grid h-9 w-9 place-items-center rounded-full text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-slate-800"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-orange-500" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="grid h-9 w-9 place-items-center rounded-full text-gray-800 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-slate-800"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

    </div>
  </div>

  <div
    className={`fixed inset-0 z-40 bg-navy-950/35 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}
    onClick={() => setIsOpen(false)}
  />

  <aside
    className={`fixed right-3 top-20 z-50 w-[min(82vw,320px)] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-navy-950/20 transition-transform duration-300 md:hidden dark:border-slate-700 dark:bg-slate-900 ${
      isOpen ? 'translate-x-0' : 'translate-x-[115%]'
    }`}
  >
    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-slate-800">
      <img
        src="/logo.png"
        alt="Haulier & Service Logo"
        className="h-9 w-auto object-contain"
      />
      <button
        onClick={() => setIsOpen(false)}
        className="grid h-9 w-9 place-items-center rounded-full text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-slate-800"
        aria-label="Close menu"
      >
        <X className="h-5 w-5" />
      </button>
    </div>

    <nav className="flex flex-col px-3 py-3">
      {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => handleLinkClick(link.id)}
          className={`relative w-full rounded-2xl px-4 py-3 text-left text-sm transition hover:bg-gray-100 hover:text-[#093F6D] dark:hover:bg-slate-800 ${
            activeSection === link.id
              ? 'font-semibold text-[#0F3D75] dark:text-[#0F3D75]'
              : 'font-semibold text-gray-700 dark:text-gray-100'
          } after:absolute after:left-4 after:bottom-2 after:h-0.5 after:rounded-full after:bg-[#0F3D75] after:transition-all after:duration-300 ${
            activeSection === link.id ? 'after:w-10' : 'after:w-0'
          }`}
          aria-current={activeSection === link.id ? 'page' : undefined}
        >
          {link.name}
        </button>
      ))}
    </nav>

    <div className="flex justify-start border-t border-gray-100 p-4 dark:border-slate-800">
      <button
        onClick={() => handleLinkClick('quote')}
        className="flex min-w-28 items-center justify-center gap-1.5 rounded-full bg-[#093F6D] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#052f52]"
      >
        Get Quote
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  </aside>
</header>
    
  );
}
