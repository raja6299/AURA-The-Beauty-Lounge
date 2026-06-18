'use client';
import { FadeIn } from '../ui/FadeIn';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const offers = [
  { id: 1, image: '/images/promo-bridal-1.jpg', alt: 'Bridal Offer 1' },
  { id: 2, image: '/images/promo-bridal-2.jpg', alt: 'Bridal Offer 2' },
  { id: 3, image: '/images/promo-eid-female.jpg', alt: 'Eid Offer Female' },
  { id: 4, image: '/images/promo-eid-male.jpg', alt: 'Eid Offer Male' },
];

export default function OffersPromo() {
  return (
    <section className="py-24 bg-luxury-black border-y border-champagne-gold/30">
      <div className="container mx-auto px-4">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-champagne-gold mb-4 inline-block">
              Exclusive Offers
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-ivory mb-6">
              Festive & Bridal Specials
            </h2>
            <div className="w-16 h-[2px] bg-rose-gold mx-auto mb-8" />
            <p className="text-ivory/70 font-sans max-w-2xl mx-auto">
              Discover our exclusive packages designed to give you the ultimate luxury experience at AURA. 
              Limited time offers for this festive season.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} className="max-w-5xl mx-auto px-12">
          <Carousel opts={{ align: "center", loop: true }} className="w-full">
            <CarouselContent>
              {offers.map((offer) => (
                <CarouselItem key={offer.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <div className="relative aspect-[3/4] rounded-md overflow-hidden shadow-2xl border border-rose-gold/20 group">
                      <Image 
                        src={offer.image} 
                        alt={offer.alt} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-rose-gold text-rose-gold bg-transparent hover:bg-rose-gold hover:text-luxury-black" />
            <CarouselNext className="hidden md:flex -right-12 border-rose-gold text-rose-gold bg-transparent hover:bg-rose-gold hover:text-luxury-black" />
          </Carousel>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.4}>
          <div className="text-center mt-16">
            <Link 
              href="/offers" 
              className="inline-block px-10 py-4 border border-rose-gold text-rose-gold font-sans font-medium tracking-widest uppercase text-xs hover:bg-rose-gold hover:text-luxury-black transition-colors duration-500"
            >
              View All Offers
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
