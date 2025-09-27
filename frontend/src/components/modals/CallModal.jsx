import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useToast } from '../../hooks/use-toast';
import { 
  Phone, 
  PhoneOff, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MoreHorizontal,
  Minimize2
} from 'lucide-react';

const CallModal = ({ isOpen, onClose, contact, callType = 'voice' }) => {
  const { toast } = useToast();
  const [callState, setCallState] = useState('calling'); // 'calling', 'connected', 'ended'
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(callType === 'video');
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Simulate call connecting after 3 seconds
    const connectTimer = setTimeout(() => {
      setCallState('connected');
      toast({
        title: "Call connected",
        description: `${callType === 'video' ? 'Video' : 'Voice'} call with ${contact?.firstName} is now active`
      });
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, [isOpen, contact, callType, toast]);

  useEffect(() => {
    let interval;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallState('ended');
    toast({
      title: "Call ended",
      description: `Call duration: ${formatDuration(duration)}`
    });
    setTimeout(() => {
      onClose();
      setCallState('calling');
      setDuration(0);
    }, 2000);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone on" : "Microphone off",
      description: isMuted ? "You are no longer muted" : "You are now muted"
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Camera off" : "Camera on",
      description: isVideoOn ? "Your camera is now off" : "Your camera is now on"
    });
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    toast({
      title: isSpeakerOn ? "Speaker off" : "Speaker on",
      description: isSpeakerOn ? "Audio switched to earpiece" : "Audio switched to speaker"
    });
  };

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMinimized ? 'sm:max-w-[300px]' : 'sm:max-w-[500px]'} bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0`}>
        <div className={`flex flex-col items-center ${isMinimized ? 'py-4' : 'py-8'}`}>
          {/* Minimize/Maximize Button */}
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>

          {!isMinimized && (
            <>
              {/* Contact Info */}
              <div className="text-center mb-8">
                <Avatar className="w-32 h-32 mb-4 mx-auto ring-4 ring-white/20">
                  <AvatarImage src={contact.avatar} alt={contact.firstName} />
                  <AvatarFallback className="bg-[#0088cc] text-white text-4xl">
                    {contact.firstName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-semibold mb-1">{contact.firstName} {contact.lastName}</h2>
                <p className="text-gray-300">
                  {callState === 'calling' && 'Calling...'}
                  {callState === 'connected' && formatDuration(duration)}
                  {callState === 'ended' && 'Call ended'}
                </p>
              </div>

              {/* Video Preview (if video call) */}
              {callType === 'video' && callState === 'connected' && (
                <div className="w-full mb-6">
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {isVideoOn ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <p className="text-white/80">Video call simulation</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <VideoOff className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-gray-400">Camera is off</p>
                      </div>
                    )}
                    
                    {/* Picture-in-picture (your video) */}
                    <div className="absolute bottom-4 right-4 w-24 h-18 bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-xs text-gray-300">You</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Minimized View */}
          {isMinimized && (
            <div className="flex items-center gap-3 w-full">
              <Avatar className="w-12 h-12">
                <AvatarImage src={contact.avatar} alt={contact.firstName} />
                <AvatarFallback className="bg-[#0088cc] text-white">
                  {contact.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{contact.firstName}</p>
                <p className="text-sm text-gray-300">
                  {callState === 'connected' ? formatDuration(duration) : 'Calling...'}
                </p>
              </div>
            </div>
          )}

          {/* Call Controls */}
          <div className={`flex items-center gap-4 ${isMinimized ? 'mt-4' : ''}`}>
            {/* Mute Button */}
            <Button
              onClick={toggleMute}
              className={`rounded-full p-4 ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'}`}
              size="lg"
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            {/* Video Toggle (if video call) */}
            {callType === 'video' && (
              <Button
                onClick={toggleVideo}
                className={`rounded-full p-4 ${!isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'}`}
                size="lg"
              >
                {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </Button>
            )}

            {/* Speaker Button */}
            <Button
              onClick={toggleSpeaker}
              className={`rounded-full p-4 ${isSpeakerOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/20 hover:bg-white/30'}`}
              size="lg"
            >
              {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </Button>

            {/* End Call Button */}
            <Button
              onClick={handleEndCall}
              className="rounded-full p-4 bg-red-500 hover:bg-red-600"
              size="lg"
            >
              <PhoneOff className="w-6 h-6" />
            </Button>

            {/* More Options */}
            <Button
              className="rounded-full p-4 bg-white/20 hover:bg-white/30"
              size="lg"
              onClick={() => toast({ title: "More options", description: "Additional call features coming soon" })}
            >
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </div>

          {/* Call Status Indicator */}
          {callState === 'calling' && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 animate-pulse" />
          )}
          {callState === 'connected' && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-green-500" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;