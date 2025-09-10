import React, { useState } from 'react';
import { useAuth, type UserRole } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Heart, Droplets, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('asha_worker');
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password, role);
    if (!success) {
      setError('Invalid credentials. Please check your email and password.');
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
    }
  };

  const demoCredentials = [
    { role: 'asha_worker', email: 'asha@example.com', name: 'ASHA Worker (Priya)' },
    { role: 'health_officer', email: 'officer@example.com', name: 'Health Officer (Dr. Rajesh)' },
    { role: 'admin', email: 'admin@example.com', name: 'Administrator' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center md:text-left space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Health Monitor</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Smart Community Health Monitoring & Early Warning System
            </p>
            <p className="text-lg text-muted-foreground">
              Water-Borne Disease Prevention for Rural Northeast India
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-card rounded-lg shadow-sm">
              <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Water Quality</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg shadow-sm">
              <Shield className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-sm font-medium">Early Warning</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm font-medium">Community Care</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('auth.login')}</CardTitle>
            <CardDescription>
              Choose your role and enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">{t('auth.role')}</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('auth.role')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asha_worker">{t('auth.asha_worker')}</SelectItem>
                    <SelectItem value="health_officer">{t('auth.health_officer')}</SelectItem>
                    <SelectItem value="admin">{t('auth.admin')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  t('auth.login')
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Demo Credentials:</p>
              <div className="space-y-2">
                {demoCredentials.map((cred) => (
                  <Button
                    key={cred.role}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => {
                      setEmail(cred.email);
                      setPassword('demo123');
                      setRole(cred.role as UserRole);
                    }}
                  >
                    {cred.name}: {cred.email}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;