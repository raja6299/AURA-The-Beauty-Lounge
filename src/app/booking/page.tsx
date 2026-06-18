'use client';

import { useState, useEffect } from 'react';


type Service = { id: string; name: string; price: number; durationMins: number };
type Category = { id: string; name: string; services: Service[] };
type Staff = { id: string; user: { name: string } };

export default function BookingPage() {
  const [step, setStep] = useState(1);
  
  // Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  
  // Selection State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Customer Form State
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', notes: '' });
  
  // Loading States
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // 1. Fetch Services & Staff on Load
  useEffect(() => {
    Promise.all([
      fetch('/api/services').then(res => res.json()),
      fetch('/api/staff').then(res => res.json())
    ]).then(([catData, staffData]) => {
      setCategories(catData || []);
      setStaffList(staffData || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  // 2. Fetch Availability when Date, Staff, or Service changes
  useEffect(() => {
    if (selectedDate && selectedService && selectedStaff) {
      setSlotsLoading(true);
      fetch(`/api/availability?date=${selectedDate}&staffId=${selectedStaff}&serviceId=${selectedService.id}`)
        .then(res => res.json())
        .then(data => {
          setAvailableSlots(data.availableSlots || []);
          setSlotsLoading(false);
        })
        .catch(() => setSlotsLoading(false));
    }
  }, [selectedDate, selectedStaff, selectedService]);

  const handleBookingSubmit = async () => {
    setBookingLoading(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...customer,
          serviceId: selectedService?.id,
          staffId: selectedStaff,
          dateStr: selectedDate,
          timeStr: selectedTime
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setStep(7); // Confirmation
      } else {
        alert('Booking failed: ' + data.error);
      }
    } catch {
      alert('Error connecting to server.');
    }
    setBookingLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-ivory text-deep-plum font-sans tracking-widest uppercase text-sm">Loading Experience...</div>;
  }

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Header */}
      <section className="pt-32 pb-12 bg-luxury-black text-center">
        <div className="container mx-auto px-4">
          <span className="font-sans text-xs tracking-widest uppercase text-champagne-gold mb-4 inline-block">
            Reserve Your Experience
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-ivory mb-6">
            Book an Appointment
          </h1>
          
          {/* Progress Bar */}
          <div className="flex justify-center items-center gap-2 max-w-2xl mx-auto mt-8 font-sans text-xs tracking-widest text-ivory/50">
            <span className={step >= 1 ? 'text-champagne-gold' : ''}>Service</span>
            <span>―</span>
            <span className={step >= 2 ? 'text-champagne-gold' : ''}>Staff</span>
            <span>―</span>
            <span className={step >= 3 ? 'text-champagne-gold' : ''}>Time</span>
            <span>―</span>
            <span className={step >= 5 ? 'text-champagne-gold' : ''}>Details</span>
            <span>―</span>
            <span className={step >= 6 ? 'text-champagne-gold' : ''}>Review</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white p-6 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-champagne-gold/20">
          
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="font-heading text-3xl text-deep-plum border-b border-black/5 pb-4">Select a Service</h2>
              {categories.map(cat => (
                <div key={cat.id} className="space-y-4">
                  <h3 className="font-sans font-semibold tracking-widest text-luxury-black/60 uppercase text-xs">{cat.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.services.map(srv => (
                      <button
                        key={srv.id}
                        onClick={() => { setSelectedService(srv); setStep(2); }}
                        className={`text-left p-6 border transition-all duration-300 ${selectedService?.id === srv.id ? 'border-rose-gold bg-warm-beige' : 'border-black/10 hover:border-champagne-gold'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-heading font-bold text-lg text-luxury-black">{srv.name}</span>
                          <span className="font-sans text-rose-gold">₹{srv.price}</span>
                        </div>
                        <span className="font-sans text-xs text-luxury-black/60">{srv.durationMins} Mins</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {categories.length === 0 && <p className="text-luxury-black/50 italic">No services loaded from database.</p>}
            </div>
          )}

          {/* STEP 2: SELECT STAFF */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <h2 className="font-heading text-3xl text-deep-plum">Select Stylist</h2>
                <button onClick={() => setStep(1)} className="font-sans text-xs uppercase tracking-widest text-luxury-black/50 hover:text-rose-gold">← Back</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => { setSelectedStaff('any'); setStep(3); }}
                  className={`p-6 border text-center transition-all duration-300 ${selectedStaff === 'any' ? 'border-rose-gold bg-warm-beige' : 'border-black/10 hover:border-champagne-gold'}`}
                >
                  <span className="font-heading font-bold text-lg text-luxury-black block">Anyone Available</span>
                  <span className="font-sans text-xs text-luxury-black/60">First available slot</span>
                </button>
                {staffList.map(staff => (
                  <button
                    key={staff.id}
                    onClick={() => { setSelectedStaff(staff.id); setStep(3); }}
                    className={`p-6 border text-center transition-all duration-300 ${selectedStaff === staff.id ? 'border-rose-gold bg-warm-beige' : 'border-black/10 hover:border-champagne-gold'}`}
                  >
                    <span className="font-heading font-bold text-lg text-luxury-black block">{staff.user.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 & 4: DATE AND TIME */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <h2 className="font-heading text-3xl text-deep-plum">Date & Time</h2>
                <button onClick={() => setStep(2)} className="font-sans text-xs uppercase tracking-widest text-luxury-black/50 hover:text-rose-gold">← Back</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Select Date</label>
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
                    className="w-full p-4 border border-black/10 focus:outline-none focus:border-rose-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-4">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Available Times</label>
                  {slotsLoading ? (
                    <div className="text-sm font-sans text-luxury-black/50">Checking availability...</div>
                  ) : !selectedDate ? (
                    <div className="text-sm font-sans text-luxury-black/50">Please select a date first.</div>
                  ) : availableSlots.length === 0 ? (
                    <div className="text-sm font-sans text-rose-gold">No slots available on this date.</div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
                      {availableSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => { setSelectedTime(time); setStep(5); }}
                          className={`py-3 text-sm font-sans transition-colors ${selectedTime === time ? 'bg-deep-plum text-ivory' : 'border border-black/10 text-luxury-black hover:border-rose-gold'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CUSTOMER INFO */}
          {step === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <h2 className="font-heading text-3xl text-deep-plum">Your Details</h2>
                <button onClick={() => setStep(3)} className="font-sans text-xs uppercase tracking-widest text-luxury-black/50 hover:text-rose-gold">← Back</button>
              </div>
              
              <div className="space-y-6 max-w-xl mx-auto">
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Full Name</label>
                  <input type="text" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Phone Number</label>
                  <input type="tel" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Email (Optional)</label>
                  <input type="email" value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Special Requests</label>
                  <textarea rows={2} value={customer.notes} onChange={e => setCustomer({...customer, notes: e.target.value})} className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans resize-none" />
                </div>

                <button 
                  onClick={() => setStep(6)}
                  disabled={!customer.name || !customer.phone}
                  className="w-full py-4 bg-deep-plum text-ivory font-sans font-medium tracking-widest uppercase text-sm hover:bg-rose-gold hover:text-luxury-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review Booking
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW */}
          {step === 6 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <h2 className="font-heading text-3xl text-deep-plum">Review & Confirm</h2>
                <button onClick={() => setStep(5)} className="font-sans text-xs uppercase tracking-widest text-luxury-black/50 hover:text-rose-gold">← Back</button>
              </div>
              
              <div className="bg-warm-beige p-8 border border-champagne-gold/30">
                <div className="space-y-6 font-sans text-luxury-black/80">
                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="text-xs uppercase tracking-widest text-luxury-black/60">Service</span>
                    <span className="font-heading text-xl text-deep-plum">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="text-xs uppercase tracking-widest text-luxury-black/60">Date & Time</span>
                    <span className="font-medium">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="text-xs uppercase tracking-widest text-luxury-black/60">Guest</span>
                    <span className="font-medium">{customer.name} ({customer.phone})</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="font-heading text-xl text-deep-plum">Total Due</span>
                    <span className="font-sans text-2xl font-bold text-rose-gold">₹{selectedService?.price}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleBookingSubmit}
                disabled={bookingLoading}
                className="w-full py-5 bg-luxury-black text-champagne-gold font-sans font-bold tracking-widest uppercase text-sm hover:bg-rose-gold hover:text-luxury-black transition-colors duration-300 disabled:opacity-50"
              >
                {bookingLoading ? 'Processing...' : 'Confirm Appointment'}
              </button>
            </div>
          )}

          {/* STEP 7: CONFIRMATION */}
          {step === 7 && (
            <div className="text-center space-y-6 py-12 animate-in zoom-in-95 duration-700">
              <div className="w-20 h-20 bg-warm-beige rounded-full border-2 border-rose-gold flex items-center justify-center mx-auto mb-8 text-3xl">
                ✨
              </div>
              <h2 className="font-heading text-4xl text-deep-plum">Booking Confirmed</h2>
              <p className="font-sans text-luxury-black/70 font-light max-w-md mx-auto">
                Thank you, {customer.name}. Your appointment for {selectedService?.name} is confirmed for {selectedDate} at {selectedTime}. We look forward to pampering you.
              </p>
              <div className="pt-8">
                <button onClick={() => window.location.href = '/'} className="font-sans text-xs uppercase tracking-widest text-deep-plum border-b border-deep-plum pb-1 hover:text-rose-gold hover:border-rose-gold transition-colors">
                  Return to Home
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
