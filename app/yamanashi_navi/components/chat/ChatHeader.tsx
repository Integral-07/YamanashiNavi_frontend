import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

interface ChatHeaderProps {
  username: string;
  onClear: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ username, onClear }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          {username}
        </Typography>

        <IconButton color="inherit" onClick={onClear}>
          <Typography variant="h6" component="div">✖クリア</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};