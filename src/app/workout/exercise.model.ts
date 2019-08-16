export interface Exercise {
  code: string;
  category: string;
  type: string;
  mets: number;
}

export interface WOExercise extends Exercise {
  order: number;
  duration: number;
  calories: number;
  specificEx?: string;
  state?: 'completed' | 'canceled' | null;
}
