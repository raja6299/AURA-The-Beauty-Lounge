import Link from 'next/link';

const serviceCategories = [
  {
    title: 'Hair Services',
    id: 'hair',
    items: [
      { name: 'Luxury Haircut & Styling', price: '₹599+' },
      { name: 'Global Hair Color', price: '₹3,499+' },
      { name: 'Balayage / Highlights', price: '₹4,999+' },
      { name: 'Keratin / Smoothening', price: '₹3,499+' },
      { name: 'Botox / Nanoplastia', price: '₹3,999+' },
      { name: 'Hair Spa (Ultimate Escape)', price: '₹1,499' },
    ]
  },
  {
    title: 'Skin Care',
    id: 'skin',
    items: [
      { name: 'Premium Facial', price: '₹1,799+' },
      { name: 'De-Tan Treatment', price: '₹499+' },
      { name: 'Deep Clean-up', price: '₹999' },
      { name: 'Radiant Rituals', price: '₹1,499' },
    ]
  },
  {
    title: 'Nails & Spa',
    id: 'nails',
    items: [
      { name: 'Manicure & Pedicure', price: '₹899' },
      { name: 'Gel Nail Extensions', price: '₹1,499+' },
      { name: 'Nail Art (Per Finger)', price: '₹100+' },
      { name: 'Full Body Spa (Female)', price: '₹2,499+' },
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-ivory pb-24">
      {/* Hero Section */}
      <section className="relative py-24 bg-luxury-black text-center border-b border-rose-gold/20">
        <div className="container mx-auto px-4 relative z-10">
          <span className="font-sans text-xs tracking-widest uppercase text-champagne-gold mb-4 inline-block">
            Menu of Services
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-ivory mb-6">
            Indulge in Luxury
          </h1>
          <p className="font-sans text-ivory/70 max-w-2xl mx-auto font-light">
            Discover our curated selection of premium beauty treatments designed to elevate your style and rejuvenate your spirit.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {serviceCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-32">
                <h2 className="font-heading text-3xl font-bold text-deep-plum mb-8 pb-4 border-b border-rose-gold/30">
                  {category.title}
                </h2>
                <ul className="space-y-6">
                  {category.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-baseline group cursor-default">
                      <span className="font-sans font-medium text-luxury-black group-hover:text-rose-gold transition-colors">
                        {item.name}
                      </span>
                      <div className="flex-grow border-b border-dashed border-luxury-black/20 mx-4" />
                      <span className="font-sans font-semibold text-deep-plum">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <Link 
              href="/booking" 
              className="inline-block px-12 py-5 bg-rose-gold text-luxury-black font-sans font-semibold tracking-widest uppercase text-sm hover:bg-champagne-gold transition-colors duration-300 shadow-xl"
            >
              Book Your Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
