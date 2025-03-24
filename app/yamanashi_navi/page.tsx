'use client'

import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from "@/plugin/axios";
import { Message } from '@mui/icons-material';

interface Message {
  role: "user" | "ai";
  content: string;
  time_stamp: string;
}

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');

  const fetchMessages = async () => {
  
    try {
      const response = await axios(`/api/web/history/`); 
      const data= response.data;
      setMessages(data.messages);
      setUsername(response.data.user_name)

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    
  };

  useEffect(() => {

    fetchMessages();
  }, []);

  useEffect(() => {

    console.log(messages)
  }, [messages])

  

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      //id: messages[messages.length - 1]?.id,
      role: 'user',
      content: input,
      time_stamp: new Date().toISOString(),
    };

    try {

      const response = await fetch(`/api/web/history/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json()
      setMessages((prevMessages) => [...prevMessages, newMessage, data]);
      

    } catch (error) {
      console.error('Error sending message:', error);
    }


    setInput('');
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            {username}
          </Typography>

          <IconButton color="inherit" onClick={() => setMessages([])}>
            <Typography variant="h6" component="div">✖クリア</Typography>
          </IconButton>
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
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <ListItem key={index} sx={{ justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <ListItemText
                primary={message.content}
                secondary={new Date(message.time_stamp).toLocaleString()}
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
