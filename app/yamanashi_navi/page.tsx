'use client'

import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

interface Message {
  id: string;
  role: string; 
  content: string;
  timestamp: string;
}

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
/*
  axios.get('http://127.0.0.1:8000/api/with_chatGPT')
        .then(response=>{
          console.log("status:",response.status)
          console.log("axiosGetData:",response.data)
        })
        .catch(err=>{
          console.log("axiosGetErr",err)
        })
*/
  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/with_chatGPT');
      console.log(response);
      const data: Message[] = response.data; // axiosでは response.data を使う
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    // Optimistically update the UI
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await fetch('/api/with_chatGPT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            チャット
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Chat area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', my: 2 }}>
        <List>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <ListItem key={message.id} sx={{ justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <ListItemText
                primary={message.content}
                secondary={new Date(message.timestamp).toLocaleString()}
                sx={{
                  bgcolor: message.role === 'user' ? 'primary.main' : 'grey.300',
                  color: message.role === 'user' ? 'white' : 'black',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  maxWidth: '75%',
                }}
              />
            </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No messages available" />
        </ListItem>
      )}
        </List>
      </Box>

      {/* Input area */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <TextField
          variant="outlined"
          placeholder="メッセージを入力..."
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Page;
