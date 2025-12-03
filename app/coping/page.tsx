import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wind, PenTool, Heart, Info } from 'lucide-react';

const copingTools = [
  {
    id: 'breathing',
    title: 'Breathing Exercise',
    description: '4-4-4 breathing technique with guided timer and soothing audio cues to help calm your mind and reduce stress.',
    icon: Wind,
    href: '/coping/breathing',
    color: 'from-secondary/20 to-secondary/5',
    features: ['Guided timer', 'Audio cues', 'Visual animations', 'Keyboard controls'],
  },
  {
    id: 'journal',
    title: 'Personal Journal',
    description: 'Express your thoughts and feelings in a private, safe space with personalized writing prompts based on your progress.',
    icon: PenTool,
    href: '/coping/journal',
    color: 'from-accent/20 to-accent/5',
    features: ['Private entries', 'Personalized prompts', 'Mood tracking', 'Entry history'],
  },
];

export default function CopingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Coping Tools</h1>
            <p className="text-muted-foreground">
              Interactive tools to help you manage stress and emotions
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-accent/30 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Using Coping Tools</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  These evidence-based techniques can help you manage stress, anxiety, and difficult emotions.
                  Practice regularly for best results - even just a few minutes each day can make a difference.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Use breathing exercises when feeling overwhelmed or anxious</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Journal regularly to process emotions and track your mental health journey</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Combine these tools with professional support for comprehensive care</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {copingTools.map((tool) => (
            <Card
              key={tool.id}
              className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              <CardHeader>
                <div className={`p-4 rounded-lg bg-gradient-to-br ${tool.color} w-fit mb-4`}>
                  <tool.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Features:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link href={tool.href}>
                    Try Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>When to Seek Additional Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            While coping tools are helpful, they&apos;re not a replacement for professional mental health care.
            Consider reaching out to a mental health professional if:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Your symptoms persist or worsen despite using coping strategies</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>You&apos;re having thoughts of harming yourself or others</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Your daily functioning is significantly impaired</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>You feel overwhelmed and don&apos;t know where to start</span>
            </li>
          </ul>

          <div className="pt-4 border-t">
            <p className="font-semibold mb-2">Crisis Resources:</p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">US:</span> National Suicide Prevention Lifeline:{' '}
                <a href="tel:988" className="text-primary hover:underline">
                  988
                </a>
              </p>
              <p>
                <span className="font-medium">US:</span> Crisis Text Line: Text{' '}
                <span className="font-mono">HOME</span> to{' '}
                <a href="sms:741741" className="text-primary hover:underline">
                  741741
                </a>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                For emergencies, call your local emergency number (911 in the US)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
