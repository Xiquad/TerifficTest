import React, { FC, useState } from 'react';
import { ListItem, ListItemText, Box, IconButton, Checkbox, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Todo } from '../../api/dto';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  isLoading: boolean;
}

const TodoListItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit, isLoading }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const toggleEdit = () => {
    setIsEditing(true);
  };

  const handleToggleCompleted = (completed: boolean) => {
    onToggle(todo.id, completed);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <ListItem
      secondaryAction={
        <Box sx={{ display: 'flex', gap: 2 }}>
          {
            isEditing ? (
              <>
                <IconButton edge="end" onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
                <IconButton edge="end" onClick={handleCancel}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton edge="end" onClick={toggleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </>
            )
          }
        </Box>
      }
    >
      {
        isEditing ? (
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            variant="standard"
            autoFocus
          />
        ) : (
          <>
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={(e) => handleToggleCompleted(e.target.checked)}
            />
            <ListItemText primary={
              <Box
                component="span"
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
              >{todo.text}</Box>
            } secondary={
              todo.createdAt.toLocaleString()
            } />
          </>
        )
      }
    </ListItem>
  )
}

export default TodoListItem;