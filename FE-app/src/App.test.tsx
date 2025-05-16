import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import useTodos from './hooks/useTodos';

jest.mock('./hooks/useTodos', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('App Component', () => {
  const mockCreateMutation = {
    mutate: jest.fn(),
    isPending: false,
  };

  const mockUpdateMutation = {
    mutate: jest.fn(),
    isPending: false,
  };

  const mockDeleteMutation = {
    mutate: jest.fn(),
    isPending: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useTodos as jest.Mock).mockReturnValue({
      todos: [{ id: '1', text: 'Test Todo', completed: false, createdAt: new Date() }],
      isAddingTodo: false,
      createMutation: mockCreateMutation,
      updateMutation: mockUpdateMutation,
      deleteMutation: mockDeleteMutation,
      isTodosPending: false,
      todoStates: {
        '1': 'idle'
      },
    });
  });

  it('renders app title', () => {
    render(<App />);
    const titleElement = screen.getByText('Todo App');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders TodoList container', () => {
    render(<App />);
    const todoListContainer = screen.getByTestId('todo-list-container');
    expect(todoListContainer).toBeInTheDocument();
  });

  it('renders TodoList item', () => {
    render(<App />);
    const todoListItem = screen.getByTestId('todo-list-item');
    expect(todoListItem).toBeInTheDocument();
  });

  it('renders empty state', () => {
    (useTodos as jest.Mock).mockReturnValue({
      todos: [],
      isAddingTodo: false,
      createMutation: mockCreateMutation,
      updateMutation: {
        mutate: jest.fn(),
        isPending: false,
      },
      deleteMutation: {
        mutate: jest.fn(),
        isPending: false,
      },
      isTodosPending: false,
      todoStates: {},
    });

    render(<App />);
    const listEmptyState = screen.getByTestId('list-empty-state');
    expect(listEmptyState).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useTodos as jest.Mock).mockReturnValue({
      todos: [],
      isAddingTodo: false,
      createMutation: mockCreateMutation,
      updateMutation: {
        mutate: jest.fn(),
        isPending: false,
      },
      deleteMutation: {
        mutate: jest.fn(),
        isPending: false,
      },
      isTodosPending: true,
      todoStates: {},
    });

    render(<App />);
    const loadingState = screen.getByTestId('loading-list-state');
    expect(loadingState).toBeInTheDocument();
  });

  it('creates a todo', () => {
    (useTodos as jest.Mock).mockReturnValue({
      todos: [],
      isAddingTodo: false,
      createMutation: mockCreateMutation,
      updateMutation: {
        mutate: jest.fn(),
        isPending: false,
      },
      deleteMutation: {
        mutate: jest.fn(),
        isPending: false,
      },
      isTodosPending: false,
      todoStates: {},
    });

    render(<App />);
    const addTodoInput = screen.getByPlaceholderText('Add a new todo');
    fireEvent.change(addTodoInput, { target: { value: 'new todo test' } });
    fireEvent.click(screen.getByTestId('todo-list-add-button'));

    expect(mockCreateMutation.mutate).toHaveBeenCalledWith({
      text: 'new todo test',
      completed: false
    });
  });

  it('completes a todo', () => {
    (useTodos as jest.Mock).mockReturnValue({
      todos: [{ id: '1', text: 'Test Todo', completed: false, createdAt: new Date() }],
      isAddingTodo: false,
      createMutation: mockCreateMutation,
      updateMutation: mockUpdateMutation,
      deleteMutation: mockDeleteMutation,
      isTodosPending: false,
      todoStates: {},
    });

    render(<App />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockUpdateMutation.mutate).toHaveBeenCalledWith({ id: '1', completed: true });
  });

  it('updates todo text', () => {
    (useTodos as jest.Mock).mockReturnValue({
      todos: [{ id: '1', text: 'Test Todo', completed: false, createdAt: new Date() }],
      isAddingTodo: false,
      createMutation: mockCreateMutation,
      updateMutation: mockUpdateMutation,
      deleteMutation: mockDeleteMutation,
      isTodosPending: false,
      todoStates: {},
    });

    render(<App />);
    fireEvent.click(screen.getByTestId('edit-button'));
    const textInput = screen.getByDisplayValue('Test Todo');
    fireEvent.change(textInput, { target: { value: 'new todo test' } });
    fireEvent.click(screen.getByTestId('save-button'));

    expect(mockUpdateMutation.mutate).toHaveBeenCalledWith({ id: '1', text: 'new todo test' });
  });

  it('deletes a todo', () => {
    const mockDeleteMutation = {
      mutate: jest.fn(),
      isPending: false,
    };

    (useTodos as jest.Mock).mockReturnValue({
      todos: [{ id: '1', text: 'Test Todo', completed: false, createdAt: new Date() }],
      isAddingTodo: false,
      createMutation: mockCreateMutation,
      updateMutation: {
        mutate: jest.fn(),
        isPending: false,
      },
      deleteMutation: mockDeleteMutation,
      isTodosPending: false,
      todoStates: {},
    });

    render(<App />);
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(mockDeleteMutation.mutate).toHaveBeenCalledWith('1');
  });
});
