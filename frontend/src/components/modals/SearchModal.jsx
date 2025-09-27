import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useChat } from '../../contexts/ChatContext';
import { Search, X, User, MessageSquare, Hash, Clock } from 'lucide-react';
import { formatTime } from '../../data/mockData';

const SearchModal = ({ isOpen, onClose }) => {
  const { chats, messages, contacts, selectChat } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    chats: [],
    messages: [],
    contacts: []
  });
  const [activeTab, setActiveTab] = useState('all');
  const [recentSearches, setRecentSearches] = useState([
    'Sarah Wilson',
    'project photos',
    'meeting',
    'Tech News'
  ]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ chats: [], messages: [], contacts: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Search chats
    const matchingChats = chats.filter(chat => 
      chat.title.toLowerCase().includes(query)
    );

    // Search messages
    const matchingMessages = [];
    Object.entries(messages).forEach(([chatId, chatMessages]) => {
      const chat = chats.find(c => c.id === parseInt(chatId));
      if (chat) {
        const filteredMessages = chatMessages.filter(msg => 
          msg.text.toLowerCase().includes(query)
        );
        filteredMessages.forEach(msg => {
          matchingMessages.push({ ...msg, chatTitle: chat.title, chatId: chat.id });
        });
      }
    });

    // Search contacts
    const matchingContacts = contacts.filter(contact => 
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(query) ||
      contact.username.toLowerCase().includes(query)
    );

    setSearchResults({
      chats: matchingChats,
      messages: matchingMessages.slice(0, 10), // Limit results
      contacts: matchingContacts
    });
  }, [searchQuery, chats, messages, contacts]);

  const handleChatSelect = (chatId) => {
    selectChat(chatId);
    addToRecentSearches(chats.find(c => c.id === chatId)?.title);
    onClose();
  };

  const handleMessageSelect = (message) => {
    selectChat(message.chatId);
    addToRecentSearches(message.text.substring(0, 20));
    onClose();
  };

  const addToRecentSearches = (query) => {
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const getTotalResults = () => {
    return searchResults.chats.length + searchResults.messages.length + searchResults.contacts.length;
  };

  const renderSearchResults = () => {
    if (!searchQuery.trim()) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Searches
            </h3>
            {recentSearches.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                Clear
              </Button>
            )}
          </div>
          
          {recentSearches.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No recent searches
            </p>
          ) : (
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (getTotalResults() === 0) {
      return (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try searching for something else
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
          {[
            { key: 'all', label: 'All', count: getTotalResults() },
            { key: 'chats', label: 'Chats', count: searchResults.chats.length },
            { key: 'messages', label: 'Messages', count: searchResults.messages.length },
            { key: 'contacts', label: 'People', count: searchResults.contacts.length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-[#0088cc] text-[#0088cc]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {/* Chats */}
          {(activeTab === 'all' || activeTab === 'chats') && searchResults.chats.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chats
              </h4>
              {searchResults.chats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => handleChatSelect(chat.id)}
                  className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={chat.avatar} alt={chat.title} />
                    <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                      {chat.title[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {chat.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {chat.lastMessage.text}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatTime(chat.lastMessage.timestamp)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {(activeTab === 'all' || activeTab === 'messages') && searchResults.messages.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Search className="w-4 h-4" />
                Messages
              </h4>
              {searchResults.messages.map(message => (
                <button
                  key={message.id}
                  onClick={() => handleMessageSelect(message)}
                  className="flex items-start gap-3 w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {message.chatTitle}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {message.text}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {formatTime(message.timestamp)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Contacts */}
          {(activeTab === 'all' || activeTab === 'contacts') && searchResults.contacts.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4" />
                People
              </h4>
              {searchResults.contacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => {
                    // Find or create chat with this contact
                    const existingChat = chats.find(chat => 
                      chat.participants.includes(contact.id)
                    );
                    if (existingChat) {
                      handleChatSelect(existingChat.id);
                    }
                  }}
                  className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={contact.avatar} alt={contact.firstName} />
                    <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                      {contact.firstName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{contact.username}
                    </p>
                  </div>
                  {contact.isOnline && (
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search
          </DialogTitle>
          <DialogDescription>
            Search for chats, messages, and people
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search Telegram"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Search Results */}
          <div className="overflow-y-auto">
            {renderSearchResults()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;