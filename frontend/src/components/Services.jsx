import { Truck, Package, Warehouse, Zap, MapPin, Navigation, Factory, ShoppingCart, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Truck,
    title: 'Road Transportation',
    desc: 'Full Truck Load (FTL) services for large shipments. Dedicated vehicles ensuring timely and secure delivery of your complete cargo loads across all regions.',
    metric: 'Service type',
    detail: 'Full Truck Load'
  },
  {
    icon: Package,
    title: 'Part Load Services',
    desc: 'Less Than Truck Load (LTL) solutions for partial shipments. Cost-effective transport sharing capacity with other shipments without compromising safety.',
    metric: 'Service type',
    detail: 'Less Than Truck Load'
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    desc: 'Secure storage and inventory management facilities. Modern warehouses with advanced tracking systems and efficient handling for your goods.',
    metric: 'Coverage',
    detail: 'Multiple locations'
  },
  {
    icon: Zap,
    title: 'Express Delivery',
    desc: 'Rapid delivery services for time-sensitive shipments. Priority handling and expedited routing to ensure fast transit times.',
    metric: 'Transit speed',
    detail: 'Rush available'
  },
  {
    icon: MapPin,
    title: 'Last Mile Delivery',
    desc: 'Final-mile logistics ensuring your cargo reaches the ultimate destination. Door-to-door delivery with real-time tracking and customer communication.',
    metric: 'Coverage',
    detail: 'Urban & Rural'
  },
  {
    icon: Navigation,
    title: 'Interstate Transportation',
    desc: 'Long-distance cross-state freight movement. Reliable and efficient transportation connecting major business hubs with established routes and proven expertise.',
    metric: 'Coverage',
    detail: 'All major routes'
  },
  {
    icon: Factory,
    title: 'Industrial Logistics',
    desc: 'Specialized handling for heavy machinery and industrial equipment. Customized solutions for complex industrial supply chain requirements.',
    metric: 'Capacity',
    detail: 'Heavy loads'
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Logistics',
    desc: 'End-to-end fulfillment for online retailers. From warehousing to last-mile delivery, complete logistics solutions for e-commerce businesses.',
    metric: 'Integration',
    detail: 'Platform ready'
  }
];

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="py-14 sm:py-20 bg-white dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="font-heading font-extrabold text-[11px] sm:text-xs uppercase tracking-widest text-orange-primary">
            What We Do
          </h2>
          <p className="font-heading font-extrabold text-2xl sm:text-4xl text-navy-900 dark:text-white tracking-tight">
            Comprehensive Transportation & Logistics Solutions
          </p>
          <p className="text-navy-600 dark:text-navy-300 text-sm sm:text-base max-w-xl mx-auto font-normal">
            From FTL and LTL services to warehousing and e-commerce fulfillment, we deliver comprehensive logistics solutions tailored to your business needs.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="group relative flex flex-col justify-between p-5 sm:p-8 bg-navy-50 hover:bg-white dark:bg-navy-900 dark:hover:bg-navy-800 rounded-2xl sm:rounded-3xl border border-navy-200/40 hover:border-orange-primary/30 dark:border-navy-800/40 dark:hover:border-orange-primary/30 transition-all duration-350 shadow-sm hover:shadow-xl hover:-translate-y-1.5 overflow-hidden text-left"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-orange-primary/5 group-hover:bg-orange-primary/10 rounded-bl-full transition-all duration-300 pointer-events-none"></div>

                <div className="space-y-3 sm:space-y-4">
                  {/* Icon */}
                  <div className="inline-flex p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white dark:bg-navy-950 text-navy-900 dark:text-orange-primary shadow-sm border border-navy-200/35 dark:border-navy-800/40 group-hover:bg-orange-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-navy-900 dark:text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed font-normal">
                    {service.desc}
                  </p>
                </div>

                {/* Footer details */}
                <div className="pt-4 mt-4 sm:pt-6 sm:mt-6 border-t border-navy-200/40 dark:border-navy-800/40 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-navy-400">
                      {service.metric}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-navy-800 dark:text-orange-primary font-mono mt-0.5">
                      {service.detail}
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-navy-900 dark:text-navy-200 group-hover:text-orange-primary transition-colors cursor-pointer"
                  >
                    Details
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
