import React, { FC, useState } from 'react';
import { ListItem, ListItemText, Box, IconButton, Checkbox, TextField, LinearProgress, Tooltip, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Todo } from '../../dto/Todo';
import { TodoState } from '../../dto/TodoStates';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  state: TodoState;
}

const TodoListItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit, state }) => {

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
      divider
      data-testid="todo-list-item"
      secondaryAction={
        <Box sx={{ display: 'flex', gap: 2 }}>
          {
            isEditing ? (
              <>
                <Tooltip title="Save">
                <IconButton data-testid="save-button" edge="end" onClick={handleSave} disabled={state === TodoState.UPDATING || state === TodoState.DELETING}>
                  <SaveIcon />
                </IconButton>
                </Tooltip>
                <Tooltip title="Cancel">
                  <IconButton data-testid="cancel-button" edge="end" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Edit">
                  <IconButton data-testid="edit-button" edge="end" onClick={toggleEdit} disabled={state === TodoState.UPDATING || state === TodoState.DELETING}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton data-testid="delete-button" edge="end" onClick={handleDelete} disabled={state === TodoState.DELETING || state === TodoState.UPDATING}>
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
            data-testid="edit-text-field"
          />
        ) : (
          <>
            <Tooltip title="Mark as completed">
              <Checkbox
                data-testid="complete-checkbox"
                edge="start"
                checked={todo.completed}
                onChange={(e) => handleToggleCompleted(e.target.checked)}
                disabled={state === TodoState.UPDATING || state === TodoState.DELETING}
              />
            </Tooltip>
            <ListItemText primary={
              state === TodoState.UPDATING ? (
                <Skeleton variant="text" width="30%" height={20} /> 
              ) : (
                <Box
                  component="span"
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                  }}
                >{todo.text}</Box>
              )
            } secondary={
              state === TodoState.UPDATING ? (
                <Skeleton variant="text" width="40%" height={20} />
              ) : (
                todo.createdAt.toLocaleString()
              )
            } />
          </>
        )
      }
      {
        state === TodoState.DELETING && (
          <Box sx={{width: '100%', position: 'absolute', bottom: 0, left: 0}}>
            <LinearProgress />
          </Box>
        )
      }
    </ListItem>
  )
}

export default TodoListItem;