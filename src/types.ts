// src/types.ts
export type Course = 'Starters' | 'Mains' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
  Filter: undefined;
};