import React, { useState } from 'react';
import { User } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Droplets, 
  AlertTriangle, 
  Users, 
  Heart,
  Plus,
  Clock,
  MapPin,
  CheckCircle,
  TrendingUp,
  Calendar,
  Phone,
  BarChart3,
  Database,
  Shield,
  Activity,
  Settings,
  Download
} from 'lucide-react';
import SymptomReportForm from '@/components/forms/SymptomReportForm';
import WaterQualityForm from '@/components/forms/WaterQualityForm';
import VillageRiskMap from '@/components/maps/VillageRiskMap';
import { type VillageData } from '@/data/mockData';

interface UnifiedDashboardProps {
  user: User;
}

const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ user }) => {
  const { t } = useLanguage();
  const [activeForm, setActiveForm] = useState<'symptoms' | 'water' | null>(null);
  const [selectedVillage, setSelectedVillage] = useState<VillageData | null>(null);

  // Mock data for all features
  const stats = {
    // ASHA stats
    reportsSubmitted: 3,
    waterTestsLogged: 2,
    alertsReceived: 1,
    householdsVisited: 8,
    // Health Officer stats
    totalVillages: 45,
    activeAlerts: 8,
    criticalAlerts: 2,
    reportsToday: 23,
    ashaWorkers: 67,
    riskScore: 0.73,
    // Admin stats
    totalUsers: 156,
    healthOfficers: 12,
    totalReports: 2834,
    systemUptime: 99.8,
    dataStorage: 75,
    serverLoad: 32
  };

  const criticalAlerts = [
    {
      id: '1',
      village: 'Majuli Island',
      type: 'outbreak_risk',
      severity: 'high',
      cases: 12,
      timeAgo: '2 hours ago',
      waterSource: 'River water'
    },
    {
      id: '2',
      village: 'Dibrugarh Town',
      type: 'water_contamination',
      severity: 'critical',
      cases: 8,
      timeAgo: '45 minutes ago',
      waterSource: 'Village well #3'
    }
  ];

  const districts = [
    { name: 'Jorhat', workers: 23, alerts: 5, riskLevel: 'medium' },
    { name: 'Dibrugarh', workers: 18, alerts: 3, riskLevel: 'low' },
    { name: 'Sivasagar', workers: 16, alerts: 4, riskLevel: 'medium' },
    { name: 'Majuli', workers: 12, alerts: 2, riskLevel: 'high' },
    { name: 'Golaghat', workers: 20, alerts: 1, riskLevel: 'low' }
  ];

  const recentReports = [
    {
      id: '1',
      type: 'symptom',
      time: '2 hours ago',
      status: 'submitted',
      patient: 'Ramesh Kumar',
      symptoms: ['fever', 'diarrhea'],
      ashaWorker: 'Priya Sharma',
      village: 'Jorhat'
    },
    {
      id: '2',
      type: 'water',
      time: '4 hours ago',
      status: 'submitted',
      location: 'Village Well #1',
      quality: 'concerning',
      ashaWorker: 'Sunita Devi',
      village: 'Sivasagar'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-danger text-danger-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-success text-success-foreground';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-danger text-danger-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (activeForm === 'symptoms') {
    return (
      <div className="container mx-auto p-6">
        <SymptomReportForm onClose={() => setActiveForm(null)} />
      </div>
    );
  }

  if (activeForm === 'water') {
    return (
      <div className="container mx-auto p-6">
        <WaterQualityForm onClose={() => setActiveForm(null)} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t('dashboard.welcome')}, {user.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              {user.role === 'asha_worker' && `ASHA Worker • ${user.village}, ${user.district}`}
              {user.role === 'health_officer' && `Health Officer • ${user.district} District`}
              {user.role === 'admin' && 'System Administrator'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              All Access Dashboard
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="map">Risk Map</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                  onClick={() => setActiveForm('symptoms')}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Report Health Symptoms</span>
                </CardTitle>
                <CardDescription>
                  Log patient symptoms and health concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  New Symptom Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveForm('water')}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Droplets className="w-5 h-5 text-primary" />
                  <span>Water Quality Test</span>
                </CardTitle>
                <CardDescription>
                  Record water quality measurements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Water Test
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* All Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.reportsSubmitted}</div>
                <div className="text-sm text-muted-foreground">Reports Today</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.waterTestsLogged}</div>
                <div className="text-sm text-muted-foreground">Water Tests</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.activeAlerts}</div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.ashaWorkers}</div>
                <div className="text-sm text-muted-foreground">ASHA Workers</div>
              </CardContent>
            </Card>
          </div>

          {/* Critical Alerts */}
          <Card className="border-l-4 border-l-danger">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-danger">
                <AlertTriangle className="w-5 h-5" />
                <span>Critical Alerts ({criticalAlerts.length})</span>
              </CardTitle>
              <CardDescription>
                Immediate attention required in these locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-danger/5 border border-danger/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-danger/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-danger" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{alert.village}</h4>
                        <p className="text-sm text-muted-foreground">
                          {alert.cases} cases • {alert.waterSource} • {alert.timeAgo}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Take Action
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>All Reports</span>
              </CardTitle>
              <CardDescription>
                Complete history of health and water quality reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {report.type === 'symptom' ? (
                        <Heart className="w-5 h-5 text-danger" />
                      ) : (
                        <Droplets className="w-5 h-5 text-primary" />
                      )}
                      <div>
                        <p className="font-medium">
                          {report.type === 'symptom' ? report.patient : report.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {report.ashaWorker} • {report.village} • {report.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-success text-success-foreground">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Submitted
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <VillageRiskMap 
            selectedVillage={selectedVillage}
            onVillageSelect={setSelectedVillage}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Advanced Analytics</span>
              </CardTitle>
              <CardDescription>
                Health trends and disease prediction analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Advanced analytics with ML predictions and trend analysis.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-6">
          {/* System Health */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">System Uptime</p>
                    <p className="text-2xl font-bold text-success">{stats.systemUptime}%</p>
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
                    <p className="text-2xl font-bold text-primary">{stats.dataStorage}%</p>
                  </div>
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <Progress value={stats.dataStorage} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Server Load</p>
                    <p className="text-2xl font-bold text-warning">{stats.serverLoad}%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-warning" />
                </div>
                <Progress value={stats.serverLoad} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Districts Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Districts Management</span>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedDashboard;