'use client';
import { useEffect, useState } from 'react';

const stats = [
  { id: 1, name: 'Happy Clients', value: 5000, suffix: '+' },
  { id: 2, name: 'Bridal Makeovers', value: 800, suffix: '+' },
  { id: 3, name: 'Beauty Treatments', value: 12000, suffix: '+' },
  { id: 4, name: 'Years of Experience', value: 10, suffix: '+' },
];

import { FadeIn } from '../ui/FadeIn';

export default function Stats() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Simple intersection observer to trigger animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-20 bg-warm-beige border-y border-champagne-gold/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeIn direction="up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-deep-plum mb-2">
                  {inView ? stat.value : '0'}{stat.suffix}
                </div>
                <p className="font-sans text-sm md:text-base font-medium tracking-wider text-luxury-black/70 uppercase">
                  {stat.name}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
