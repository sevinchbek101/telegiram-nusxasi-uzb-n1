import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAuth } from '../../contexts/AuthContext';
import { Phone, QrCode, Loader2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'verification'
  const { login, loginWithQR, isLoading } = useAuth();
  const { toast } = useToast();

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    if (step === 'phone') {
      // Mock sending verification code
      if (phoneNumber.length < 10) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid phone number",
          variant: "destructive" 
        });
        return;
      }
      setStep('verification');
      toast({
        title: "Verification code sent",
        description: "Enter the 6-digit code sent to your phone"
      });
    } else {
      // Verify code and login
      if (verificationCode.length !== 6) {
        toast({
          title: "Invalid code",
          description: "Please enter a valid 6-digit code",
          variant: "destructive"
        });
        return;
      }
      
      const result = await login({ phone: phoneNumber });
      if (result.success) {
        toast({
          title: "Welcome to Telegram!",
          description: "Successfully logged in"
        });
      } else {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive"
        });
      }
    }
  };

  const handleQRLogin = async () => {
    const result = await loginWithQR();
    if (result.success) {
      toast({
        title: "Welcome to Telegram!",
        description: "Successfully logged in with QR code"
      });
    } else {
      toast({
        title: "QR Login failed",
        description: result.error,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-[#0088cc] rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 8.16c-.048 1.416-.24 4.32-.336 5.712-.048.672-.144 1.44-.192 2.016-.048.48-.096.912-.144 1.296-.048.432-.144.816-.24 1.152-.096.288-.192.528-.288.72-.144.288-.336.528-.576.672-.192.12-.432.168-.672.12-.24-.048-.48-.144-.672-.288-.24-.192-.432-.432-.576-.72-.096-.192-.144-.432-.144-.672 0-.24.048-.48.144-.672.096-.24.24-.432.432-.576.144-.096.288-.144.432-.144.192 0 .384.048.528.144.144.096.24.24.288.432.048.144.048.288 0 .432-.048.144-.144.24-.288.288-.096.048-.192.048-.288 0-.096-.048-.144-.144-.144-.24 0-.096.048-.144.144-.144.048 0 .096.048.096.096 0 .048-.048.096-.096.096-.048 0-.096-.048-.096-.096 0-.096.096-.144.192-.096.096.048.144.144.096.24-.048.096-.144.144-.24.096-.144-.048-.24-.192-.192-.336.048-.192.24-.288.432-.24.24.048.432.24.384.48-.048.288-.336.48-.624.432-.384-.048-.672-.432-.624-.816.048-.48.48-.816.96-.768.576.048.96.576.912 1.152-.048.672-.672 1.152-1.344 1.104-.768-.048-1.296-.768-1.248-1.536.048-.864.864-1.488 1.728-1.44.96.048 1.632.96 1.584 1.92-.048 1.056-1.056 1.824-2.112 1.776-1.152-.048-1.968-1.152-1.92-2.304.048-1.248 1.248-2.16 2.496-2.112 1.344.048 2.304 1.344 2.256 2.688-.048 1.44-1.44 2.496-2.88 2.448-1.536-.048-2.64-1.536-2.592-3.072.048-1.632 1.632-2.832 3.264-2.784 1.728.048 2.976 1.728 2.928 3.456-.048 1.824-1.824 3.168-3.648 3.12-1.92-.048-3.312-1.92-3.264-3.84.048-2.016 2.016-3.504 4.032-3.456 2.112.048 3.648 2.112 3.6 4.224-.048 2.208-2.208 3.84-4.416 3.792-2.304-.048-3.984-2.304-3.936-4.608.048-2.4 2.4-4.176 4.8-4.128z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Telegram</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  QR Code
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="phone" className="space-y-4">
                <form onSubmit={handlePhoneLogin} className="space-y-4">
                  {step === 'phone' ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full"
                          disabled={isLoading}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-[#0088cc] hover:bg-[#0077bb]" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending Code...
                          </>
                        ) : (
                          'Send Verification Code'
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Verification Code</label>
                        <Input
                          type="text"
                          placeholder="Enter 6-digit code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          maxLength={6}
                          className="w-full text-center text-2xl tracking-widest"
                          disabled={isLoading}
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        We sent a code to {phoneNumber}
                      </p>
                      <Button type="submit" className="w-full bg-[#0088cc] hover:bg-[#0077bb]" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          'Verify & Sign In'
                        )}
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setStep('phone')}
                        className="w-full"
                        disabled={isLoading}
                      >
                        Change Phone Number
                      </Button>
                    </>
                  )}
                </form>
              </TabsContent>
              
              <TabsContent value="qr" className="space-y-4">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-4 bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center justify-center">
                    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                      <svg className="w-32 h-32" viewBox="0 0 200 200">
                        <rect x="0" y="0" width="10" height="10"/>
                        <rect x="20" y="0" width="10" height="10"/>
                        <rect x="40" y="0" width="10" height="10"/>
                        <rect x="70" y="0" width="10" height="10"/>
                        <rect x="90" y="0" width="10" height="10"/>
                        <rect x="0" y="20" width="10" height="10"/>
                        <rect x="40" y="20" width="10" height="10"/>
                        <rect x="70" y="20" width="10" height="10"/>
                        <rect x="0" y="40" width="10" height="10"/>
                        <rect x="20" y="40" width="10" height="10"/>
                        <rect x="40" y="40" width="10" height="10"/>
                        <rect x="90" y="40" width="10" height="10"/>
                        {/* More QR pattern elements */}
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Open Telegram on your phone
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Go to Settings → Devices → Link Desktop Device
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Point your phone at this screen to confirm login
                    </p>
                  </div>
                  <Button 
                    onClick={handleQRLogin} 
                    className="w-full mt-4 bg-[#0088cc] hover:bg-[#0077bb]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      'Simulate QR Login'
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;