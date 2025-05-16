import React, { FC } from 'react';
import { List, ListItem, Typography } from '@mui/material';

const ListEmptyState: FC = () => {
  return (
    <List>
      <ListItem>
        <Typography variant="body1">No todos found, add one to get started</Typography>
      </ListItem>
    </List>
  );
};

export default ListEmptyState;
