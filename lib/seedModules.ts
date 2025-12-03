import { supabase } from './supabaseClient';
import type { Database } from './types';
import type { PostgrestError } from '@supabase/supabase-js';

type ModuleInsert = Database['public']['Tables']['modules']['Insert'];

export const sampleModules = [
  {
    id: '1',
    title: 'Understanding Depression',
    description: 'Learn about depression, its symptoms, causes, and how to seek help. This foundational module helps you recognize signs and understand treatment options.',
    content: {
      sections: [
        {
          type: 'text',
          content: `# What is Depression?

Depression is more than just feeling sad or going through a rough patch. It's a serious mental health condition that requires understanding and medical care.

## Common Symptoms

- Persistent sad, anxious, or "empty" mood
- Loss of interest in activities once enjoyed
- Changes in appetite or weight
- Difficulty sleeping or oversleeping
- Loss of energy or increased fatigue
- Feelings of worthlessness or guilt
- Difficulty concentrating or making decisions

## Important to Know

Depression is **treatable**. Most people with depression get better with treatment, which may include:

- Therapy (such as cognitive-behavioral therapy)
- Medication
- Lifestyle changes
- Support groups

**Remember:** Seeking help is a sign of strength, not weakness.`,
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
          alt: 'Person looking hopeful',
        },
        {
          type: 'video',
          url: 'https://www.youtube.com/embed/z-IR48Mb3W0',
          title: 'Understanding Depression',
        },
        {
          type: 'text',
          content: `## When to Seek Help

If you're experiencing symptoms of depression for more than two weeks, it's important to talk to someone:

- A trusted adult (parent, teacher, counselor)
- Your doctor or mental health professional
- School counselor
- Crisis hotline (988 in the US)

You don't have to face this alone.`,
        },
      ],
    },
    order: 1,
    is_published: true,
    icon: 'CloudRain',
    duration: '15 min',
    difficulty: 'Beginner',
  },
  {
    id: '2',
    title: 'Managing Stress and Anxiety',
    description: 'Practical strategies and techniques to manage stress and anxiety in your daily life. Learn coping skills that you can use right away.',
    content: {
      sections: [
        {
          type: 'text',
          content: `# Stress and Anxiety Management

Stress and anxiety are normal responses to challenges in life. However, learning how to manage them effectively is crucial for your well-being.

## What's the Difference?

**Stress** is your body's response to a challenge or demand. It's usually temporary and goes away once the situation is resolved.

**Anxiety** is persistent worry or fear, even when there's no immediate threat. It can interfere with daily activities.

## Quick Stress Relief Techniques

### 1. Deep Breathing (4-7-8 Technique)
- Breathe in through your nose for 4 counts
- Hold your breath for 7 counts
- Exhale slowly through your mouth for 8 counts
- Repeat 3-4 times

### 2. Grounding Exercise (5-4-3-2-1)
Identify:
- 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

This brings you back to the present moment.`,
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
          alt: 'Peaceful meditation scene',
        },
        {
          type: 'text',
          content: `## Long-Term Strategies

### Physical Activity
Regular exercise reduces stress hormones and releases endorphins (feel-good chemicals).

### Healthy Sleep Habits
Aim for 8-10 hours of sleep per night. Create a calming bedtime routine.

### Connect with Others
Talk to friends, family, or a counselor. Social support is powerful.

### Limit Caffeine and Sugar
These can increase anxiety symptoms.

### Practice Mindfulness
Even 5 minutes of meditation daily can help reduce anxiety.

## When Anxiety Becomes Too Much

If anxiety is interfering with your daily life, it's time to seek professional help. Treatment options include:

- Cognitive Behavioral Therapy (CBT)
- Medication
- Relaxation techniques training
- Support groups`,
        },
      ],
    },
    order: 2,
    is_published: true,
    icon: 'Heart',
    duration: '20 min',
    difficulty: 'Beginner',
  },
  {
    id: '3',
    title: 'Building Resilience',
    description: 'Develop the ability to bounce back from challenges and build mental strength. Learn skills that will help you throughout life.',
    content: {
      sections: [
        {
          type: 'text',
          content: `# Building Resilience: Your Mental Strength Training

Resilience is like a muscle - the more you work on it, the stronger it becomes. It's your ability to adapt and bounce back when things don't go as planned.

## What Makes Someone Resilient?

Resilient people share these characteristics:

### 1. Positive Mindset
They see challenges as opportunities to grow, not insurmountable obstacles.

### 2. Strong Connections
They maintain supportive relationships with family, friends, and community.

### 3. Self-Awareness
They understand their emotions and reactions, and can manage them effectively.

### 4. Problem-Solving Skills
They break down big problems into smaller, manageable steps.

### 5. Self-Care
They prioritize their physical and mental health.`,
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
          alt: 'Climber reaching mountain peak',
        },
        {
          type: 'text',
          content: `## Building Your Resilience Toolkit

### Practice Gratitude
Write down 3 things you're grateful for each day. This rewires your brain to notice positive things.

### Develop a Growth Mindset
Replace "I can't do this" with "I can't do this *yet*." Every expert was once a beginner.

### Set Realistic Goals
Break big goals into small, achievable steps. Celebrate each milestone!

### Learn from Setbacks
Ask yourself:
- What can I learn from this?
- What would I do differently next time?
- How has this made me stronger?

### Build Your Support Network
Identify 3-5 people you can turn to when you need help or encouragement.

## The Resilience Challenge

**This Week:** Try one new coping strategy when you face a challenge. Notice what works for you.

Remember: Building resilience is a journey, not a destination. Be patient with yourself!`,
        },
      ],
    },
    order: 3,
    is_published: true,
    icon: 'TrendingUp',
    duration: '25 min',
    difficulty: 'Intermediate',
  },
];

export async function seedModules(): Promise<{
  success: boolean;
  error?: PostgrestError | unknown;
  message?: string;
  data?: unknown;
}> {
  try {
    // Check if modules already exist
    const { data: existingModules, error: checkError } = await supabase
      .from('modules')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking modules:', checkError);
      return { success: false, error: checkError };
    }

    if (existingModules && existingModules.length > 0) {
      console.log('Modules already exist. Skipping seed.');
      return { success: true, message: 'Modules already exist' };
    }

    // Insert sample modules
    const modulesToInsert: ModuleInsert[] = sampleModules.map(({ ...module }) => ({
      ...module,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    // TypeScript cannot properly infer Database generic types with client-side supabase client
    const { data, error } = await supabase
      .from('modules')
      // @ts-expect-error - modulesToInsert is correctly typed as ModuleInsert[], but TS can't infer through client
      .insert(modulesToInsert)
      .select();

    if (error) {
      console.error('Error seeding modules:', error);
      return { success: false, error };
    }

    console.log('Successfully seeded modules:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error seeding modules:', error);
    return { success: false, error };
  }
}
