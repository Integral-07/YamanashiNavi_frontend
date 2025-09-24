'use client'

import { useState, useEffect } from 'react';
import axios from "@/plugin/axios";
import { Message } from '../types';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState('Guest');
  const [isInputActive, setIsInputActive] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await axios(`/api/web/history/`);
      const data = response.data;
      setMessages(data.messages);
      setUsername(response.data.user_name);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (content: string): Promise<void> => {
    if (!isInputActive) {
      alert("AIが返信中です...");
      return;
    }

    if (content.trim() === '') return;

    const newMessage: Message = {
      role: 'user',
      content: content,
      time_stamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsInputActive(false);

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

      const aiMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
    }

    setIsInputActive(true);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return {
    messages,
    username,
    isInputActive,
    sendMessage,
    clearMessages,
  };
};