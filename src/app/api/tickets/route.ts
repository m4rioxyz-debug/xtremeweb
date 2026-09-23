import { NextResponse } from 'next/server';
import { getTickets, createTicket, updateTicket, deleteTicket, resetTickets } from '@/lib/db';

export async function GET() {
  try {
    const tickets = getTickets();
    return NextResponse.json({ success: true, tickets });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, subject, priority, category, description, company } = body;

    if (!customerName || !email || !subject || !description) {
      return NextResponse.json(
        { success: false, error: 'Customer name, email, subject, and description are required.' },
        { status: 400 }
      );
    }

    const newTicket = createTicket({
      customerName,
      company: company || '',
      email,
      subject,
      priority: priority || 'medium',
      status: 'open',
      category: category || 'Technical Formulation',
      description,
      notes: []
    });

    return NextResponse.json({ success: true, ticket: newTicket }, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({ success: false, error: 'Failed to create ticket' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Ticket ID is required.' }, { status: 400 });
    }

    const updated = updateTicket(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Ticket not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, ticket: updated });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json({ success: false, error: 'Failed to update ticket' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const reset = searchParams.get('reset');

    if (reset === 'true') {
      resetTickets();
      return NextResponse.json({ success: true, message: 'All tickets reset to empty.' });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Ticket ID is required.' }, { status: 400 });
    }

    const deleted = deleteTicket(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Ticket not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Ticket deleted successfully.' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete ticket' }, { status: 500 });
  }
}
