import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockChats, mockMessages, mockContacts, generateId } from '../data/mockData';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(mockChats);
  const [messages, setMessages] = useState(mockMessages);
  const [activeChat, setActiveChat] = useState(null);
  const [contacts, setContacts] = useState(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');

  const sendMessage = (chatId, messageData) => {
    const newMessage = {
      id: generateId(),
      text: messageData.text,
      senderId: 1, // Current user ID
      timestamp: new Date(),
      isRead: false,
      type: messageData.type || 'text',
      fileName: messageData.fileName,
      fileSize: messageData.fileSize,
      caption: messageData.caption
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    // Update last message in chat
    setChats(prev => prev.map(chat => 
      chat.id === chatId
        ? {
            ...chat,
            lastMessage: {
              ...newMessage,
              text: messageData.type === 'file' ? `📎 ${messageData.fileName}` : messageData.text
            }
          }
        : chat
    ));
  };

  const markMessagesAsRead = (chatId) => {
    setMessages(prev => ({
      ...prev,
      [chatId]: (prev[chatId] || []).map(msg => ({ ...msg, isRead: true }))
    }));

    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    ));
  };

  const selectChat = (chatId) => {
    setActiveChat(chatId);
    markMessagesAsRead(chatId);
  };

  const getChatMessages = (chatId) => {
    return messages[chatId] || [];
  };

  const getFilteredChats = () => {
    if (!searchQuery) return chats;
    
    return chats.filter(chat => 
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.lastMessage && chat.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const value = {
    chats,
    messages,
    activeChat,
    contacts,
    searchQuery,
    setSearchQuery,
    sendMessage,
    selectChat,
    getChatMessages,
    getFilteredChats,
    markMessagesAsRead
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};