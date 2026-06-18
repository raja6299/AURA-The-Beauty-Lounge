import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Bridal Studio | AURA The Beauty Lounge',
  description: 'Premium HD & Airbrush bridal makeup in Bettiah. Book your luxury bridal package and consultation with AURA The Beauty Lounge.',
  alternates: {
    canonical: '/bridal',
  },
  openGraph: {
    title: 'Luxury Bridal Studio | AURA',
    description: 'Bespoke bridal makeovers for your special day.',
    url: 'https://aurabeautylounge.in/bridal',
    type: 'website',
  }
};

const bridalPackages = [
  {
    name: 'The Royal Canvas (HD Makeup)',
    price: '₹14,999',
    features: ['Premium HD Makeup', 'Advanced Hairstyling', 'Saree/Lehenga Draping', 'Nail Paint', 'Premium Lashes']
  },
  {
    name: 'The Flawless Aura (Airbrush)',
    price: '₹19,999',
    features: ['Luxury Airbrush Makeup', 'Advanced Hairstyling', 'Saree/Lehenga Draping', 'Gel Polish', 'Luxury Mink Lashes', 'Trial Consultation']
  },
  {
    name: 'The Essential Bride',
    price: '₹9,999',
    features: ['Classic Bridal Makeup', 'Basic Hairstyling', 'Draping', 'Nail Paint']
  }
];

export default function BridalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Bridal Makeup",
    "provider": {
      "@type": "BeautySalon",
      "name": "AURA The Beauty Lounge"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bettiah"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "The Royal Canvas (HD Makeup)",
        "price": "14999",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "name": "The Flawless Aura (Airbrush)",
        "price": "19999",
        "priceCurrency": "INR"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-ivory min-h-screen pb-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center bg-luxury-black overflow-hidden">
          <Image 
            src="/images/bridal-hero-large.jpg" 
            alt="Bridal Makeup AURA"
            fill
            className="object-cover opacity-50 object-top"
            priority
          />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="font-sans text-xs tracking-widest uppercase text-champagne-gold mb-6 inline-block bg-luxury-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-champagne-gold/20">
              The Ultimate Transformation
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-ivory mb-6 drop-shadow-2xl">
              Bridal Studio
            </h1>
            <p className="font-sans text-lg text-ivory/90 font-light max-w-2xl mx-auto mb-8">
              Where your dream look becomes reality. Specializing in flawless HD and Airbrush makeup techniques for the modern bride.
            </p>
            <Link 
              href="#consultation" 
              className="px-8 py-4 bg-rose-gold text-luxury-black font-sans font-medium tracking-widest uppercase text-sm hover:bg-ivory hover:text-deep-plum transition-all duration-300 shadow-[0_0_20px_rgba(212,163,115,0.3)] inline-block"
            >
              Book a Consultation
            </Link>
          </div>
        </section>

        {/* Timeline & Philosophy */}
        <section className="py-24 container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-deep-plum mb-4">The Bridal Journey</h2>
            <div className="w-16 h-1 bg-rose-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-warm-beige border-2 border-champagne-gold flex items-center justify-center text-xl font-heading text-deep-plum">1</div>
              <h3 className="font-heading text-2xl font-bold text-luxury-black">Consultation & Trial</h3>
              <p className="font-sans text-luxury-black/70 font-light">We discuss your outfit, jewelry, and vision to design a look that perfectly complements your style.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-warm-beige border-2 border-champagne-gold flex items-center justify-center text-xl font-heading text-deep-plum">2</div>
              <h3 className="font-heading text-2xl font-bold text-luxury-black">Pre-Bridal Glow</h3>
              <p className="font-sans text-luxury-black/70 font-light">Customized skin and hair treatments starting weeks before to ensure a flawless canvas.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-warm-beige border-2 border-champagne-gold flex items-center justify-center text-xl font-heading text-deep-plum">3</div>
              <h3 className="font-heading text-2xl font-bold text-luxury-black">The Big Day</h3>
              <p className="font-sans text-luxury-black/70 font-light">Relax in our VIP bridal suite while our expert artists craft your signature look.</p>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-24 bg-warm-beige border-t border-b border-champagne-gold/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="font-sans text-xs tracking-widest uppercase text-deep-plum mb-4 inline-block">
                Curated For You
              </span>
              <h2 className="font-heading text-4xl font-bold text-luxury-black mb-4">Bridal Packages</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {bridalPackages.map((pkg, i) => (
                <div key={i} className={`bg-white p-8 border ${i === 1 ? 'border-rose-gold shadow-xl relative transform md:-translate-y-4' : 'border-champagne-gold/30 shadow-md'} flex flex-col h-full`}>
                  {i === 1 && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-gold text-white px-4 py-1 font-sans text-xs uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-heading text-2xl font-bold text-deep-plum mb-2 text-center">{pkg.name}</h3>
                  <p className="font-sans text-xl font-semibold text-rose-gold text-center mb-8 pb-8 border-b border-black/5">{pkg.price}</p>
                  <ul className="space-y-4 font-sans text-luxury-black/80 font-light flex-grow mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="text-champagne-gold">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="#consultation" 
                    className={`w-full py-4 text-center font-sans font-medium tracking-widest uppercase text-xs transition-colors duration-300 ${i === 1 ? 'bg-deep-plum text-ivory hover:bg-luxury-black' : 'border border-deep-plum text-deep-plum hover:bg-deep-plum hover:text-ivory'}`}
                  >
                    Select Package
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Form */}
        <section id="consultation" className="py-24 container mx-auto px-4 max-w-3xl">
          <div className="bg-white p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-champagne-gold/20">
            <h2 className="font-heading text-3xl font-bold text-luxury-black mb-4 text-center">Book Your Free Trial & Consultation</h2>
            <p className="font-sans text-center text-luxury-black/60 mb-8 font-light">
              Leave your details below and our Bridal Coordinator will reach out to schedule your personalized session.
            </p>

            <form className="space-y-6" action="/api/bridal-consult" method="POST">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Bride&apos;s Name</label>
                  <input type="text" required className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Phone Number</label>
                  <input type="tel" required className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Wedding Date</label>
                  <input type="date" className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans text-luxury-black/80" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Preferred Package</label>
                  <select className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans text-luxury-black/80">
                    <option value="">Undecided / Need Help</option>
                    <option value="hd">The Royal Canvas (HD)</option>
                    <option value="airbrush">The Flawless Aura (Airbrush)</option>
                    <option value="essential">The Essential Bride</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Additional Details (Venue, Events)</label>
                <textarea rows={3} className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans resize-none" />
              </div>

              <button type="submit" className="w-full py-5 bg-rose-gold text-luxury-black font-sans font-semibold tracking-widest uppercase text-sm hover:bg-champagne-gold transition-colors duration-300">
                Request Consultation
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
