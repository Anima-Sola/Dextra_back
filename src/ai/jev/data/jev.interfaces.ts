type Content = string | { [key: string]: unknown } | unknown[];

interface NoulQuestion {
  type: 'noul';
  instructions?: Content | null;
  criteria?: {
    true?: Content | null;
    false?: Content | null;
  } | null;
}

interface ChoiceQuestion {
  type: 'choice';
  instructions?: Content | null;
  criteria: Record<string, Content | null>;
}

interface ScoreQuestion {
  type: 'score';
  instructions?: Content | null;
  criteria: [Content, ...Content[]];
}

interface NoulAnswer {
  type: 'noul';
  noul: number;
}

interface ChoiceAnswer {
  type: 'choice';
  choice: string;
  confidence: number;
  probabilities: Record<string, number>;
}

interface ScoreAnswer {
  type: 'score';
  score: number;
  confidence: number;
  legend: Record<string, Content>;
  probabilities: Record<string, number>;
}

type Answer = NoulAnswer | ChoiceAnswer | ScoreAnswer;
type Question = NoulQuestion | ChoiceQuestion | ScoreQuestion;
type Questions = Record<string, Question>;

interface Usage {
  input_tokens: number;
  output_tokens: number;
}

export interface JevRequestBody {
  model: string;
  state: Content;
  questions: Questions;
}

export interface JevResponse {
  model: string;
  answers: Answer;
  usage: Usage;
}
