import { NextResponse } from 'next/server';
import { getCompanySettings, updateCompanySettings, resetCompanySettings } from '@/lib/db';

export async function GET() {
  try {
    const settings = getCompanySettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = updateCompanySettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const reset = resetCompanySettings();
    return NextResponse.json({ success: true, settings: reset, message: 'Settings reset to factory defaults.' });
  } catch (error) {
    console.error('Error resetting settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to reset settings' }, { status: 500 });
  }
}
