import { supabase } from './supabaseClient';
import type { Database } from './types';
import type { PostgrestError } from '@supabase/supabase-js';

type QuizInsert = Database['public']['Tables']['quizzes']['Insert'];

export const sampleQuizzes = [
  {
    module_id: '1', // Understanding Depression
    title: 'Understanding Depression Quiz',
    questions: [
      {
        id: 'q1',
        question: 'What is the difference between sadness and depression?',
        options: [
          'There is no difference; they are the same thing',
          'Sadness is temporary while depression is persistent and affects daily functioning',
          'Depression only affects adults, sadness affects everyone',
          'Sadness requires medication but depression does not',
        ],
        correctAnswer: 1,
        explanation:
          'Depression is more than just feeling sad. It\'s a persistent condition that affects your ability to function in daily life, while sadness is a normal emotion that typically passes with time.',
      },
      {
        id: 'q2',
        question: 'Which of the following is a common symptom of depression?',
        options: [
          'Increased energy and enthusiasm',
          'Better concentration and focus',
          'Loss of interest in activities once enjoyed',
          'Improved sleep patterns',
        ],
        correctAnswer: 2,
        explanation:
          'Loss of interest or pleasure in activities that were once enjoyable is a key symptom of depression. This is called anhedonia and is one of the core diagnostic criteria.',
      },
      {
        id: 'q3',
        question: 'What should you do if you think you have depression?',
        options: [
          'Wait for it to go away on its own',
          'Talk to a trusted adult or healthcare professional',
          'Keep it to yourself to avoid burdening others',
          'Only seek help if it lasts more than a year',
        ],
        correctAnswer: 1,
        explanation:
          'Seeking help early is crucial. Talking to a trusted adult, doctor, or mental health professional can help you get the support and treatment you need. Depression is treatable, and you don\'t have to face it alone.',
      },
      {
        id: 'q4',
        question: 'Is depression treatable?',
        options: [
          'No, depression is a lifelong condition with no treatment',
          'Yes, most people with depression improve with treatment',
          'Only medication can treat depression',
          'Treatment only works for mild depression',
        ],
        correctAnswer: 1,
        explanation:
          'Yes! Depression is highly treatable. Most people with depression get better with treatment, which may include therapy, medication, lifestyle changes, or a combination of approaches.',
      },
      {
        id: 'q5',
        question: 'Seeking help for depression is a sign of:',
        options: [
          'Weakness',
          'Strength and self-care',
          'Giving up',
          'Being dramatic',
        ],
        correctAnswer: 1,
        explanation:
          'Seeking help is a sign of strength, not weakness. It takes courage to acknowledge you need support and to take steps to improve your mental health. Everyone deserves help when they need it.',
      },
    ],
    passing_score: 60,
    duration: '10 min',
    difficulty: 'Beginner',
  },
  {
    module_id: '2', // Managing Stress and Anxiety
    title: 'Stress and Anxiety Management Quiz',
    questions: [
      {
        id: 'q1',
        question: 'What is the 4-7-8 breathing technique?',
        options: [
          'Breathe in for 4, hold for 7, breathe out for 8',
          'Breathe for 4 minutes, rest for 7, repeat 8 times',
          'Take 4 deep breaths, 7 shallow breaths, 8 normal breaths',
          'Exercise for 4 hours, sleep for 7, eat 8 meals',
        ],
        correctAnswer: 0,
        explanation:
          'The 4-7-8 technique involves breathing in through your nose for 4 counts, holding your breath for 7 counts, and exhaling slowly through your mouth for 8 counts. This helps activate your body\'s relaxation response.',
      },
      {
        id: 'q2',
        question: 'What is the 5-4-3-2-1 grounding technique used for?',
        options: [
          'Improving physical fitness',
          'Bringing yourself back to the present moment during anxiety',
          'Counting calories',
          'Planning your daily schedule',
        ],
        correctAnswer: 1,
        explanation:
          'The 5-4-3-2-1 grounding technique helps anchor you to the present moment by identifying things you can see, touch, hear, smell, and taste. This is especially helpful during anxiety or panic attacks.',
      },
      {
        id: 'q3',
        question: 'Which of these is a healthy long-term strategy for managing stress?',
        options: [
          'Avoiding all stressful situations',
          'Regular physical exercise',
          'Drinking more caffeine to stay alert',
          'Sleeping less to get more done',
        ],
        correctAnswer: 1,
        explanation:
          'Regular physical exercise is one of the most effective long-term stress management strategies. It reduces stress hormones like cortisol and releases endorphins, which improve mood.',
      },
      {
        id: 'q4',
        question: 'How much sleep do teenagers typically need per night?',
        options: [
          '4-6 hours',
          '6-7 hours',
          '8-10 hours',
          '12-14 hours',
        ],
        correctAnswer: 2,
        explanation:
          'Teenagers typically need 8-10 hours of sleep per night for optimal physical and mental health. Adequate sleep is crucial for managing stress and anxiety.',
      },
      {
        id: 'q5',
        question: 'When should you seek professional help for anxiety?',
        options: [
          'Never, anxiety is normal and everyone should handle it themselves',
          'Only when you can\'t get out of bed for weeks',
          'When anxiety interferes with your daily life and activities',
          'Only if you have a panic attack',
        ],
        correctAnswer: 2,
        explanation:
          'You should seek professional help when anxiety begins to interfere with your daily life, relationships, school, or work. Early intervention can prevent anxiety from becoming more severe.',
      },
    ],
    passing_score: 60,
    duration: '10 min',
    difficulty: 'Beginner',
  },
  {
    module_id: '3', // Building Resilience
    title: 'Building Resilience Quiz',
    questions: [
      {
        id: 'q1',
        question: 'What is resilience?',
        options: [
          'Never experiencing difficult emotions',
          'The ability to bounce back from challenges and adapt to change',
          'Being strong enough to never need help',
          'Avoiding all stressful situations',
        ],
        correctAnswer: 1,
        explanation:
          'Resilience is the ability to adapt and bounce back from adversity, trauma, or stress. It doesn\'t mean you never experience difficulty; it means you have the skills to recover and grow from challenges.',
      },
      {
        id: 'q2',
        question: 'Which mindset statement reflects resilience?',
        options: [
          'I can\'t do this',
          'This is too hard for me',
          'I can\'t do this yet, but I can learn',
          'I\'ll never be good at this',
        ],
        correctAnswer: 2,
        explanation:
          'The phrase "I can\'t do this yet" reflects a growth mindset, a key component of resilience. It acknowledges current limitations while maintaining hope and openness to learning and improvement.',
      },
      {
        id: 'q3',
        question: 'What is an effective way to build your support network?',
        options: [
          'Handle all problems alone to become stronger',
          'Only rely on one person for all your needs',
          'Identify 3-5 people you can turn to for different types of support',
          'Never burden others with your problems',
        ],
        correctAnswer: 2,
        explanation:
          'Building a diverse support network of 3-5 trusted people provides different perspectives and types of support. Resilient people know when to ask for help and have multiple people they can turn to.',
      },
      {
        id: 'q4',
        question: 'How does practicing gratitude help build resilience?',
        options: [
          'It doesn\'t; gratitude is unrelated to resilience',
          'It rewires your brain to notice positive things, improving mental strength',
          'It eliminates all negative experiences',
          'It makes problems disappear',
        ],
        correctAnswer: 1,
        explanation:
          'Regular gratitude practice actually rewires your brain to notice positive aspects of life more readily. This doesn\'t eliminate problems but helps you maintain perspective and find meaning even during difficult times.',
      },
      {
        id: 'q5',
        question: 'What should you ask yourself when facing a setback?',
        options: [
          'Why does this always happen to me?',
          'What can I learn from this experience?',
          'Who can I blame for this?',
          'How can I avoid all future challenges?',
        ],
        correctAnswer: 1,
        explanation:
          'Asking "What can I learn from this?" helps you grow from setbacks rather than being defeated by them. This reflective approach is a key characteristic of resilient people who view challenges as opportunities for growth.',
      },
    ],
    passing_score: 60,
    duration: '10 min',
    difficulty: 'Intermediate',
  },
];

export async function seedQuizzes(): Promise<{
  success: boolean;
  error?: PostgrestError | unknown;
  message?: string;
  data?: unknown;
}> {
  try {
    // Check if quizzes already exist
    const { data: existingQuizzes, error: checkError } = await supabase
      .from('quizzes')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking quizzes:', checkError);
      return { success: false, error: checkError };
    }

    if (existingQuizzes && existingQuizzes.length > 0) {
      console.log('Quizzes already exist. Skipping seed.');
      return { success: true, message: 'Quizzes already exist' };
    }

    // Insert sample quizzes
    const quizzesToInsert: QuizInsert[] = sampleQuizzes.map((quiz) => ({
      module_id: quiz.module_id,
      title: quiz.title,
      topic: quiz.title, // Use title as topic since quiz doesn't have separate topic field
      questions: quiz.questions,
      passing_score: quiz.passing_score,
      difficulty: quiz.difficulty || 'Beginner',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    // TypeScript cannot properly infer Database generic types with client-side supabase client
    const { data, error } = await supabase
      .from('quizzes')
      // @ts-expect-error - quizzesToInsert is correctly typed as QuizInsert[], but TS can't infer through client
      .insert(quizzesToInsert)
      .select();

    if (error) {
      console.error('Error seeding quizzes:', error);
      return { success: false, error };
    }

    console.log('Successfully seeded quizzes:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error seeding quizzes:', error);
    return { success: false, error };
  }
}
