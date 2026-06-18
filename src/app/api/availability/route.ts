import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { addMinutes, parse, format, isBefore, startOfDay, endOfDay, areIntervalsOverlapping } from 'date-fns';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date'); // e.g. "2023-11-20"
    const staffId = searchParams.get('staffId');
    const serviceId = searchParams.get('serviceId');

    if (!dateStr || !staffId || !serviceId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const requestedDate = new Date(dateStr);
    const dayOfWeek = requestedDate.getDay();

    // 1. Fetch Service details (to get duration + buffer)
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const totalServiceTime = service.durationMins + service.bufferMins + service.cleanupMins;

    // 2. Fetch Staff Availability for this day of week
    const availability = await prisma.availabilitySlot.findFirst({
      where: {
        staffId,
        dayOfWeek
      }
    });

    if (!availability) {
      return NextResponse.json({ availableSlots: [], message: 'Staff not available on this day' });
    }

    // 3. Fetch Staff Leave Records that overlap with this date
    const leaveRecords = await prisma.leaveRecord.findMany({
      where: {
        staffId,
        status: 'APPROVED',
        startDate: { lte: endOfDay(requestedDate) },
        endDate: { gte: startOfDay(requestedDate) }
      }
    });

    if (leaveRecords.length > 0) {
      // For simplicity in this iteration, if there's any approved leave that day, they are off.
      // (A robust system would check time-based partial leave)
      return NextResponse.json({ availableSlots: [], message: 'Staff is on leave' });
    }

    // 4. Fetch existing Appointments for this Staff on this Date
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        staffId,
        status: {
          notIn: ['CANCELLED', 'NO_SHOW'] // We can book over cancelled
        },
        startTime: {
          gte: startOfDay(requestedDate),
          lte: endOfDay(requestedDate)
        }
      }
    });

    // 5. Generate 30-min slots
    const availableSlots: string[] = [];
    let currentSlot = parse(availability.startTime, 'HH:mm', requestedDate);
    const endTime = parse(availability.endTime, 'HH:mm', requestedDate);

    while (isBefore(addMinutes(currentSlot, totalServiceTime), endTime) || addMinutes(currentSlot, totalServiceTime).getTime() === endTime.getTime()) {
      const slotEnd = addMinutes(currentSlot, totalServiceTime);
      
      // Check for overlap
      const isOverlapping = existingAppointments.some(app => {
        return areIntervalsOverlapping(
          { start: currentSlot, end: slotEnd },
          { start: app.startTime, end: app.endTime }
        );
      });

      if (!isOverlapping) {
        availableSlots.push(format(currentSlot, 'HH:mm'));
      }

      // Increment by 30 mins
      currentSlot = addMinutes(currentSlot, 30);
    }

    return NextResponse.json({
      date: dateStr,
      staffId,
      serviceId,
      totalServiceTime,
      availableSlots
    });

  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to calculate availability' },
      { status: 500 }
    );
  }
}
