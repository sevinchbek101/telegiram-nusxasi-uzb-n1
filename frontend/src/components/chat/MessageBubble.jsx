import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import { formatMessageTime } from '../../data/mockData';
import { Download, FileText, Image as ImageIcon, Check, CheckCheck } from 'lucide-react';

const MessageBubble = ({ message, isOwn, showAvatar = true, contact }) => {
  const { user } = useAuth();
  
  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <div className="rounded-lg overflow-hidden max-w-xs">
              <img 
                src={message.text} 
                alt="Shared image" 
                className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(message.text, '_blank')}
              />
            </div>
            {message.caption && (
              <p className="text-sm">{message.caption}</p>
            )}
          </div>
        );
        
      case 'file':
        return (
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg max-w-xs">
            <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{message.fileName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{message.fileSize}</p>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        );
        
      default:
        return (
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        );
    }
  };

  return (
    <div className={`flex gap-2 mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {!isOwn && showAvatar && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={contact?.avatar} alt={contact?.firstName} />
          <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs">
            {contact?.firstName?.[0]}
          </AvatarFallback>
        </Avatar>
      )}
      
      {!isOwn && !showAvatar && (
        <div className="w-8" /> // Spacing for alignment
      )}
      
      <div className={`max-w-[70%] ${isOwn ? 'order-1' : 'order-2'}`}>
        <div
          className={`rounded-2xl px-4 py-2 relative ${
            isOwn
              ? 'bg-[#0088cc] text-white ml-auto'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
          }`}
        >
          {renderMessageContent()}
          
          {/* Message time and status */}
          <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <span className={`text-xs ${
              isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {formatMessageTime(message.timestamp)}
            </span>
            
            {isOwn && (
              <div className="flex items-center">
                {message.isRead ? (
                  <CheckCheck className="w-3 h-3 text-blue-100" />
                ) : (
                  <Check className="w-3 h-3 text-blue-100" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;