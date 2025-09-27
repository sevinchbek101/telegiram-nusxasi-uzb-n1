import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { 
  Menu, 
  User, 
  Users, 
  MessageSquare, 
  Settings, 
  Bell, 
  Archive,
  Bookmark,
  HelpCircle,
  Keyboard,
  LogOut
} from 'lucide-react';

const MainMenu = ({ onSettingsClick }) => {
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleAction = (action) => {
    switch (action) {
      case 'newGroup':
        toast({
          title: "New Group",
          description: "Create new group feature coming soon"
        });
        break;
      case 'newChannel':
        toast({
          title: "New Channel",
          description: "Create new channel feature coming soon"
        });
        break;
      case 'contacts':
        toast({
          title: "Contacts",
          description: "Contact management feature coming soon"
        });
        break;
      case 'settings':
        if (onSettingsClick) {
          onSettingsClick();
        }
        break;
      case 'archived':
        toast({
          title: "Archived Chats",
          description: "View archived chats feature coming soon"
        });
        break;
      case 'saved':
        toast({
          title: "Saved Messages",
          description: "Saved messages feature coming soon"
        });
        break;
      case 'notifications':
        toast({
          title: "Notifications",
          description: "Notification settings feature coming soon"
        });
        break;
      case 'help':
        toast({
          title: "Help & FAQ",
          description: "Help documentation feature coming soon"
        });
        break;
      case 'keyboard':
        toast({
          title: "Keyboard Shortcuts",
          description: "Keyboard shortcuts feature coming soon"
        });
        break;
      case 'logout':
        logout();
        toast({
          title: "Logged out",
          description: "You have been successfully logged out"
        });
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <Menu className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={() => handleAction('newGroup')} className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          New Group
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('newChannel')} className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          New Channel
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('contacts')} className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Contacts
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleAction('saved')} className="flex items-center gap-2">
          <Bookmark className="w-4 h-4" />
          Saved Messages
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('archived')} className="flex items-center gap-2">
          <Archive className="w-4 h-4" />
          Archived Chats
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('notifications')} className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Notifications
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleAction('settings')} className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('keyboard')} className="flex items-center gap-2">
          <Keyboard className="w-4 h-4" />
          Keyboard Shortcuts
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('help')} className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          Help & FAQ
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleAction('logout')} 
          className="flex items-center gap-2 text-red-600 dark:text-red-400"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MainMenu;