export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type NewTodo = Omit<Todo, 'id' | 'createdAt'>;
export type EditedTodo = Partial<NewTodo>;