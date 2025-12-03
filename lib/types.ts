// Database types for Supabase tables
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          is_anonymous: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_anonymous?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_anonymous?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      modules: {
        Row: {
          id: string
          title: string
          description: string | null
          content: Json | null
          order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          content?: Json | null
          order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          content?: Json | null
          order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          topic: string
          module_id: string | null
          title: string
          questions: Json
          passing_score: number
          difficulty: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          topic: string
          module_id?: string | null
          title: string
          questions?: Json
          passing_score?: number
          difficulty?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          topic?: string
          module_id?: string | null
          title?: string
          questions?: Json
          passing_score?: number
          difficulty?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_results: {
        Row: {
          id: string
          user_id: string
          quiz_id: string
          score: number
          answers: Json
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quiz_id: string
          score: number
          answers?: Json
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quiz_id?: string
          score?: number
          answers?: Json
          completed_at?: string
          created_at?: string
        }
      }
      journals: {
        Row: {
          id: string
          user_id: string
          title: string | null
          content: string
          mood: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          content: string
          mood?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          content?: string
          mood?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
