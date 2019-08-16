import { WOExercise } from './exercise.model';

export interface Workout {
  id?: string;
  name: string;
  exercises?: WOExercise[];
  totalDuration?: number;
  totalCalories?: number;
  date?: Date;
  state?: string;
}
