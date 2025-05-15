import React, { FC, useEffect, useState } from 'react';
import TodoListContainer from '../TodoListContainer';
import TodoListItem from '../TodoListItem';
import { Todo } from '../../api/dto';
import { fetchAllTodos, createTodo, updateTodo, deleteTodo } from '../../api/todoApi';

const TodoList: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsInitialLoading(true);
        const todos = await fetchAllTodos();
        setTodos(todos);
      } catch (error) {
        console.error(error);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (todo: string) => {
    try {
      const newTodo = await createTodo({
        text: todo,
        completed: false
      });
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      const updatedTodo = await updateTodo(id, { completed });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTodo = async (id: string, text: string) => {
    try {
      const updatedTodo = await updateTodo(id, { text });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TodoListContainer
      onAddTodo={handleAddTodo}
      isLoading={isInitialLoading}
    >
      {
        todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            isLoading={true}
          />
        ))
      }
    </TodoListContainer>
  )
};

export default TodoList;