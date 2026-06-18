import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    const lead = await prisma.contactLead.create({
      data: {
        name,
        phone,
        email,
        service,
        message,
        status: 'NEW'
      }
    });

    // We can also trigger an Email Notification here via Resend or AWS SES
    // And an AuditLog if we want to track marketing lead volume

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Inquiry submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
