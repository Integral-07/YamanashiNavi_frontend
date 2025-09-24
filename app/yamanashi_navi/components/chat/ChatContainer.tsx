'use client'

import React from 'react';
import { Container } from '@mui/material';
import { useChatMessages } from '../../hooks';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export const ChatContainer: React.FC = () => {
  const {
    messages,
    username,
    isInputActive,
    sendMessage,
    clearMessages,
  } = useChatMessages();

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader username={username} onClear={clearMessages} />

      <MessageList messages={messages} />

      <MessageInput onSend={sendMessage} isDisabled={!isInputActive} />
    </Container>
  );
};