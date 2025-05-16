import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useTodoStates from "./useTodoStates";
import { createTodo, deleteTodo, updateTodo } from "../api/todoApi";
import { fetchAllTodos } from "../api/todoApi";
import { Todo } from "../dto/Todo";
import { TodoState } from "../dto/TodoStates";

const useTodos = (errorLogger: (message: string) => void) => {
  const queryClient = useQueryClient();
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const { todoStates, setAllTodoInitialStates, setTodoState } = useTodoStates();

  const {
    isPending: isTodosPending,
    isError: isTodosError,
    data: todosData,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchAllTodos,
  });

  useEffect(() => {
    if (todosData) {
      setAllTodoInitialStates(todosData.map(todo => todo.id));
    }
  }, [todosData]);

  useEffect(() => {
    if (isTodosError) {
      errorLogger('Error fetching todos');
    }
  }, [isTodosError]);

  const createMutation = useMutation({
    mutationFn: createTodo,
    onMutate: () => {
      setIsAddingTodo(true);
    },
    onSettled: () => {
      setIsAddingTodo(false);
    },
    onError: () => {
      errorLogger('Error adding todo');
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos'], (currentTodos: Todo[]) => {
        return [...currentTodos, newTodo];
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onMutate: (newTodo) => {
      setTodoState(newTodo.id!, TodoState.UPDATING);
    },
    onSettled: (_, __, newTodo) => {
      setTodoState(newTodo.id!, TodoState.IDLE);
    },
    onError: () => {
      errorLogger('Error updating todo');
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos'], (currentTodos: Todo[]) => {
        return currentTodos.map(todo => todo.id === newTodo.id ? newTodo : todo);
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['todos'], (currentTodos: Todo[]) => {
        return currentTodos.filter(todo => todo.id !== id);
      });
    },
    onMutate: (id) => {
      setTodoState(id, TodoState.DELETING);
    },
    onSettled: (_, __, id) => {
      setTodoState(id, TodoState.IDLE);
    },
    onError: () => {
      errorLogger('Error deleting todo');
    }
  });

  return {
    todos: todosData,
    isAddingTodo,
    createMutation,
    updateMutation,
    deleteMutation,
    isTodosPending,
    todoStates,
  };
};

export default useTodos;