import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase-server';
import type { Database } from '@/lib/types';

type UserProgressUpsert = Database['public']['Tables']['user_progress']['Insert'];

interface ModuleProgressData {
  module_id: string;
  completed: boolean;
}

/**
 * API endpoint for module progress tracking
 * POST - Mark a module as complete/incomplete
 * GET - Get user's module progress
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
          error: 'Authentication required',
          message: 'Please log in to save your progress',
        },
        { status: 401 }
      );
    }

    const body: ModuleProgressData = await request.json();
    const { module_id, completed } = body;

    if (!module_id || typeof completed !== 'boolean') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          message: 'Missing required fields: module_id or completed',
        },
        { status: 400 }
      );
    }

    // Upsert progress (insert or update)
    const progressData: UserProgressUpsert = {
      user_id: user.id,
      module_id,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    };

    // TypeScript cannot properly infer Database generic types in route handlers
    const { data, error } = await supabase
      .from('user_progress')
      // @ts-expect-error - progressData is correctly typed as UserProgressUpsert, but TS can't infer through route handler client
      .upsert(progressData, {
        onConflict: 'user_id,module_id',
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving module progress:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          message: 'Failed to save module progress',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: completed ? 'Module marked as complete' : 'Progress updated',
    });
  } catch (error) {
    console.error('Module progress API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient(request);

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
    const moduleId = searchParams.get('module_id');

    let query = supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id);

    if (moduleId) {
      query = query.eq('module_id', moduleId);
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
        error: error instanceof Error ? error.message : 'Failed to fetch progress',
      },
      { status: 500 }
    );
  }
}
