import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-rose-gold/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden shadow-sm">
            <Image src="/images/logo.jpg" alt="AURA The Beauty Lounge Logo" fill className="object-cover" priority />
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm tracking-wide">
          <Link href="/" className="hover:text-rose-gold transition-colors">Home</Link>
          <Link href="/about" className="hover:text-rose-gold transition-colors">About</Link>
          <Link href="/services" className="hover:text-rose-gold transition-colors">Services</Link>
          <Link href="/bridal" className="hover:text-rose-gold transition-colors">Bridal Studio</Link>
          <Link href="/gallery" className="hover:text-rose-gold transition-colors">Gallery</Link>
          <Link href="/offers" className="hover:text-rose-gold transition-colors">Offers</Link>
          <Link href="/contact" className="hover:text-rose-gold transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-6 py-2 bg-luxury-black text-ivory hover:bg-rose-gold transition-colors duration-300 font-sans text-sm tracking-wider">
            BOOK APPOINTMENT
          </button>
          
          {/* Mobile Menu Toggle (to be implemented with ShadCN) */}
          <button className="md:hidden p-2 text-luxury-black dark:text-ivory">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
