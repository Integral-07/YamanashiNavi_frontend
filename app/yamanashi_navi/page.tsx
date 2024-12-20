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
    /*
    try {
      const response = await axios.get('/api/with_chatGPT');
      console.log(response);
      const data: Message[] = response.data;
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    */
    messages.push({
      id: "1",
      role: "user",
      content: "こんにちは、元気ですか？",
      timestamp: new Date().toISOString()
    });

    messages.push({
      id: "2",
      role: "bot",
      content: "はい！元気です！",
      timestamp: new Date().toISOString()
    });
    
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
            あい と会話する
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Chat area */}
      <Box sx={{
        flexGrow: 1,
        overflowY: 'auto',
        my: 2,
        marginBottom: '80px', // Input area height + padding
        bgcolor: 'grey.100', // 背景を薄い灰色に設定
        borderRadius: 2,     // 少し角を丸く
        p: 2,                // 内側に余白を追加
      }}>
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
      <Box sx={{
    position: 'fixed',
    bottom: 20,
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'background.paper',
    p: 1,
    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)', // Optional for styling
    }}>
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
