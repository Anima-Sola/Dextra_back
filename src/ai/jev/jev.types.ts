export type AgentIntent =
  | 'restaurant_booking'
  | 'ticket_booking'
  | 'hotel_booking'
  | 'shopping'
  | 'general_chat'
  | 'other';

export type TaskRelation =
  | 'new_task'
  | 'continue_task'
  | 'cancel_task'
  | 'answer_to_question';

export interface JevDecisionInput {
  message: string;

  activeTask?: {
    id: string;
    type: string;
    status: string;
    summary?: string;
  } | null;

  recentMessages?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface JevChoiceAnswer<T extends string> {
  choice: T;
  confidence: number;
  probabilities: Partial<Record<T, number>>;
}

export interface JevDecisionResult {
  intent: JevChoiceAnswer<AgentIntent>;

  taskRelation: JevChoiceAnswer<TaskRelation>;

  actionable: number;

  model: string;
}