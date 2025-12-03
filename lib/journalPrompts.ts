/**
 * Rule-based journal prompts based on quiz scores and topics
 */

export interface JournalPrompt {
  id: string;
  category: string;
  prompt: string;
  icon: string;
}

export const defaultPrompts: JournalPrompt[] = [
  {
    id: 'gratitude',
    category: 'Gratitude',
    prompt: 'What are three things you\'re grateful for today?',
    icon: '🙏',
  },
  {
    id: 'achievement',
    category: 'Achievement',
    prompt: 'What\'s something you accomplished today, no matter how small?',
    icon: '🎯',
  },
  {
    id: 'feelings',
    category: 'Emotions',
    prompt: 'How are you feeling right now? Describe your emotions without judgment.',
    icon: '💭',
  },
  {
    id: 'challenge',
    category: 'Growth',
    prompt: 'What challenge did you face today, and how did you handle it?',
    icon: '💪',
  },
  {
    id: 'self-care',
    category: 'Self-Care',
    prompt: 'What\'s one thing you did today to take care of yourself?',
    icon: '💚',
  },
];

export const stressPrompts: JournalPrompt[] = [
  {
    id: 'stress-sources',
    category: 'Stress',
    prompt: 'What are the main sources of stress in your life right now? List them and rate each from 1-10.',
    icon: '😰',
  },
  {
    id: 'stress-relief',
    category: 'Coping',
    prompt: 'What activities help you feel less stressed? How can you make time for them this week?',
    icon: '🧘',
  },
  {
    id: 'stress-triggers',
    category: 'Awareness',
    prompt: 'What were the warning signs that you were becoming stressed today? How can you recognize them earlier?',
    icon: '⚠️',
  },
];

export const anxietyPrompts: JournalPrompt[] = [
  {
    id: 'anxiety-thoughts',
    category: 'Anxiety',
    prompt: 'What thoughts keep running through your mind? Are they based on facts or fears?',
    icon: '😟',
  },
  {
    id: 'anxiety-grounding',
    category: 'Grounding',
    prompt: 'Use the 5-4-3-2-1 technique. Write down: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.',
    icon: '🌟',
  },
  {
    id: 'anxiety-control',
    category: 'Control',
    prompt: 'What aspects of your worries can you control? What needs to be accepted? Make two lists.',
    icon: '🎯',
  },
];

export const depressionPrompts: JournalPrompt[] = [
  {
    id: 'depression-energy',
    category: 'Energy',
    prompt: 'How is your energy today (1-10)? What small activity might help, even if you don\'t feel like it?',
    icon: '🔋',
  },
  {
    id: 'depression-connection',
    category: 'Connection',
    prompt: 'Who makes you feel understood? When did you last connect with them? Could you reach out today?',
    icon: '🤝',
  },
  {
    id: 'depression-progress',
    category: 'Progress',
    prompt: 'What\'s one small victory from this week? Remember: progress isn\'t always big or obvious.',
    icon: '🌱',
  },
];

export const resiliencePrompts: JournalPrompt[] = [
  {
    id: 'resilience-strengths',
    category: 'Strengths',
    prompt: 'What personal strengths helped you get through a difficult time? How can you use them again?',
    icon: '💎',
  },
  {
    id: 'resilience-learning',
    category: 'Growth',
    prompt: 'What\'s something difficult that taught you an important lesson? What did you learn?',
    icon: '📚',
  },
  {
    id: 'resilience-support',
    category: 'Support',
    prompt: 'Who are the people in your support network? How do they help you? Have you thanked them recently?',
    icon: '🫂',
  },
];

/**
 * Get personalized prompts based on user's quiz results
 * @param quizResults - Array of quiz results with topics
 * @returns Array of relevant journal prompts
 */
export function getPersonalizedPrompts(quizResults?: Array<{
  quiz_id: string;
  score: number;
  quiz_title?: string;
}>): JournalPrompt[] {
  if (!quizResults || quizResults.length === 0) {
    return defaultPrompts;
  }

  const prompts: JournalPrompt[] = [...defaultPrompts];

  // Analyze quiz results to determine struggling areas
  quizResults.forEach((result) => {
    const title = result.quiz_title?.toLowerCase() || '';
    const needsHelp = result.score < 60; // Below passing score

    if (needsHelp || title.includes('stress') || title.includes('anxiety')) {
      // Add stress/anxiety prompts
      prompts.push(...stressPrompts.slice(0, 1));
      prompts.push(...anxietyPrompts.slice(0, 1));
    }

    if (needsHelp || title.includes('depression')) {
      // Add depression prompts
      prompts.push(...depressionPrompts.slice(0, 1));
    }

    if (title.includes('resilience') || result.score >= 80) {
      // Add resilience prompts for those doing well or focused on resilience
      prompts.push(...resiliencePrompts.slice(0, 1));
    }
  });

  // Remove duplicates by id
  const uniquePrompts = Array.from(
    new Map(prompts.map((p) => [p.id, p])).values()
  );

  // Return up to 8 prompts
  return uniquePrompts.slice(0, 8);
}

/**
 * Get mood-specific prompts
 */
export function getMoodPrompts(mood: string): JournalPrompt[] {
  const moodLower = mood.toLowerCase();

  if (moodLower.includes('stress') || moodLower.includes('overwhelm')) {
    return [...defaultPrompts, ...stressPrompts];
  }

  if (moodLower.includes('anxi') || moodLower.includes('worry')) {
    return [...defaultPrompts, ...anxietyPrompts];
  }

  if (moodLower.includes('sad') || moodLower.includes('down') || moodLower.includes('depress')) {
    return [...defaultPrompts, ...depressionPrompts];
  }

  if (moodLower.includes('happy') || moodLower.includes('good') || moodLower.includes('great')) {
    return [...defaultPrompts, ...resiliencePrompts];
  }

  return defaultPrompts;
}
