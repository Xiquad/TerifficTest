import axios from 'axios';
import { API_URL } from './constants';
import { Todo, NewTodo, EditedTodo } from '../dto/Todo';

export const fetchAllTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

export const createTodo = async (todo: NewTodo): Promise<Todo> => {
  const response = await axios.post(`${API_URL}/todos`, todo);
  return response.data;
};

export const updateTodo = async (todo: EditedTodo): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/todos/${todo.id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};