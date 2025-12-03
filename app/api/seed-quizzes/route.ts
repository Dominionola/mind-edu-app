import { NextResponse } from 'next/server';
import { seedQuizzes } from '@/lib/seedQuizzes';
import type { PostgrestError } from '@supabase/supabase-js';

/**
 * API endpoint to seed sample quizzes into the database
 * Usage: POST /api/seed-quizzes
 */
export async function POST() {
  try {
    const result = await seedQuizzes();

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: result.message || 'Quizzes seeded successfully',
          data: result.data,
        },
        { status: 200 }
      );
    } else {
      const errorMessage =
        result.error && typeof result.error === 'object' && 'message' in result.error
          ? (result.error as PostgrestError).message
          : 'Failed to seed quizzes';

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Seed quizzes API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check current quiz count
 */
export async function GET() {
  const { supabase } = await import('@/lib/supabaseClient');

  try {
    const { data, error, count } = await supabase
      .from('quizzes')
      .select('*, modules(title)', { count: 'exact' });

    if (error) throw error;

    type QuizData = {
      id: string;
      title: string;
      modules: { title: string } | null;
      questions: { length?: number } | null;
    };
    const quizzesData = data as QuizData[] | null;

    return NextResponse.json({
      success: true,
      count: count || 0,
      quizzes: quizzesData?.map((q) => ({
        id: q.id,
        title: q.title,
        module_title: q.modules?.title,
        question_count: q.questions?.length || 0,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch quizzes',
      },
      { status: 500 }
    );
  }
}
