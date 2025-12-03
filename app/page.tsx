import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, BookOpen, Heart, TrendingUp, Users, Award } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Modules',
      description: 'Learn through engaging, bite-sized mental health education modules designed for youth.',
    },
    {
      icon: Heart,
      title: 'Safe Space',
      description: 'A judgment-free environment where you can explore mental health topics at your own pace.',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with personalized dashboards and achievement tracking.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with peers and learn together in a supportive, educational community.',
    },
    {
      icon: Award,
      title: 'Gamified Learning',
      description: 'Earn badges, maintain streaks, and stay motivated with our reward system.',
    },
    {
      icon: Brain,
      title: 'Evidence-Based',
      description: 'All content is based on proven mental health education frameworks and research.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Brain className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Your Journey to Mental Health{' '}
              <span className="text-primary">Wellness Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              MindEdu Hub empowers youth with evidence-based mental health education through
              interactive modules, quizzes, and personalized learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg">
                <Link href="/auth/signup">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/modules">Explore Modules</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MindEdu Hub?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide a comprehensive, engaging platform for mental health education
              designed specifically for young people.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of youth taking control of their mental health education.
                Start learning today with our free modules and interactive resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg">
                  <Link href="/auth/signup">Create Free Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">MindEdu Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MindEdu Hub. Empowering youth through mental health education.
            </p>
            <div className="flex space-x-6">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
