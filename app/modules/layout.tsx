import { createClient } from '@/lib/supabase-server';
import { BookOpen, CloudRain, Heart, TrendingUp, Brain, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/lib/types';

type ModuleRow = Database['public']['Tables']['modules']['Row'];

type IconType = typeof CloudRain | typeof Heart | typeof TrendingUp | typeof BookOpen | typeof Brain | typeof Sparkles;
const iconMap: Record<string, IconType> = {
  CloudRain,
  Heart,
  TrendingUp,
  BookOpen,
  Brain,
  Sparkles,
};

export default async function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Fetch modules for sidebar navigation
  const { data: modulesData } = await supabase
    .from('modules')
    .select('id, title, content, order')
    .eq('is_published', true)
    .order('order', { ascending: true});

  const modules = modulesData as Pick<ModuleRow, 'id' | 'title' | 'content' | 'order'>[] | null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="bg-card border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Learning Modules
                </h2>
                <nav className="space-y-2">
                  {modules && modules.length > 0 ? (
                    modules.map((module) => {
                      // Extract icon from content JSONB
                      const content = module.content as { icon?: string } | null;
                      const iconName = content?.icon || 'BookOpen';
                      const IconComponent = iconMap[iconName] || BookOpen;
                      return (
                        <Link
                          key={module.id}
                          href={`/modules/${module.id}`}
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors group"
                        >
                          <div className="p-1.5 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {module.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Module {module.order}
                            </p>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No modules available yet.
                    </p>
                  )}
                </nav>

                <div className="mt-6 pt-6 border-t">
                  <Link
                    href="/modules"
                    className="text-sm text-primary hover:underline font-medium flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    View All Modules
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
