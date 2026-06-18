'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-luxury-black">
      {/* Background Image with Next/Image for optimization */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-bg.jpg" 
          alt="AURA The Beauty Lounge Premium Interior"
          fill
          priority
          className="object-cover object-center opacity-50 scale-105 motion-safe:animate-[pulse_10s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/80 via-luxury-black/30 to-luxury-black" />
      </div>

      <motion.div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span 
          variants={itemVariants}
          className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-champagne-gold mb-6 inline-block bg-luxury-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-champagne-gold/20"
        >
          Welcome to AURA The Beauty Lounge
        </motion.span>
        
        <motion.h1 
          variants={itemVariants}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-ivory font-bold leading-tight mb-6 drop-shadow-2xl"
        >
          Elevating Beauty in <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-gold via-champagne-gold to-rose-gold">
            Bettiah
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="font-sans text-lg md:text-xl text-ivory/90 max-w-2xl mx-auto mb-10 font-light tracking-wide leading-relaxed drop-shadow-md"
        >
          Experience Bettiah&apos;s premier luxury unisex salon. From exquisite bridal makeovers to advanced skin rituals and bespoke hair styling.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-auto"
        >
          <Link 
            href="/booking" 
            className="px-8 py-4 bg-rose-gold text-luxury-black font-sans font-medium tracking-widest uppercase text-sm hover:bg-ivory hover:text-deep-plum transition-all duration-500 w-full sm:w-auto text-center shadow-[0_0_20px_rgba(212,163,115,0.3)] hover:shadow-[0_0_30px_rgba(255,249,243,0.5)] transform hover:-translate-y-1"
          >
            Book Appointment
          </Link>
          <Link 
            href="/services" 
            className="px-8 py-4 bg-transparent border border-champagne-gold text-champagne-gold font-sans font-medium tracking-widest uppercase text-sm hover:bg-champagne-gold/10 transition-all duration-500 w-full sm:w-auto text-center backdrop-blur-sm"
          >
            Explore Services
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] uppercase tracking-widest text-ivory/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-champagne-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
}
