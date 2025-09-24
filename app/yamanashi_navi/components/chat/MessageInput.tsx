import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useMessageInput } from '../../hooks';

interface MessageInputProps {
  onSend: (message: string) => Promise<void>;
  isDisabled: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, isDisabled }) => {
  const { input, handleSend, handleKeyPress, handleInputChange } = useMessageInput({
    onSend,
    isDisabled,
  });

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 20,
      left: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      bgcolor: 'background.paper',
      p: 1,
      boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
    }}>
      <TextField
        variant="outlined"
        placeholder="メッセージを入力..."
        fullWidth
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isDisabled}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        sx={{ ml: 1 }}
        disabled={isDisabled || input.trim() === ''}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};