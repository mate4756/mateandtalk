import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getRandomQuestions, getRotationWeek } from '@/lib/quizData';
import { canUserTakeQuiz, recordQuizAttempt, getNextQuizAvailableTime } from '@/lib/quizTracking';

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check for admin override from query params
    const searchParams = request.nextUrl.searchParams;
    const isAdmin = searchParams.get('isAdmin') === 'true';

    // Check if user can take quiz
    const canTake = await canUserTakeQuiz(user.id, isAdmin);

    if (!canTake.canTake) {
      return NextResponse.json({
        success: false,
        canTake: false,
        reason: canTake.reason,
        nextAvailable: canTake.nextAvailable,
      });
    }

    // Get rotation week for content
    const rotationWeek = getRotationWeek();
    
    // Get random questions based on rotation week
    const questions = getRandomQuestions(6, rotationWeek);

    return NextResponse.json({
      success: true,
      canTake: true,
      questions,
      rotationWeek,
    });
  } catch (error) {
    console.error('Error in quiz API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { answers, score, isAdmin } = body as { answers: number[]; score: number; isAdmin?: boolean };

    if (!answers || score === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user can take quiz (double-check)
    const canTake = await canUserTakeQuiz(user.id, isAdmin || false);

    if (!canTake.canTake) {
      return NextResponse.json({
        success: false,
        canTake: false,
        reason: canTake.reason,
      });
    }

    // Record quiz attempt
    const result = await recordQuizAttempt(user.id, score, answers.length, isAdmin || false);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    // Get next available time
    const nextAvailable = getNextQuizAvailableTime(user.id);

    return NextResponse.json({
      success: true,
      score,
      totalQuestions: answers.length,
      nextAvailable,
    });
  } catch (error) {
    console.error('Error in quiz API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
