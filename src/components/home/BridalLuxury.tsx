import Link from 'next/link';
import Image from 'next/image';
import { FadeIn } from '../ui/FadeIn';

const timelineSteps = [
  { id: 1, title: 'Consultation', desc: 'Discuss your vision and style.' },
  { id: 2, title: 'Pre-Bridal Rituals', desc: 'Skin & hair treatments for a natural glow.' },
  { id: 3, title: 'The Big Day', desc: 'Flawless HD/Airbrush makeup application.' }
];

export default function BridalLuxury() {
  return (
    <section className="py-32 bg-warm-beige relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          <FadeIn direction="right" className="w-full lg:w-1/2 relative">
            <div className="relative h-[700px] w-full max-w-lg mx-auto">
              <Image 
                src="/images/bridal-hero.jpg" 
                alt="AURA The Beauty Lounge Bridal Makeup"
                fill
                className="object-cover object-center shadow-2xl z-10 rounded-sm"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute -inset-6 border border-champagne-gold z-0 translate-x-6 translate-y-6" />
              <div className="absolute -inset-6 border border-rose-gold/40 z-0 -translate-x-6 -translate-y-6" />
              
              {/* Glassmorphism badge */}
              <div className="absolute bottom-10 -left-10 z-20 bg-ivory/80 backdrop-blur-md p-6 shadow-xl border border-ivory">
                <p className="font-heading text-4xl font-bold text-deep-plum">HD & Airbrush</p>
                <p className="font-sans text-xs uppercase tracking-widest text-champagne-gold mt-1">Bridal Specialization</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left" className="w-full lg:w-1/2">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-champagne-gold mb-4 inline-block">
              Exclusive Experience
            </span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-deep-plum mb-8 leading-tight">
              The Bridal <br/> Luxury Journey
            </h2>
            <p className="font-sans text-luxury-black/70 font-light leading-relaxed mb-12 text-lg">
              Your wedding day is one of the most important days of your life. 
              At AURA The Beauty Lounge, our bespoke bridal packages are designed 
              to make you feel like royalty. From pre-bridal skin rituals to the 
              perfect flawless finish on your big day.
            </p>
            
            <div className="mb-12 relative border-l border-champagne-gold/30 ml-3 pl-8 space-y-10">
              {timelineSteps.map((step, idx) => (
                <FadeIn key={step.id} direction="up" delay={idx * 0.2} className="relative">
                  <span className="absolute -left-[45px] top-1 w-6 h-6 rounded-full bg-warm-beige border border-rose-gold flex items-center justify-center font-sans text-xs text-deep-plum">
                    {step.id}
                  </span>
                  <h4 className="font-heading text-2xl font-bold text-luxury-black mb-1">{step.title}</h4>
                  <p className="font-sans text-luxury-black/60 font-light">{step.desc}</p>
                </FadeIn>
              ))}
            </div>
            
            <Link 
              href="/bridal" 
              className="inline-block px-12 py-5 bg-deep-plum text-ivory font-sans font-medium tracking-widest uppercase text-xs hover:bg-rose-gold hover:text-luxury-black transition-colors duration-500 shadow-xl"
            >
              Book Consultation
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
