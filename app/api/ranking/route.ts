import { NextRequest, NextResponse } from 'next/server';
import { getWeeklyRanking } from '@/lib/activityTracking';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    const ranking = await getWeeklyRanking(limit);

    return NextResponse.json({
      success: true,
      ranking,
    });
  } catch (error) {
    console.error('Error in ranking API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
