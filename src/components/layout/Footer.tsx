import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-luxury-black text-ivory py-16 border-t border-rose-gold/20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-heading text-2xl font-bold tracking-wider mb-6 text-rose-gold">
            AURA
          </h3>
          <p className="font-sans text-sm text-ivory/70 leading-relaxed">
            Enhancing Beauty, Inspiring Confidence. Experience premium beauty & wellness services in Bettiah.
          </p>
        </div>
        
        <div>
          <h4 className="font-sans text-sm font-semibold tracking-widest uppercase mb-6 text-champagne-gold">
            Quick Links
          </h4>
          <ul className="space-y-3 font-sans text-sm text-ivory/70">
            <li><Link href="/about" className="hover:text-rose-gold transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-rose-gold transition-colors">Our Services</Link></li>
            <li><Link href="/bridal" className="hover:text-rose-gold transition-colors">Bridal Studio</Link></li>
            <li><Link href="/gallery" className="hover:text-rose-gold transition-colors">Gallery</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-sans text-sm font-semibold tracking-widest uppercase mb-6 text-champagne-gold">
            Contact
          </h4>
          <ul className="space-y-3 font-sans text-sm text-ivory/70">
            <li>1st Floor, Supriya Road</li>
            <li>Beside Ashtavinayak Hospital</li>
            <li>Bettiah, Bihar 845438</li>
            <li>+91 78709 24305</li>
            <li>+91 73210 16207</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-sans text-sm font-semibold tracking-widest uppercase mb-6 text-champagne-gold">
            Hours
          </h4>
          <ul className="space-y-3 font-sans text-sm text-ivory/70">
            <li>Mon - Sun: 10:00 AM - 8:00 PM</li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-ivory/10 text-center font-sans text-xs text-ivory/50">
        <p>&copy; {new Date().getFullYear()} AURA The Beauty Lounge. All rights reserved.</p>
      </div>
    </footer>
  );
}
