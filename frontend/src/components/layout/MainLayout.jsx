import React from 'react';
import ChatSidebar from '../chat/ChatSidebar';
import ChatWindow from '../chat/ChatWindow';

const MainLayout = () => {
  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default MainLayout;