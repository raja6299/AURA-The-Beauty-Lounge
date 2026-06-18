import Link from 'next/link';
import Image from 'next/image';
import { FadeIn } from '../ui/FadeIn';

const services = [
  {
    id: 'hair',
    title: 'Hair Styling & Color',
    description: 'Transform your look with our expert hair stylists.',
    image: '/images/hair.jpg',
    href: '/services#hair',
  },
  {
    id: 'skin',
    title: 'Advanced Skin Care',
    description: 'Rejuvenating facials and treatments for glowing skin.',
    image: '/images/skin.jpg',
    href: '/services#skin',
  },
  {
    id: 'nails',
    title: 'Luxury Nail Studio',
    description: 'Beautiful nail art, extensions, and care.',
    image: '/images/nails.jpg',
    href: '/services#nails',
  },
];

export default function ServicesShowcase() {
  return (
    <section className="py-32 bg-ivory relative">
      <div className="container mx-auto px-4">
        <FadeIn direction="up">
          <div className="text-center mb-20">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-champagne-gold mb-4 inline-block">
              Our Offerings
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-black mb-6">
              Premium Services
            </h2>
            <div className="w-16 h-[2px] bg-rose-gold mx-auto" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <FadeIn key={service.id} direction="up" delay={index * 0.2}>
              <Link href={service.href} className="group block">
                <div className="relative h-[450px] overflow-hidden mb-6 bg-warm-beige rounded-sm">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-luxury-black/10 group-hover:bg-luxury-black/30 transition-colors duration-700" />
                  
                  {/* Glassmorphism accent on hover */}
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-luxury-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-luxury-black mb-3 group-hover:text-rose-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-sans text-luxury-black/70 font-light mb-4">
                  {service.description}
                </p>
                <span className="font-sans text-xs font-medium uppercase tracking-widest text-champagne-gold flex items-center gap-2 group-hover:text-rose-gold transition-colors duration-300">
                  Discover More 
                  <span className="block transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn direction="up" delay={0.4}>
          <div className="text-center mt-20">
            <Link 
              href="/services" 
              className="inline-block px-12 py-4 border border-luxury-black text-luxury-black font-sans font-medium tracking-widest uppercase text-xs hover:bg-luxury-black hover:text-ivory transition-colors duration-500"
            >
              View All Services
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
