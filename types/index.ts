export interface Question {
  question_en: string;
  question_np: string;
  options_en: string[];
  options_np: string[];
  correct_answer: number;
}

export interface QuestionSet {
  id: number;
  title_en: string;
  title_np: string;
  description_en: string;
  description_np: string;
  questions: Question[];
}

export interface QuizResult {
  setId: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  date: string;
  questions?: Question[];
  userAnswers?: number[];
}
