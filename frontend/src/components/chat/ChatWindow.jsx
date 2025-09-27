import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import MessageBubble from './MessageBubble';
import FileUpload from './FileUpload';
import CallModal from '../modals/CallModal';
import SearchModal from '../modals/SearchModal';
import ChatOptionsMenu from '../menus/ChatOptionsMenu';
import { 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile,
  Mic,
  Search
} from 'lucide-react';

const ChatWindow = () => {
  const { activeChat, chats, getChatMessages, sendMessage, contacts } = useChat();
  const { user } = useAuth();
  const [messageText, setMessageText] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [callType, setCallType] = useState('voice');
  const [showSearch, setShowSearch] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const currentChat = chats.find(chat => chat.id === activeChat);
  const messages = getChatMessages(activeChat);
  const contact = contacts.find(c => c.id === currentChat?.participants?.find(p => p !== user?.id));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && activeChat) {
      sendMessage(activeChat, { text: messageText.trim() });
      setMessageText('');
      inputRef.current?.focus();
    }
  };

  const handleFileUpload = (fileData) => {
    if (activeChat) {
      sendMessage(activeChat, fileData);
      setShowFileUpload(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleStartCall = (type) => {
    setCallType(type);
    setShowCall(true);
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-[#0088cc]/10 rounded-full flex items-center justify-center">
            <svg className="w-20 h-20 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 8.16c-.048 1.416-.24 4.32-.336 5.712-.048.672-.144 1.44-.192 2.016-.048.48-.096.912-.144 1.296-.048.432-.144.816-.24 1.152-.096.288-.192.528-.288.72-.144.288-.336.528-.576.672-.192.12-.432.168-.672.12-.24-.048-.48-.144-.672-.288-.24-.192-.432-.432-.576-.72-.096-.192-.144-.432-.144-.672 0-.24.048-.48.144-.672.096-.24.24-.432.432-.576.144-.096.288-.144.432-.144.192 0 .384.048.528.144.144.096.24.24.288.432.048.144.048.288 0 .432-.048.144-.144.24-.288.288-.096.048-.192.048-.288 0-.096-.048-.144-.144-.144-.24 0-.096.048-.144.144-.144.048 0 .096.048.096.096 0 .048-.048.096-.096.096-.048 0-.096-.048-.096-.096 0-.096.096-.144.192-.096.096.048.144.144.096.24-.048.096-.144.144-.24.096-.144-.048-.24-.192-.192-.336.048-.192.24-.288.432-.24.24.048.432.24.384.48-.048.288-.336.48-.624.432-.384-.048-.672-.432-.624-.816.048-.48.48-.816.96-.768.576.048.96.576.912 1.152-.048.672-.672 1.152-1.344 1.104-.768-.048-1.296-.768-1.248-1.536.048-.864.864-1.488 1.728-1.44.96.048 1.632.96 1.584 1.92-.048 1.056-1.056 1.824-2.112 1.776-1.152-.048-1.968-1.152-1.92-2.304.048-1.248 1.248-2.16 2.496-2.112 1.344.048 2.304 1.344 2.256 2.688-.048 1.44-1.44 2.496-2.88 2.448-1.536-.048-2.64-1.536-2.592-3.072.048-1.632 1.632-2.832 3.264-2.784 1.728.048 2.976 1.728 2.928 3.456-.048 1.824-1.824 3.168-3.648 3.12-1.92-.048-3.312-1.92-3.264-3.84.048-2.016 2.016-3.504 4.032-3.456 2.112.048 3.648 2.112 3.6 4.224-.048 2.208-2.208 3.84-4.416 3.792-2.304-.048-3.984-2.304-3.936-4.608.048-2.4 2.4-4.176 4.8-4.128z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Select a chat to start messaging
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Choose from your existing conversations or start a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentChat?.avatar} alt={currentChat?.title} />
              <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                {currentChat?.title?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {currentChat?.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentChat?.type === 'channel' ? 'Channel' : 
                 contact?.isOnline ? 'Online' : `Last seen ${new Date(contact?.lastSeen).toLocaleString()}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowSearch(true)} className="p-2">
              <Search className="w-5 h-5" />
            </Button>
            {currentChat?.type !== 'channel' && (
              <>
                <Button variant="ghost" size="sm" onClick={() => handleStartCall('voice')} className="p-2">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleStartCall('video')} className="p-2">
                  <Video className="w-5 h-5" />
                </Button>
              </>
            )}
            <ChatOptionsMenu chat={currentChat} />
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800 relative">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              No messages yet. Say hello! 👋
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message, index) => {
              const isOwn = message.senderId === user?.id;
              const prevMessage = messages[index - 1];
              const showAvatar = !isOwn && (!prevMessage || prevMessage.senderId !== message.senderId);
              
              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  contact={contact}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      {currentChat?.type !== 'channel' && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <form onSubmit={handleSendMessage} className="flex items-end gap-3">
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="p-2"
                onClick={() => setShowFileUpload(!showFileUpload)}
              >
                <Paperclip className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="pr-12 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#0088cc] resize-none"
                multiline
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
              >
                <Smile className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
            
            {messageText.trim() ? (
              <Button 
                type="submit" 
                className="bg-[#0088cc] hover:bg-[#0077bb] p-3 rounded-full"
              >
                <Send className="w-5 h-5" />
              </Button>
            ) : (
              <Button 
                type="button" 
                variant="ghost" 
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Mic className="w-5 h-5" />
              </Button>
            )}
          </form>
          
          {showFileUpload && (
            <FileUpload 
              onFileUpload={handleFileUpload} 
              onClose={() => setShowFileUpload(false)} 
            />
          )}
        </div>
      )}

      {/* Modals */}
      <CallModal 
        isOpen={showCall} 
        onClose={() => setShowCall(false)} 
        contact={contact} 
        callType={callType} 
      />
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
};

export default ChatWindow;