import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SignOutButton } from './SignOutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const role = (session.user as any)?.role;

  return (
    <div className="flex h-screen bg-[#F5F5F7] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-luxury-black text-ivory flex flex-col">
        <div className="p-8 border-b border-white/10">
          <span className="text-[10px] tracking-widest uppercase text-champagne-gold">Dashboard</span>
          <h2 className="font-heading text-2xl font-bold mt-1">AURA</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium tracking-wide">
            Overview
          </Link>
          <Link href="/admin/appointments" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium tracking-wide">
            Appointments
          </Link>
          <Link href="/admin/customers" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium tracking-wide">
            Customers & CRM
          </Link>
          {(role === 'SUPER_ADMIN' || role === 'MANAGER') && (
            <Link href="/admin/reports" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium tracking-wide text-champagne-gold">
              Financial Reports
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-sm">
            <p className="font-bold">{session.user?.name}</p>
            <p className="text-xs text-white/50">{role}</p>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white px-8 py-6 border-b border-black/5 shadow-sm flex justify-between items-center">
          <h1 className="font-heading text-2xl text-deep-plum font-bold">AURA Command Center</h1>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
