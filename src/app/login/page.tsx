'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-warm-beige flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-8 md:p-12 shadow-2xl border border-champagne-gold/30">
        <div className="text-center mb-10">
          <span className="font-sans text-xs tracking-widest uppercase text-champagne-gold mb-2 inline-block">
            Staff Portal
          </span>
          <h1 className="font-heading text-3xl font-bold text-deep-plum">
            AURA
          </h1>
          <div className="w-12 h-1 bg-rose-gold mx-auto mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-sans text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans text-luxury-black" 
            />
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest text-luxury-black/70">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-luxury-black/20 pb-2 bg-transparent focus:outline-none focus:border-rose-gold transition-colors font-sans text-luxury-black" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-luxury-black text-ivory font-sans font-medium tracking-widest uppercase text-sm hover:bg-deep-plum transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
