import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Message } from '../../types';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box sx={{
      flexGrow: 1,
      overflowY: 'auto',
      my: 2,
      marginBottom: '80px',
      bgcolor: 'grey.100',
      borderRadius: 2,
      p: 2,
    }}>
      <List>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No messages available" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};