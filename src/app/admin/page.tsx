import prisma from '@/lib/prisma';
import { startOfDay, endOfDay, format } from 'date-fns';

export default async function AdminOverview() {
  const today = new Date();
  
  // Fetch Metrics
  const todayAppointments = await prisma.appointment.count({
    where: {
      startTime: {
        gte: startOfDay(today),
        lte: endOfDay(today)
      }
    }
  });

  const upcomingAppointments = await prisma.appointment.findMany({
    where: {
      startTime: { gte: today },
      status: 'PENDING'
    },
    take: 5,
    include: {
      customer: { include: { user: true } },
      services: { include: { service: true } }
    },
    orderBy: { startTime: 'asc' }
  });

  const totalCustomers = await prisma.customer.count();

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5">
          <h3 className="font-sans text-xs uppercase tracking-widest text-luxury-black/60 mb-2">Today&apos;s Appointments</h3>
          <p className="font-heading text-4xl text-deep-plum font-bold">{todayAppointments}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5">
          <h3 className="font-sans text-xs uppercase tracking-widest text-luxury-black/60 mb-2">Total CRM Customers</h3>
          <p className="font-heading text-4xl text-deep-plum font-bold">{totalCustomers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5">
          <h3 className="font-sans text-xs uppercase tracking-widest text-luxury-black/60 mb-2">Waitlist Queue</h3>
          <p className="font-heading text-4xl text-rose-gold font-bold">0</p>
        </div>
      </div>

      {/* Upcoming Table */}
      <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
        <div className="p-6 border-b border-black/5">
          <h2 className="font-heading text-xl text-deep-plum font-bold">Upcoming Pending Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-warm-beige text-luxury-black/60 text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Service</th>
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-luxury-black/50 py-8">
                    No upcoming appointments found.
                  </td>
                </tr>
              ) : upcomingAppointments.map((app) => (
                <tr key={app.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02]">
                  <td className="p-4 font-medium text-luxury-black">
                    {app.customer.user ? app.customer.user.name : `Guest (${app.customer.phone})`}
                  </td>
                  <td className="p-4 text-luxury-black/70">
                    {app.services[0]?.service.name}
                  </td>
                  <td className="p-4 text-luxury-black/70">
                    {format(app.startTime, 'MMM dd, hh:mm a')}
                  </td>
                  <td className="p-4 font-medium text-rose-gold">
                    ₹{app.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
