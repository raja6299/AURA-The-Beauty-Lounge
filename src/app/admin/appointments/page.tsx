import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function AdminAppointments() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { startTime: 'desc' },
    include: {
      customer: { include: { user: true } },
      services: { include: { service: true } },
      staff: { include: { user: true } }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-xl text-deep-plum font-bold">Appointment History</h2>
        {/* We would add Date Range Pickers and Filters here in the future */}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-warm-beige text-luxury-black/60 text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Service</th>
                <th className="p-4 font-medium">Stylist</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02]">
                  <td className="p-4 font-medium text-luxury-black whitespace-nowrap">
                    {format(app.startTime, 'MMM dd, yyyy')} <br/>
                    <span className="text-luxury-black/60 font-normal">{format(app.startTime, 'hh:mm a')}</span>
                  </td>
                  <td className="p-4 font-medium text-luxury-black">
                    {app.customer.user ? app.customer.user.name : `Guest (${app.customer.phone})`}
                  </td>
                  <td className="p-4 text-luxury-black/70">
                    {app.services[0]?.service.name}
                  </td>
                  <td className="p-4 text-luxury-black/70">
                    {app.staff ? app.staff.user.name : 'Unassigned'}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase ${
                      app.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {app.status}
                    </span>
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
