import { createClient } from '@/lib/supabase-server';
import { ClipboardCheck } from 'lucide-react';
import Link from 'next/link';

interface QuizWithModule {
  id: string;
  title: string;
  module_id: string | null;
  modules: { title: string } | null;
}

export default async function QuizzesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Fetch quizzes for sidebar navigation
  const { data: quizzesData } = await supabase
    .from('quizzes')
    .select('id, title, module_id, modules(title)')
    .order('created_at', { ascending: true });

  const quizzes = quizzesData as QuizWithModule[] | null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="bg-card border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                  Available Quizzes
                </h2>
                <nav className="space-y-2">
                  {quizzes && quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                      <Link
                        key={quiz.id}
                        href={`/quizzes/${quiz.id}`}
                        className="flex items-start gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors group"
                      >
                        <div className="p-1.5 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                          <ClipboardCheck className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {quiz.title}
                          </p>
                          {quiz.modules && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {quiz.modules.title}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No quizzes available yet.
                    </p>
                  )}
                </nav>

                <div className="mt-6 pt-6 border-t">
                  <Link
                    href="/quizzes"
                    className="text-sm text-primary hover:underline font-medium flex items-center gap-2"
                  >
                    <ClipboardCheck className="h-4 w-4" />
                    View All Quizzes
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
