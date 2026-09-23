import { NextResponse } from 'next/server';
import { getMessages, createMessage, updateMessage, markAllMessagesAsRead, deleteMessage } from '@/lib/db';

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, subject, message, company, phone, country, productName } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const newMsg = createMessage({
      type: type === 'product_inquiry' ? 'product_inquiry' : 'contact',
      name,
      email,
      subject: subject || (productName ? `Inquiry regarding ${productName}` : 'General Inquiry'),
      message,
      company: company || '',
      phone: phone || '',
      country: country || '',
      productName: productName || ''
    });

    return NextResponse.json({ success: true, message: newMsg }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ success: false, error: 'Failed to save message' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, markAllRead, isRead } = body;

    if (markAllRead) {
      markAllMessagesAsRead();
      return NextResponse.json({ success: true, message: 'All messages marked as read.' });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Message ID is required.' }, { status: 400 });
    }

    const updated = updateMessage(id, { isRead: isRead ?? true });
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Message not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: updated });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ success: false, error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Message ID is required.' }, { status: 400 });
    }

    const deleted = deleteMessage(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Message not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 });
  }
}
