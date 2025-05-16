import React, { FC, useState } from 'react';
import { ListItem, ListItemText, Box, IconButton, Checkbox, TextField, LinearProgress, Tooltip } from '@mui/material';
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
                <Tooltip title="Save">
                <IconButton edge="end" onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
                </Tooltip>
                <Tooltip title="Cancel">
                  <IconButton edge="end" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Edit">
                  <IconButton edge="end" onClick={toggleEdit} disabled={isLoading}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton edge="end" onClick={handleDelete} disabled={isLoading}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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
            <Tooltip title="Mark as completed">
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={(e) => handleToggleCompleted(e.target.checked)}
                disabled={isLoading}
              />
            </Tooltip>
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
      {
        isLoading && (
          <Box sx={{width: '100%', position: 'absolute', bottom: 0, left: 0}}>
            <LinearProgress />
          </Box>
        )
      }
    </ListItem>
  )
}

export default TodoListItem;