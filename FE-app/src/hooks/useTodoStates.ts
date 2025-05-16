import { useState } from 'react';
import { TodoState } from '../dto/TodoStates';

const useTodoStates = () => {
  const [todoStates, setTodoStates] = useState<Record<string, TodoState>>({});

  const setAllTodoInitialStates = (todoIds: string[]) => {
    setTodoStates(todoIds.reduce((acc, id) => ({ ...acc, [id]: TodoState.IDLE }), {}));
  }

  const setTodoState = (id: string, state: TodoState) => {
    setTodoStates(prev => ({ ...prev, [id]: state }));
  }

  return { todoStates, setAllTodoInitialStates, setTodoState };
};

export default useTodoStates;