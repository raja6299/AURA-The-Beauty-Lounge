import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Offers & Packages | AURA The Beauty Lounge',
  description: 'Explore exclusive seasonal offers, bridal packages, and luxury memberships at AURA The Beauty Lounge in Bettiah.',
  alternates: {
    canonical: '/offers',
  },
  openGraph: {
    title: 'Exclusive Offers | AURA',
    description: 'Special beauty salon deals and packages.',
    url: 'https://aurabeautylounge.in/offers',
    type: 'website',
  }
};

const promotionalOffers = [
  {
    id: 1,
    type: 'Bridal Offer',
    title: 'HD Bridal Makeup Package',
    description: 'Exclusive HD Bridal Makeup just at ₹9,999 with complimentary 2 party makeup.',
    validUntil: 'Limited Time',
    image: '/images/promo-bridal-1.jpg',
    discount: '₹9,999 Only'
  },
  {
    id: 2,
    type: 'Bridal Series',
    title: 'Premium Bridal Services',
    description: 'Straightening/Keratin from ₹3,499. Botox/Nanoplastia from ₹3,999. Manicure & Pedicure ₹899.',
    validUntil: 'Limited Time',
    image: '/images/promo-bridal-2.jpg',
    discount: 'Special Rates'
  },
  {
    id: 3,
    type: 'Festive Offer',
    title: 'Eid Mubarak - Female',
    description: 'Pure Bliss, Ultimate Escape, and Radiant Rituals starting from just ₹999.',
    validUntil: 'Eid Special',
    image: '/images/promo-eid-female.jpg',
    discount: 'From ₹999'
  },
  {
    id: 4,
    type: 'Festive Offer',
    title: 'Eid Mubarak - Male',
    description: 'Special Eid grooming packages for men. Haircut, beard styling, and spa rituals starting at ₹599.',
    validUntil: 'Eid Special',
    image: '/images/promo-eid-male.jpg',
    discount: 'From ₹599'
  }
];

export default function OffersPage() {
  return (
    <div className="bg-ivory min-h-screen pb-24">
      <section className="pt-32 pb-16 bg-luxury-black text-center border-b border-rose-gold/20">
        <div className="container mx-auto px-4 relative z-10">
          <span className="font-sans text-xs tracking-widest uppercase text-champagne-gold mb-4 inline-block">
            Exclusive Benefits
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-ivory mb-6">
            Offers & Packages
          </h1>
          <p className="font-sans text-ivory/70 max-w-2xl mx-auto font-light">
            Indulge in luxury without compromise. Discover our curated packages designed to give you the ultimate AURA experience.
          </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promotionalOffers.map((offer) => (
            <div key={offer.id} className="bg-white border border-champagne-gold/20 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col group rounded-md overflow-hidden">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-warm-beige">
                <Image 
                  src={offer.image} 
                  alt={offer.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-4 left-4 bg-luxury-black/90 backdrop-blur-sm text-champagne-gold px-3 py-1 font-sans text-[10px] uppercase tracking-widest">
                  {offer.type}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading text-xl font-bold text-deep-plum mb-2">{offer.title}</h3>
                <p className="font-sans text-xs text-luxury-black/70 font-light mb-4 flex-grow">{offer.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-black/5 mt-auto">
                  <div>
                    <span className="block font-sans text-[10px] text-luxury-black/50 uppercase">{offer.validUntil}</span>
                    <span className="block font-sans text-sm font-bold text-rose-gold">{offer.discount}</span>
                  </div>
                  <Link 
                    href="/booking" 
                    className="px-4 py-2 text-xs border border-champagne-gold text-deep-plum hover:bg-rose-gold hover:text-white transition-colors"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center bg-warm-beige p-12 border border-champagne-gold/30">
          <h2 className="font-heading text-3xl font-bold text-deep-plum mb-4">Want a Custom Package?</h2>
          <p className="font-sans text-luxury-black/70 font-light mb-8 max-w-2xl mx-auto">
            We understand that everyone&apos;s beauty needs are unique. Contact us directly to curate a bespoke package tailored perfectly for you.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-10 py-4 bg-luxury-black text-ivory font-sans font-medium tracking-widest uppercase text-sm hover:bg-rose-gold transition-colors duration-300"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}
