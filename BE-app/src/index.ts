import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { Todo, NewTodo, EditedTodo } from './types';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  // simulate server delay
  setTimeout(() => {
    next();
  }, 400);
});

// storage
let todos: Todo[] = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const input: NewTodo = req.body;
  const newTodo: Todo = {
    id: uuidv4(),
    text: input.text,
    completed: input.completed || false,
    createdAt: new Date(),
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const input: EditedTodo = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    ...input,
  };

  res.json(todos[todoIndex]);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
