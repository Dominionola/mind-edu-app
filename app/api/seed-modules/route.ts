import { NextResponse } from 'next/server';
import { seedModules } from '@/lib/seedModules';
import type { PostgrestError } from '@supabase/supabase-js';

/**
 * API endpoint to seed sample modules into the database
 * Usage: POST /api/seed-modules
 *
 * This endpoint will:
 * 1. Check if modules already exist
 * 2. If not, insert 3 sample modules with mental health education content
 * 3. Return success/failure response
 *
 * Note: In production, you should protect this endpoint with authentication
 * or remove it entirely after initial seeding.
 */
export async function POST() {
  try {
    const result = await seedModules();

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: result.message || 'Modules seeded successfully',
          data: result.data,
        },
        { status: 200 }
      );
    } else {
      const errorMessage =
        result.error && typeof result.error === 'object' && 'message' in result.error
          ? (result.error as PostgrestError).message
          : 'Failed to seed modules';

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Seed modules API error:', error);
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
 * GET endpoint to check current module count
 */
export async function GET() {
  const { supabase } = await import('@/lib/supabaseClient');

  try {
    const { data, error, count } = await supabase
      .from('modules')
      .select('*', { count: 'exact' });

    if (error) throw error;

    type ModuleData = { id: string; title: string; order: number; is_published: boolean };
    const modulesData = data as ModuleData[] | null;

    return NextResponse.json({
      success: true,
      count: count || 0,
      modules: modulesData?.map((m) => ({
        id: m.id,
        title: m.title,
        order: m.order,
        is_published: m.is_published,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch modules',
      },
      { status: 500 }
    );
  }
}
