import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import { 
  MoreVertical, 
  Pin, 
  Archive, 
  Bell, 
  BellOff, 
  UserPlus, 
  Settings, 
  Trash2,
  Flag,
  Copy,
  Share
} from 'lucide-react';

const ChatOptionsMenu = ({ chat, onAction }) => {
  const { toast } = useToast();

  const handleAction = (action, data = {}) => {
    switch (action) {
      case 'pin':
        toast({
          title: chat?.isPinned ? "Chat unpinned" : "Chat pinned",
          description: chat?.isPinned ? "Chat removed from pinned" : "Chat added to pinned"
        });
        break;
      case 'mute':
        toast({
          title: "Chat muted",
          description: "You won't receive notifications from this chat"
        });
        break;
      case 'archive':
        toast({
          title: "Chat archived",
          description: "Chat moved to archived folder"
        });
        break;
      case 'addMembers':
        toast({
          title: "Add members",
          description: "Feature coming soon"
        });
        break;
      case 'chatInfo':
        toast({
          title: "Chat info",
          description: "Feature coming soon"
        });
        break;
      case 'report':
        toast({
          title: "Report sent",
          description: "Thank you for reporting"
        });
        break;
      case 'copy':
        toast({
          title: "Link copied",
          description: "Chat link copied to clipboard"
        });
        break;
      case 'share':
        toast({
          title: "Share chat",
          description: "Feature coming soon"
        });
        break;
      case 'delete':
        toast({
          title: "Chat deleted",
          description: "Chat has been removed",
          variant: "destructive"
        });
        break;
      default:
        break;
    }
    
    if (onAction) {
      onAction(action, data);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleAction('pin')} className="flex items-center gap-2">
          <Pin className="w-4 h-4" />
          {chat?.isPinned ? 'Unpin Chat' : 'Pin Chat'}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('mute')} className="flex items-center gap-2">
          <BellOff className="w-4 h-4" />
          Mute Notifications
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('archive')} className="flex items-center gap-2">
          <Archive className="w-4 h-4" />
          Archive Chat
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {chat?.type === 'group' && (
          <DropdownMenuItem onClick={() => handleAction('addMembers')} className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add Members
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => handleAction('chatInfo')} className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Chat Info
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('copy')} className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          Copy Link
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('share')} className="flex items-center gap-2">
          <Share className="w-4 h-4" />
          Share Chat
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleAction('report')} className="flex items-center gap-2">
          <Flag className="w-4 h-4" />
          Report
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleAction('delete')} 
          className="flex items-center gap-2 text-red-600 dark:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
          Delete Chat
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatOptionsMenu;