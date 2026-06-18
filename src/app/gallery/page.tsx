'use client';
import { useState } from 'react';
import Image from 'next/image';

const galleryCategories = ['All', 'Bridal', 'Hair', 'Makeup', 'Nails', 'Salon Interior'];

// Mock data - CMS Ready
const galleryItems = [
  { id: 1, category: 'Bridal', src: '/images/gallery-1.jpg', alt: 'Bridal HD Makeup' },
  { id: 2, category: 'Hair', src: '/images/gallery-2.jpg', alt: 'Balayage Hair Color' },
  { id: 3, category: 'Makeup', src: '/images/gallery-3.jpg', alt: 'Party Makeup' },
  { id: 4, category: 'Nails', src: '/images/gallery-4.jpg', alt: 'Gel Nail Art' },
  { id: 5, category: 'Bridal', src: '/images/gallery-5.jpg', alt: 'Airbrush Bridal' },
  { id: 6, category: 'Salon Interior', src: '/images/gallery-6.jpg', alt: 'Luxury Salon Chair' },
  { id: 7, category: 'Hair', src: '/images/gallery-7.jpg', alt: 'Keratin Treatment' },
  { id: 8, category: 'Makeup', src: '/images/gallery-8.jpg', alt: 'Evening Glam' },
  { id: 9, category: 'Nails', src: '/images/gallery-9.jpg', alt: 'Acrylic Extensions' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-ivory text-center">
        <div className="container mx-auto px-4">
          <span className="font-sans text-xs tracking-widest uppercase text-champagne-gold mb-4 inline-block">
            Our Portfolio
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-luxury-black mb-6">
            The AURA Gallery
          </h1>
          <div className="w-16 h-1 bg-rose-gold mx-auto" />
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="pb-12 container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {galleryCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-sm uppercase tracking-widest transition-colors duration-300 pb-2 border-b-2 ${
                activeCategory === cat 
                  ? 'border-rose-gold text-deep-plum font-semibold' 
                  : 'border-transparent text-luxury-black/50 hover:text-luxury-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry/Grid Gallery */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="relative aspect-square md:aspect-[4/5] overflow-hidden group cursor-pointer bg-warm-beige"
              onClick={() => setLightboxImage(item.src)}
            >
              <Image 
                src={item.src} 
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/40 transition-colors duration-500 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans tracking-widest uppercase text-xs">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-luxury-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white hover:text-rose-gold transition-colors text-4xl font-light"
            onClick={() => setLightboxImage(null)}
          >
            &times;
          </button>
          <div className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[80vh]">
            <Image 
              src={lightboxImage} 
              alt="Expanded view" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
