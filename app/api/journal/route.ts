import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase-server';
import type { Database } from '@/lib/types';

type JournalInsert = Database['public']['Tables']['journals']['Insert'];

interface JournalEntry {
  title?: string;
  content: string;
  mood?: string;
}

/**
 * API endpoint for journal entries
 * Requires authentication
 */

// GET - Fetch user's journal entries
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
    const limit = searchParams.get('limit');

    let query = supabase
      .from('journals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(parseInt(limit));
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
      count: data?.length || 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch journal entries',
      },
      { status: 500 }
    );
  }
}

// POST - Create new journal entry
export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient(request);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required',
          message: 'Please log in to save journal entries',
        },
        { status: 401 }
      );
    }

    const body: JournalEntry = await request.json();
    const { title, content, mood } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Content is required',
          message: 'Journal entry cannot be empty',
        },
        { status: 400 }
      );
    }

    const insertData: JournalInsert = {
      user_id: user.id,
      title: title || null,
      content: content.trim(),
      mood: mood || null,
    };

    // TypeScript can't infer the correct type from the generic Database type on route handler clients
    const { data, error } = await supabase
      .from('journals')
      // @ts-expect-error - insertData is correctly typed as JournalInsert, but TS can't infer through route handler client
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error saving journal entry:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          message: 'Failed to save journal entry',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Journal entry saved successfully',
    });
  } catch (error) {
    console.error('Journal API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a journal entry
export async function DELETE(request: NextRequest) {
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
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Journal entry ID is required' },
        { status: 400 }
      );
    }

    // Delete only if user owns the entry (RLS will enforce this)
    const { error } = await supabase
      .from('journals')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Journal entry deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete entry',
      },
      { status: 500 }
    );
  }
}
