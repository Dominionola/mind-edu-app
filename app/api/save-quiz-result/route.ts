import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase-server';
import type { Database } from '@/lib/types';

type UserResultInsert = Database['public']['Tables']['user_results']['Insert'];

interface QuizResultData {
  quiz_id: string;
  score: number;
  total_questions: number;
  answers: Record<string, number>;
}

/**
 * API endpoint to save quiz results to the database
 * Requires authentication - guests can take quizzes but cannot save results
 *
 * POST /api/save-quiz-result
 * Body: { quiz_id, score, total_questions, answers }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient(request);

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required to save quiz results',
          message: 'Please log in to save your progress',
        },
        { status: 401 }
      );
    }

    const body: QuizResultData = await request.json();
    const { quiz_id, score, total_questions, answers } = body;

    // Validate input
    if (!quiz_id || typeof score !== 'number' || !total_questions || !answers) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          message: 'Missing required fields: quiz_id, score, total_questions, or answers',
        },
        { status: 400 }
      );
    }

    // Calculate percentage
    const percentage = Math.round((score / total_questions) * 100);

    // Save result to database
    const insertData: UserResultInsert = {
      user_id: user.id,
      quiz_id,
      score: percentage,
      answers,
      completed_at: new Date().toISOString(),
    };

    // TypeScript cannot properly infer Database generic types in route handlers
    const { data, error } = await supabase
      .from('user_results')
      // @ts-expect-error - insertData is correctly typed as UserResultInsert, but TS can't infer through route handler client
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error saving quiz result:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          message: 'Failed to save quiz result',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Quiz result saved successfully',
    });
  } catch (error) {
    console.error('Save quiz result API error:', error);
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
 * GET endpoint to retrieve user's quiz results
 * Optionally filter by quiz_id
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient(request);

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get('quiz_id');

    let query = supabase
      .from('user_results')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    if (quizId) {
      query = query.eq('quiz_id', quizId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch results',
      },
      { status: 500 }
    );
  }
}
