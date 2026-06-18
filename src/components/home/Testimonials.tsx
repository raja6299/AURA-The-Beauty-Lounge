'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FadeIn } from "../ui/FadeIn";

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Bridal Client',
    text: 'AURA The Beauty Lounge made my wedding day incredibly special. The HD makeup was flawless and lasted all night. Highly recommend their bridal packages!',
    rating: 5,
    image: '/images/user-img-2.jpg'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Regular Client',
    text: 'Best unisex salon in Bettiah! The ambiance is so luxurious and relaxing. I always come here for my haircut and beard grooming.',
    rating: 5,
    image: '/images/user-img-3.jpg'
  },
  {
    id: 3,
    name: 'Sneha Singh',
    role: 'Skin Care Client',
    text: 'The facial treatments here are amazing. My skin has never looked better. The staff is very professional and uses premium products.',
    rating: 5,
    image: '/images/user-img-4.jpg'
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-ivory">
      <div className="container mx-auto px-4">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-champagne-gold mb-4 inline-block">
              Client Stories
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-black mb-6">
              Words of Love
            </h2>
            <div className="w-16 h-[2px] bg-rose-gold mx-auto" />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} className="max-w-4xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <div className="p-8 bg-white border border-champagne-gold/20 shadow-[0_10px_40px_rgba(0,0,0,0.03)] h-full flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-rose-gold fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="font-sans font-light text-luxury-black/80 leading-relaxed mb-8 italic">
                        &quot;{testimonial.text}&quot;
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden relative bg-warm-beige">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-deep-plum text-lg">{testimonial.name}</h4>
                        <p className="font-sans text-xs text-luxury-black/50 uppercase tracking-wider">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-none bg-transparent hover:bg-transparent hover:text-rose-gold text-luxury-black/40 scale-150" />
            <CarouselNext className="hidden md:flex -right-12 border-none bg-transparent hover:bg-transparent hover:text-rose-gold text-luxury-black/40 scale-150" />
          </Carousel>
        </FadeIn>
      </div>
    </section>
  );
}
