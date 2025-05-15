import React, { FC } from 'react';
import { List, ListItem, Skeleton } from '@mui/material';

const LoadingListState: FC = () => {
  return (
    <List>
      <ListItem>
        <Skeleton variant="text" width="100%" height={80} />
      </ListItem>
      <ListItem>
        <Skeleton variant="text" width="100%" height={80} />
      </ListItem>
      <ListItem>
        <Skeleton variant="text" width="100%" height={80} />
      </ListItem>
    </List>
  );
};

export default LoadingListState;