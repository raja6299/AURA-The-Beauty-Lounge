

export default function AboutPage() {
  return (
    <div className="bg-ivory pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-luxury-black overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/about-hero.jpg")' }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-ivory mb-4">
            Our Story
          </h1>
          <div className="w-24 h-1 bg-rose-gold mx-auto" />
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 container mx-auto px-4 max-w-4xl text-center">
        <span className="font-sans text-xs tracking-widest uppercase text-champagne-gold mb-4 inline-block">
          The Philosophy
        </span>
        <h2 className="font-heading text-4xl font-bold text-deep-plum mb-8">
          Enhancing Beauty, Inspiring Confidence
        </h2>
        <p className="font-sans text-luxury-black/80 leading-relaxed text-lg mb-8 font-light">
          Located in the heart of Bettiah, AURA The Beauty Lounge was founded with a singular vision: 
          to provide world-class, luxury beauty and wellness services that cater to both men and women. 
          We believe that beauty is an expression of self-love, and our mission is to create a sanctuary 
          where you can relax, rejuvenate, and discover your best self.
        </p>
        <p className="font-sans text-luxury-black/80 leading-relaxed text-lg font-light">
          Our team of highly skilled professionals uses only premium products and state-of-the-art 
          techniques to deliver personalized care. Whether you are preparing for your wedding day 
          or seeking a routine touch-up, every visit to AURA is an experience in indulgence.
        </p>
      </section>

      {/* The Environment */}
      <section className="bg-warm-beige py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-4xl font-bold text-deep-plum mb-6">
              A Sanctuary of Elegance
            </h2>
            <p className="font-sans text-luxury-black/80 leading-relaxed mb-6">
              Step into an environment designed to soothe your senses. Our lounge features 
              modern, hygienic, and aesthetically pleasing interiors that reflect our commitment 
              to excellence. With dedicated zones for hair, skin, nails, and a private spa for 
              women, we ensure absolute comfort and privacy.
            </p>
            <ul className="space-y-4 font-sans text-luxury-black/90">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-gold" />
                Hygienic & Sanitized Tools
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-gold" />
                Premium International Brands
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-gold" />
                Relaxing Ambience & Music
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 h-[400px] relative bg-ivory">
             <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/images/salon-interior.jpg")' }}
              />
          </div>
        </div>
      </section>
    </div>
  );
}
