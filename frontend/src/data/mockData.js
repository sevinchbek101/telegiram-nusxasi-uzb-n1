// Mock data for Telegram Clone

export const mockUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  phone: "+1234567890",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "Living life to the fullest 🌟",
  lastSeen: new Date()
};

export const mockContacts = [
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Wilson",
    username: "sarahw",
    phone: "+1234567891",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    lastSeen: new Date()
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    username: "mikej",
    phone: "+1234567892",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: 4,
    firstName: "Emma",
    lastName: "Davis",
    username: "emmad",
    phone: "+1234567893",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    lastSeen: new Date()
  },
  {
    id: 5,
    firstName: "Tech News",
    lastName: "",
    username: "technews",
    phone: "",
    avatar: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop",
    isOnline: false,
    lastSeen: new Date(Date.now() - 7200000), // 2 hours ago
    isChannel: true
  }
];

export const mockChats = [
  {
    id: 1,
    participants: [mockUser.id, 2],
    type: "private",
    title: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    lastMessage: {
      id: 1,
      text: "Hey! How are you doing today?",
      senderId: 2,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isRead: false
    },
    unreadCount: 2,
    isPinned: true
  },
  {
    id: 2,
    participants: [mockUser.id, 3],
    type: "private",
    title: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    lastMessage: {
      id: 2,
      text: "Sure, let's meet at 3 PM",
      senderId: mockUser.id,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isRead: true
    },
    unreadCount: 0,
    isPinned: false
  },
  {
    id: 3,
    participants: [mockUser.id, 4],
    type: "private",
    title: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    lastMessage: {
      id: 3,
      text: "Thanks for sharing those photos!",
      senderId: 4,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: true
    },
    unreadCount: 0,
    isPinned: false
  },
  {
    id: 4,
    participants: [mockUser.id, 5],
    type: "channel",
    title: "Tech News",
    avatar: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop",
    lastMessage: {
      id: 4,
      text: "🚀 New AI breakthrough announced today!",
      senderId: 5,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true
    },
    unreadCount: 0,
    isPinned: false
  }
];

export const mockMessages = {
  1: [ // Chat with Sarah Wilson
    {
      id: 1,
      text: "Hey John! How's your day going?",
      senderId: 2,
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      type: "text"
    },
    {
      id: 2,
      text: "Hi Sarah! It's going well, thanks for asking. How about you?",
      senderId: mockUser.id,
      timestamp: new Date(Date.now() - 3300000),
      isRead: true,
      type: "text"
    },
    {
      id: 3,
      text: "Great! I just finished a big project at work 🎉",
      senderId: 2,
      timestamp: new Date(Date.now() - 3000000),
      isRead: true,
      type: "text"
    },
    {
      id: 4,
      text: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      senderId: 2,
      timestamp: new Date(Date.now() - 2700000),
      isRead: true,
      type: "image",
      caption: "Check out this beautiful sunset from my office!"
    },
    {
      id: 5,
      text: "Wow, that's absolutely stunning! Congratulations on finishing your project! 🎊",
      senderId: mockUser.id,
      timestamp: new Date(Date.now() - 2400000),
      isRead: true,
      type: "text"
    },
    {
      id: 6,
      text: "Hey! How are you doing today?",
      senderId: 2,
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      type: "text"
    },
    {
      id: 7,
      text: "Want to catch up over coffee this weekend?",
      senderId: 2,
      timestamp: new Date(Date.now() - 120000),
      isRead: false,
      type: "text"
    }
  ],
  2: [ // Chat with Mike Johnson
    {
      id: 8,
      text: "Hey Mike, are we still on for the meeting today?",
      senderId: mockUser.id,
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      type: "text"
    },
    {
      id: 9,
      text: "Yes! Let's meet at the usual place",
      senderId: 3,
      timestamp: new Date(Date.now() - 6900000),
      isRead: true,
      type: "text"
    },
    {
      id: 10,
      text: "Perfect. What time works for you?",
      senderId: mockUser.id,
      timestamp: new Date(Date.now() - 6600000),
      isRead: true,
      type: "text"
    },
    {
      id: 11,
      text: "Sure, let's meet at 3 PM",
      senderId: mockUser.id,
      timestamp: new Date(Date.now() - 1800000),
      isRead: true,
      type: "text"
    }
  ],
  3: [ // Chat with Emma Davis
    {
      id: 12,
      text: "Emma, I have some photos from yesterday's event",
      senderId: mockUser.id,
      timestamp: new Date(Date.now() - 14400000),
      isRead: true,
      type: "text"
    },
    {
      id: 13,
      text: "project_photos.zip",
      senderId: mockUser.id,
      timestamp: new Date(Date.now() - 14100000),
      isRead: true,
      type: "file",
      fileSize: "2.4 MB",
      fileName: "project_photos.zip"
    },
    {
      id: 14,
      text: "Thanks for sharing those photos!",
      senderId: 4,
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      type: "text"
    }
  ],
  4: [ // Tech News Channel
    {
      id: 15,
      text: "🚀 New AI breakthrough announced today! Scientists have developed a revolutionary neural network architecture.",
      senderId: 5,
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      type: "text"
    },
    {
      id: 16,
      text: "📱 Mobile app development trends for 2025",
      senderId: 5,
      timestamp: new Date(Date.now() - 10800000),
      isRead: true,
      type: "text"
    }
  ]
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const formatTime = (date) => {
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) { // Less than 1 minute
    return 'now';
  } else if (diff < 3600000) { // Less than 1 hour
    return `${Math.floor(diff / 60000)}m ago`;
  } else if (diff < 86400000) { // Less than 1 day
    return `${Math.floor(diff / 3600000)}h ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const formatMessageTime = (date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};