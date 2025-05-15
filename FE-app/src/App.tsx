import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import TodoList from './components/TodoList';

function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <TodoList />
      </Container>
    </Box>
  );
}

export default App;
