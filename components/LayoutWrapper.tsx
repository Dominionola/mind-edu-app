'use client';

import { usePathname } from 'next/navigation';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes that should not have the container wrapper (they handle their own layout)
  const noContainerRoutes = ['/', '/modules', '/quizzes'];

  // Check if pathname starts with any of the no-container routes
  const shouldHaveContainer = !noContainerRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (shouldHaveContainer) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    );
  }

  return <>{children}</>;
}
