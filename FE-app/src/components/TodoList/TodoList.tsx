import React, { FC, useEffect, useState } from 'react';
import { Skeleton, Snackbar } from '@mui/material';
import TodoListContainer from '../TodoListContainer';
import ListEmptyState from '../ListEmptyState/ListEmptyState';
import TodoListItem from '../TodoListItem';
import { Todo } from '../../api/dto';
import { fetchAllTodos, createTodo, updateTodo, deleteTodo } from '../../api/todoApi';

const TodoList: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [loadingTodoId, setLoadingTodoId] = useState('');
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsInitialLoading(true);
        const todos = await fetchAllTodos();
        setTodos(todos);
      } catch (error) {
        setSnackbarMessage('Error fetching todos');
        setIsSnackbarOpen(true);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (todo: string) => {
    try {
      setIsAddingTodo(true);
      const newTodo = await createTodo({
        text: todo,
        completed: false
      });
      setTodos([...todos, newTodo]);
    } catch (error) {
      setSnackbarMessage('Error adding todo');
      setIsSnackbarOpen(true);
    } finally {
      setIsAddingTodo(false);
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      setLoadingTodoId(id);
      const updatedTodo = await updateTodo(id, { completed });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      setSnackbarMessage('Error toggling todo');
      setIsSnackbarOpen(true);
    } finally {
      setLoadingTodoId('');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      setLoadingTodoId(id);
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      setSnackbarMessage('Error deleting todo');
      setIsSnackbarOpen(true);
    } finally {
      setLoadingTodoId('');
    }
  };

  const handleEditTodo = async (id: string, text: string) => {
    try {
      setLoadingTodoId(id);
      const updatedTodo = await updateTodo(id, { text });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      setSnackbarMessage('Error editing todo');
      setIsSnackbarOpen(true);
    } finally {
      setLoadingTodoId('');
    }
  };

  return (
    <>
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
              isLoading={loadingTodoId === todo.id}
            />
          ))
        }
        {todos.length === 0 && <ListEmptyState />}
        {isAddingTodo && <Skeleton variant="text" width="100%" height={80} />}
      </TodoListContainer>
      <Snackbar
        color="danger"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        message={snackbarMessage}
      />
    </>
  )
};

export default TodoList;