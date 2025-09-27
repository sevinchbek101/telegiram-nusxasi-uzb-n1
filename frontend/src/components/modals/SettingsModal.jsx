import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../hooks/use-toast';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  HelpCircle,
  LogOut,
  Edit3,
  Camera
} from 'lucide-react';

const SettingsModal = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    bio: user?.bio || ''
  });
  const [notifications, setNotifications] = useState({
    messages: true,
    groups: true,
    channels: false,
    calls: true,
    sounds: true
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved"
    });
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
    onClose();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: `${key} notifications ${value ? 'enabled' : 'disabled'}`
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar} alt={user?.firstName} />
                  <AvatarFallback className="bg-[#0088cc] text-white text-2xl">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                  onClick={() => toast({ title: "Feature coming soon", description: "Photo upload will be available soon" })}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-lg">{user?.firstName} {user?.lastName}</h3>
                <p className="text-gray-500 dark:text-gray-400">@{user?.username}</p>
                <p className="text-gray-500 dark:text-gray-400">{user?.phone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Profile Information</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  {editMode ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={userInfo.username}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={userInfo.bio}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <Button onClick={handleSaveProfile} className="w-full">
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Bio:</strong> {user?.bio || 'No bio set'}</p>
                  <p><strong>Member since:</strong> January 2025</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Message notifications</p>
                    <p className="text-sm text-gray-500">Get notified for new messages</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.messages} 
                  onCheckedChange={(checked) => handleNotificationChange('messages', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Group notifications</p>
                    <p className="text-sm text-gray-500">Get notified for group messages</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.groups} 
                  onCheckedChange={(checked) => handleNotificationChange('groups', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Channel notifications</p>
                    <p className="text-sm text-gray-500">Get notified for channel updates</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.channels} 
                  onCheckedChange={(checked) => handleNotificationChange('channels', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Call notifications</p>
                    <p className="text-sm text-gray-500">Get notified for incoming calls</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.calls} 
                  onCheckedChange={(checked) => handleNotificationChange('calls', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Sound notifications</p>
                    <p className="text-sm text-gray-500">Play sounds for notifications</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.sounds} 
                  onCheckedChange={(checked) => handleNotificationChange('sounds', checked)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Shield className="w-5 h-5 text-[#0088cc]" />
                <div>
                  <p className="font-medium">End-to-end encryption</p>
                  <p className="text-sm text-gray-500">Your messages are secured with end-to-end encryption</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Privacy Settings</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Last seen</span>
                    <span className="text-[#0088cc]">Everybody</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Profile photo</span>
                    <span className="text-[#0088cc]">My contacts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phone number</span>
                    <span className="text-[#0088cc]">My contacts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Forwarded messages</span>
                    <span className="text-[#0088cc]">Everybody</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => toast({ title: "Feature coming soon", description: "Advanced privacy settings will be available soon" })}>
                <Shield className="w-4 h-4 mr-2" />
                Advanced Privacy Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Dark mode</p>
                    <p className="text-sm text-gray-500">Use dark theme</p>
                  </div>
                </div>
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={toggleTheme}
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Theme Options</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 border rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded mb-2"></div>
                    <span className="text-sm">Classic</span>
                  </div>
                  <div className="p-3 border rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="w-full h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded mb-2"></div>
                    <span className="text-sm">Dark</span>
                  </div>
                  <div className="p-3 border rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded mb-2"></div>
                    <span className="text-sm">Nature</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => toast({ title: "Feature coming soon", description: "Custom themes will be available soon" })}>
                <Download className="w-4 h-4 mr-2" />
                Browse More Themes
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => toast({ title: "Help", description: "Help documentation will be available soon" })}>
            <HelpCircle className="w-4 h-4 mr-2" />
            Help
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;