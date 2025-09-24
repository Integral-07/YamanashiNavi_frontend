'use client'

import { useState } from 'react';

interface UseMessageInputProps {
  onSend: (message: string) => Promise<void>;
  isDisabled: boolean;
}

export const useMessageInput = ({ onSend, isDisabled }: UseMessageInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '' || isDisabled) return;

    const messageToSend = input;
    setInput(''); // Clear input immediately for better UX

    await onSend(messageToSend);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  return {
    input,
    handleSend,
    handleKeyPress,
    handleInputChange,
  };
};