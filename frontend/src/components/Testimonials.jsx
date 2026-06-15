import { Quote, Star } from 'lucide-react';

const REVIEWS = [
  {
    quote: 'Haulier & Service completely optimized our global parts supply chain. Their custom air cargo flights and zero customs clearance friction saved us over 40 hours of assembly downtime during our peak shipping season.',
    author: 'Sarah Jenkins',
    role: 'VP of Supply Chain',
    company: 'ElectroVolt Industries',
    avatar: 'SJ',
    rating: 5
  },
  {
    quote: 'The telemetry logs are a game-changer. We could monitor our fresh cargo temperature and vibration metrics live as the vessel transited through the Suez Canal. The level of detail is unmatched.',
    author: 'Marc Janssen',
    role: 'Operations Director',
    company: 'AeroFoods Corp',
    avatar: 'MJ',
    rating: 5
  },
  {
    quote: 'Their electric truck fleet aligns perfectly with our enterprise Net-Zero targets. Haulier & Service delivers 99.8% on-time while cutting our regional distribution carbon footprints by over 35%.',
    author: 'Alisha Patel',
    role: 'Logistics Manager',
    company: 'GreenVibe Retail',
    avatar: 'AP',
    rating: 5
  },
  {
    quote: 'The control tower team gave us immediate exception visibility across 14 distribution hubs. It feels like having a senior logistics desk embedded in our operation.',
    author: 'Daniel Brooks',
    role: 'Chief Operating Officer',
    company: 'Northline Medical',
    avatar: 'DB',
    rating: 5
  },
  {
    quote: 'We moved from fragmented broker updates to one reliable freight workflow. Our retail launches now arrive with cleaner handoffs and fewer accessorial surprises.',
    author: 'Priya Raman',
    role: 'Director of Transportation',
    company: 'UrbanAxis Commerce',
    avatar: 'PR',
    rating: 5
  },
  {
    quote: 'Haulier & Service helped us consolidate carrier spend without sacrificing service levels. Their reporting is board-ready and the operational follow-through is excellent.',
    author: 'Owen Miller',
    role: 'Procurement Lead',
    company: 'Vertex Machinery Group',
    avatar: 'OM',
    rating: 5
  }
];

export default function Testimonials() {
  const marqueeReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section id="testimonials" className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-navy-50 dark:bg-navy-950/80 border-t border-navy-200/20 dark:border-navy-900/30 transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_12%_15%,rgba(9,63,109,0.12),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(14,165,233,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_12%_15%,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(9,63,109,0.22),transparent_30%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3 sm:mb-16 sm:space-y-4">
          <h2 className="font-heading font-extrabold text-xs uppercase tracking-widest text-orange-primary dark:text-orange-light">
            Client Success
          </h2>
          <p className="font-heading font-extrabold text-2xl sm:text-4xl text-navy-900 dark:text-white tracking-tight">
            Trusted by Supply Chain Leaders
          </p>
          <p className="hidden text-navy-600 dark:text-navy-300 text-base max-w-xl mx-auto font-normal sm:block">
            Read how global enterprises optimize their shipping schedules, budgets, and emissions goals.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <div className="testimonial-marquee relative">
          <div className="testimonial-marquee__fade testimonial-marquee__fade--left" />
          <div className="testimonial-marquee__fade testimonial-marquee__fade--right" />

          <div className="testimonial-marquee__track">
            {marqueeReviews.map((review, index) => (
              <article
                key={`${review.author}-${index}`}
                className="testimonial-card glass-card relative flex min-h-[270px] w-[260px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/60 p-5 text-left shadow-[0_18px_44px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(15,23,42,0.16)] sm:min-h-[330px] sm:w-[380px] sm:p-7 dark:border-white/10 dark:shadow-[0_22px_70px_rgba(0,0,0,0.25)]"
              >
                <div className="absolute -right-4 -top-4 grid h-16 w-16 place-items-center rounded-full bg-orange-light/70 text-orange-primary shadow-inner dark:bg-navy-900/80 dark:text-orange-light sm:-right-5 sm:-top-5 sm:h-20 sm:w-20">
                  <Quote className="h-7 w-7 sm:h-9 sm:w-9" />
                </div>

                <div className="relative space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-1.5" aria-label={`${review.rating} star rating`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-orange-primary text-orange-primary sm:h-4 sm:w-4 dark:fill-orange-light dark:text-orange-light" />
                      ))}
                    </div>
                    <span className="hidden rounded-full border border-navy-200/70 bg-white/55 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-navy-500 dark:border-navy-700/60 dark:bg-navy-900/45 dark:text-navy-300 sm:inline-flex">
                      Verified Client
                    </span>
                  </div>

                  <p className="testimonial-card__quote text-sm leading-6 text-navy-700 sm:text-[15px] sm:leading-7 dark:text-navy-200">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="relative mt-6 flex items-center gap-3 border-t border-navy-200/60 pt-4 sm:mt-8 sm:gap-4 sm:pt-5 dark:border-navy-800/70">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-navy-950 via-orange-primary to-sky-400 text-xs font-extrabold text-white shadow-lg shadow-navy-900/15 ring-4 ring-white/70 sm:h-12 sm:w-12 sm:text-sm dark:ring-navy-900/80">
                    {review.avatar}
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-extrabold text-navy-950 dark:text-white">{review.author}</h4>
                    <p className="hidden truncate text-xs font-medium text-navy-500 sm:block dark:text-navy-400">{review.role}</p>
                    <p className="truncate text-xs font-extrabold text-orange-primary dark:text-orange-light">{review.company}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
