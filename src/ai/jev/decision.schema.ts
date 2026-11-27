export const DECISION_QUESTIONS = {
  intent: {
    type: 'choice',
    instructions:
      'What is the primary intent of the latest user message? ' +
      'Consider the conversation context and active task.',
    criteria: {
      restaurant_booking: 'Find or book a restaurant or table.',
      ticket_booking: 'Find or purchase travel or event tickets.',
      hotel_booking: 'Find or book accommodation.',
      shopping: 'Find or purchase a product.',
      general_chat: 'General conversation or informational question.',
      other: 'Any other intent or unclear request.',
    },
  },

  taskRelation: {
    type: 'choice',
    instructions:
      'How does the latest user message relate to the active task and conversation?',
    criteria: {
      new_task: 'The user starts a new independent task.',
      continue_task: 'The user continues an existing task.',
      cancel_task: 'The user explicitly cancels a task.',
      answer_to_question: 'The user answers a question asked by the assistant.',
    },
  },

  actionable: {
    type: 'noul',
    instructions:
      'Does the user request or continue an action-oriented task ' +
      'that can be handled by the available agent capabilities?',
  },
} as const;