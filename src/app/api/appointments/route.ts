import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { addMinutes, parse } from 'date-fns';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      phone, 
      email, 
      serviceId, 
      staffId, 
      dateStr, 
      timeStr, 
      notes 
    } = body;

    // 1. Get Service details to calculate pricing and duration
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // 2. Calculate Timings
    const totalDuration = service.durationMins + service.bufferMins + service.cleanupMins;
    const startTime = parse(timeStr, 'HH:mm', new Date(dateStr));
    const endTime = addMinutes(startTime, totalDuration);

    // 3. Find or Create Customer in CRM
    // If they have a user account, link it. If not, just create a Customer record via email/phone
    let customer = await prisma.customer.findFirst({
      where: {
        OR: [
          { phone: phone },
          { user: { email: email } }
        ]
      }
    });

    if (!customer) {
      // Create a guest User and Customer
      const guestUser = await prisma.user.create({
        data: {
          name,
          email,
          role: 'CUSTOMER',
          customer: {
            create: {
              phone,
            }
          }
        },
        include: { customer: true }
      });
      customer = guestUser.customer!;
    }

    // 4. Create the Appointment (Transaction)
    const result = await prisma.$transaction(async (tx) => {
      // Create Appointment
      const appointment = await tx.appointment.create({
        data: {
          customerId: customer.id,
          staffId: staffId || null,
          startTime,
          endTime,
          status: 'PENDING',
          subtotal: service.price,
          totalAmount: service.price, // Apply discount logic here later
          notes,
          services: {
            create: {
              serviceId: service.id,
              priceAtTime: service.price
            }
          }
        }
      });

      // Generate PENDING Payment
      const payment = await tx.payment.create({
        data: {
          appointmentId: appointment.id,
          customerId: customer.id,
          amount: service.price,
          provider: 'PENDING_GATEWAY', // E.g. Razorpay
        }
      });

      // Create Audit Log
      await tx.auditLog.create({
        data: {
          entityType: 'APPOINTMENT',
          entityId: appointment.id,
          action: 'CREATE',
          changes: JSON.stringify({ status: 'PENDING', amount: service.price })
        }
      });

      return { appointment, payment };
    });

    return NextResponse.json({
      success: true,
      appointmentId: result.appointment.id,
      status: result.appointment.status,
      customer: {
        id: customer.id,
        name
      },
      payment: {
        id: result.payment.id,
        amountDue: result.payment.amount,
        status: result.payment.status
      }
    });

  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}
