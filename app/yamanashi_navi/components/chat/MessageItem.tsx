import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Message } from '../../types';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <ListItem sx={{ justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <ListItemText
        primary={message.content}
        secondary={new Date(message.time_stamp).toLocaleString()}
        sx={{
          bgcolor: isUser ? 'primary.main' : 'grey.300',
          color: isUser ? 'white' : 'black',
          borderRadius: 2,
          px: 2,
          py: 1,
          maxWidth: '75%',
        }}
      />
    </ListItem>
  );
};