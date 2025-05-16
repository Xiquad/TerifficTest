import React, { FC, useState } from 'react';
import { Skeleton, Snackbar } from '@mui/material';
import TodoListContainer from '../TodoListContainer';
import ListEmptyState from '../ListEmptyState/ListEmptyState';
import TodoListItem from '../TodoListItem';
import useTodos from '../../hooks/useTodos';

const TodoList: FC = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const {
    todos,
    isAddingTodo,
    createMutation,
    updateMutation,
    deleteMutation,
    isTodosPending,
    todoStates
  } = useTodos(
    (message: string) => {
      setSnackbarMessage(message);
      setIsSnackbarOpen(true);
    }
  );

  const handleAddTodo = async (todo: string) => {
    createMutation.mutate({ text: todo, completed: false });
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    updateMutation.mutate({ id, completed });
  };

  const handleDeleteTodo = async (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEditTodo = async (id: string, text: string) => {
    updateMutation.mutate({ id, text });
  };

  return (
    <>
      <TodoListContainer
        onAddTodo={handleAddTodo}
        isLoading={isTodosPending}
      >
        {
          todos?.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
              state={todoStates[todo.id]}
            />
          ))
        }
        {todos?.length === 0 && <ListEmptyState />}
        {isAddingTodo && <Skeleton variant="text" width="100%" height={80} />}
      </TodoListContainer>
      <Snackbar
        color="danger"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        message={snackbarMessage}
        data-testid="toast"
      />
    </>
  )
};

export default TodoList;