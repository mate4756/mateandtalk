import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { userId, showBadge } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    // Update user's publicMetadata in Clerk
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        showBadge,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating badge preference:', error);
    return NextResponse.json(
      { error: 'Failed to update badge preference' },
      { status: 500 }
    );
  }
}
