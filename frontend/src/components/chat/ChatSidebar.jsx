import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useChat } from '../../contexts/ChatContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Menu, Moon, Sun, Settings, Edit, Pin } from 'lucide-react';
import { formatTime } from '../../data/mockData';
import SettingsModal from '../modals/SettingsModal';
import SearchModal from '../modals/SearchModal';
import MainMenu from '../menus/MainMenu';

const ChatSidebar = () => {
  const { chats, activeChat, searchQuery, setSearchQuery, selectChat, getFilteredChats } = useChat();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const filteredChats = getFilteredChats();
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleChatSelect = (chatId) => {
    selectChat(chatId);
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <MainMenu onSettingsClick={() => setShowSettings(true)} />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)} className="p-2">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearch(true)}
            className="pl-10 bg-gray-100 dark:bg-gray-800 border-none"
          />
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.avatar} alt={user?.firstName} />
            <AvatarFallback className="bg-[#0088cc] text-white">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              @{user?.username}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)} className="p-2">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <p>No chats found</p>
          </div>
        ) : (
          filteredChats.map((chat) => {
            const isActive = activeChat === chat.id;
            const hasUnread = chat.unreadCount > 0;
            
            return (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  isActive ? 'bg-[#0088cc]/10 border-r-2 border-r-[#0088cc]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.avatar} alt={chat.title} />
                      <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                        {chat.title[0]}
                      </AvatarFallback>
                    </Avatar>
                    {chat.type === 'channel' && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-medium truncate ${
                          hasUnread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {chat.title}
                        </h3>
                        {chat.isPinned && (
                          <Pin className="w-3 h-3 text-gray-400 transform rotate-45" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {formatTime(chat.lastMessage.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate flex-1 ${
                        hasUnread ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {chat.lastMessage.text.startsWith('📎') ? (
                          <span className="flex items-center gap-1">
                            📎 {chat.lastMessage.text.slice(2)}
                          </span>
                        ) : (
                          chat.lastMessage.text
                        )}
                      </p>
                      
                      {hasUnread && (
                        <Badge className="bg-[#0088cc] text-white text-xs px-2 py-1 rounded-full ml-2">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
};

export default ChatSidebar;