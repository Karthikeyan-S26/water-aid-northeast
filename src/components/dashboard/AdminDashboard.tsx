import React from 'react';
import { User } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  MapPin,
  Database,
  Shield,
  Activity,
  TrendingUp,
  Settings,
  Download
} from 'lucide-react';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const { t } = useLanguage();

  // Mock data for Admin
  const systemStats = {
    totalUsers: 156,
    ashaWorkers: 89,
    healthOfficers: 12,
    totalReports: 2834,
    activeAlerts: 15,
    systemUptime: 99.8,
    dataStorage: 75,
    serverLoad: 32
  };

  const districts = [
    { name: 'Jorhat', workers: 23, alerts: 5, riskLevel: 'medium' },
    { name: 'Dibrugarh', workers: 18, alerts: 3, riskLevel: 'low' },
    { name: 'Sivasagar', workers: 16, alerts: 4, riskLevel: 'medium' },
    { name: 'Majuli', workers: 12, alerts: 2, riskLevel: 'high' },
    { name: 'Golaghat', workers: 20, alerts: 1, riskLevel: 'low' }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'alert',
      message: 'Critical water contamination alert in Majuli',
      time: '15 minutes ago',
      severity: 'high'
    },
    {
      id: '2',
      type: 'user',
      message: 'New ASHA worker registered in Jorhat district',
      time: '1 hour ago',
      severity: 'info'
    },
    {
      id: '3',
      type: 'system',
      message: 'Daily data backup completed successfully',
      time: '2 hours ago',
      severity: 'success'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-danger text-danger-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4 text-danger" />;
      case 'user': return <Users className="w-4 h-4 text-primary" />;
      case 'system': return <Activity className="w-4 h-4 text-success" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              System Administration
            </h1>
            <p className="text-muted-foreground mt-1">
              {user.name} • System Administrator
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              <Shield className="w-3 h-3 mr-1" />
              Admin Access
            </Badge>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold text-success">{systemStats.systemUptime}%</p>
              </div>
              <Activity className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Storage</p>
                <p className="text-2xl font-bold text-primary">{systemStats.dataStorage}%</p>
              </div>
              <Database className="w-8 h-8 text-primary" />
            </div>
            <Progress value={systemStats.dataStorage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Server Load</p>
                <p className="text-2xl font-bold text-warning">{systemStats.serverLoad}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-warning" />
            </div>
            <Progress value={systemStats.serverLoad} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-danger">{systemStats.activeAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.ashaWorkers}</div>
            <div className="text-sm text-muted-foreground">ASHA Workers</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.healthOfficers}</div>
            <div className="text-sm text-muted-foreground">Health Officers</div>
          </CardContent>
        </Card>
      </div>

      {/* Districts Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Districts Overview</span>
          </CardTitle>
          <CardDescription>
            Performance and risk status across all districts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {districts.map((district) => (
              <div key={district.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{district.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {district.workers} workers • {district.alerts} alerts
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getRiskColor(district.riskLevel)}>
                    {district.riskLevel.toUpperCase()}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent System Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-2">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <Button variant="outline" className="w-full">
              Manage Users
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Settings className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <Button variant="outline" className="w-full">
              System Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Download className="w-8 h-8 text-success mx-auto mb-2" />
            <Button variant="outline" className="w-full">
              Export Data
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
            <Button variant="outline" className="w-full">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;