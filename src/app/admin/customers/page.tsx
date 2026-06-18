import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function AdminCustomers() {
  const customers = await prisma.customer.findMany({
    orderBy: { loyaltyPoints: 'desc' },
    include: {
      user: true,
      _count: {
        select: { appointments: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-xl text-deep-plum font-bold">Customer Directory</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-warm-beige text-luxury-black/60 text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Total Visits</th>
                <th className="p-4 font-medium">Lifetime Spend</th>
                <th className="p-4 font-medium">Loyalty Points</th>
                <th className="p-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02]">
                  <td className="p-4 font-medium text-luxury-black">
                    {cust.user ? cust.user.name : 'Guest'}
                  </td>
                  <td className="p-4 text-luxury-black/70">
                    {cust.phone} <br/>
                    {cust.user?.email && <span className="text-xs text-luxury-black/50">{cust.user.email}</span>}
                  </td>
                  <td className="p-4 text-luxury-black/70">
                    {cust._count.appointments}
                  </td>
                  <td className="p-4 font-medium text-luxury-black">
                    ₹{cust.totalSpending}
                  </td>
                  <td className="p-4 font-medium text-rose-gold">
                    {cust.loyaltyPoints} pts
                  </td>
                  <td className="p-4 text-luxury-black/60 text-xs">
                    {format(cust.createdAt, 'MMM yyyy')}
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
