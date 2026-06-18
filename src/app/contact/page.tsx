import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | AURA The Beauty Lounge',
  description: 'Book your appointment or get in touch with AURA The Beauty Lounge in Bettiah, Bihar. Premium unisex salon services, bridal makeup, and luxury spa.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | AURA The Beauty Lounge',
    description: 'Get in touch to book your luxury salon experience in Bettiah.',
    url: 'https://aurabeautylounge.in/contact',
    siteName: 'AURA The Beauty Lounge',
    type: 'website',
  }
};

import { FadeIn } from '@/components/ui/FadeIn';

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "AURA The Beauty Lounge",
    "image": "https://aurabeautylounge.in/images/logo.jpg",
    "url": "https://aurabeautylounge.in",
    "telephone": "+917870924305",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1st Floor, Supriya Road, Opposite Bishop's House, Shastri Nagar",
      "addressLocality": "Bettiah",
      "addressRegion": "Bihar",
      "postalCode": "845438",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8000, // Replace with exact
      "longitude": 84.5000 // Replace with exact
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-ivory min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-luxury-black text-center border-b border-rose-gold/20">
          <FadeIn direction="up" className="container mx-auto px-4 relative z-10">
            <span className="font-sans text-xs tracking-widest uppercase text-champagne-gold mb-4 inline-block">
              Get in Touch
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-ivory mb-6">
              Contact AURA
            </h1>
          </FadeIn>
        </section>

        <section className="py-20 container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
            
            {/* Contact Info & Hours */}
            <FadeIn direction="right" className="w-full lg:w-1/3 space-y-12">
              <div>
                <h3 className="font-heading text-2xl font-bold text-deep-plum mb-4">Visit Us</h3>
                <p className="font-sans text-luxury-black/80 font-light leading-relaxed">
                  AURA The Beauty Lounge<br />
                  1st Floor, Supriya Road,<br />
                  Opposite Bishop&apos;s House, Shastri Nagar,<br />
                  Bettiah, Bihar 845438
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-deep-plum mb-4">Contact</h3>
                <div className="flex flex-col gap-4">
                  <a 
                    href="tel:+917870924305" 
                    className="flex items-center gap-4 text-luxury-black/80 hover:text-rose-gold transition-colors font-sans"
                  >
                    <span className="w-10 h-10 rounded-full bg-warm-beige flex items-center justify-center border border-champagne-gold/50">
                      📞
                    </span>
                    +91 78709 24305
                  </a>
                  <a 
                    href="https://wa.me/917870924305" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-luxury-black/80 hover:text-green-600 transition-colors font-sans"
                  >
                    <span className="w-10 h-10 rounded-full bg-warm-beige flex items-center justify-center border border-champagne-gold/50">
                      💬
                    </span>
                    WhatsApp Us
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-deep-plum mb-4">Hours</h3>
                <ul className="font-sans text-luxury-black/80 font-light space-y-2">
                  <li className="flex justify-between border-b border-black/5 pb-2">
                    <span>Monday - Sunday</span>
                    <span>10:00 AM - 8:00 PM</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn direction="left" delay={0.2} className="w-full lg:w-2/3">
              <div className="bg-white p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-champagne-gold/20">
                <h3 className="font-heading text-3xl font-bold text-luxury-black mb-2">Send an Inquiry</h3>
                <p className="font-sans text-sm text-luxury-black/60 mb-8">
                  Whether you have a question about our services or want to book an appointment, our team is here to assist you.
                </p>

                <form className="space-y-6" action="/api/contact" method="POST">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required
                        className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Interested Service</label>
                    <select 
                      id="service" 
                      name="service"
                      className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans text-luxury-black/80"
                    >
                      <option value="">Select a Service...</option>
                      <option value="bridal">Bridal Makeup</option>
                      <option value="hair">Hair Styling & Treatment</option>
                      <option value="skin">Skin Care & Facials</option>
                      <option value="nails">Nails & Spa</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4}
                      className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-deep-plum text-ivory font-sans font-medium tracking-widest uppercase text-sm hover:bg-rose-gold hover:text-luxury-black transition-colors duration-300"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* Map Section */}
        <section className="h-[400px] w-full bg-warm-beige relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113883.6934522851!2d84.42629615201083!3d26.800045580196237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39936e7a2b00cdcd%3A0xc6de91de04a4c483!2sBettiah%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="AURA The Beauty Lounge Location Map"
          />
        </section>
      </div>
    </>
  );
}
