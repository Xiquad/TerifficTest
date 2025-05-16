import React, { FC, useState } from 'react';
import { Button, Paper, TextField, Box, List, Tooltip } from '@mui/material';
import LoadingListState from '../LoadingListState';

interface TodoListContainerProps {
  children: React.ReactNode;
  onAddTodo: (todo: string) => void;
  isLoading: boolean;
}

const TodoListContainer: FC<TodoListContainerProps> = ({children, onAddTodo, isLoading}) => {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddTodo(newTodo);
    setNewTodo('');
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleAddTodo}>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
            />
            {/* As a good practice, strings should be localized */}
            <Tooltip title="Add a new todo">
              <Button type="submit" variant="contained" color="primary" disabled={isLoading || newTodo.trim() === ''}>
                Add
              </Button>
            </Tooltip>
          </Box>
        </form>

        {isLoading ?
          <LoadingListState /> :
          <List>{children}</List>
        }
      </Paper>
    </Box>
  );
};

export default TodoListContainer;