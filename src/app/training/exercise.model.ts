export interface Exercise {
  code: number;
  category: string;
  type: string;
  mets: number;
  duration?: number;
  calories?: number;
  weight?: number;
  date?: Date;
  state?: 'completed' | 'canceled' | null;
}
