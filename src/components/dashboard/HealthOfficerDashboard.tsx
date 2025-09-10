import React, { useState } from 'react';
import { User } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  AlertTriangle, 
  Users, 
  Droplets,
  TrendingUp,
  Calendar,
  Phone,
  FileText
} from 'lucide-react';
import VillageRiskMap from '@/components/maps/VillageRiskMap';
import { type VillageData } from '@/data/mockData';

interface HealthOfficerDashboardProps {
  user: User;
}

const HealthOfficerDashboard: React.FC<HealthOfficerDashboardProps> = ({ user }) => {
  const { t } = useLanguage();
  const [selectedVillage, setSelectedVillage] = useState<VillageData | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'map' | 'analytics'>('overview');

  // Mock data for Health Officer
  const districtStats = {
    totalVillages: 45,
    activeAlerts: 8,
    criticalAlerts: 2,
    reportsToday: 23,
    ashaWorkers: 67,
    riskScore: 0.73
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

  const recentReports = [
    {
      id: '1',
      ashaWorker: 'Priya Sharma',
      village: 'Jorhat',
      type: 'symptom',
      patients: 3,
      time: '1 hour ago'
    },
    {
      id: '2',
      ashaWorker: 'Sunita Devi',
      village: 'Sivasagar',
      type: 'water',
      tests: 2,
      time: '3 hours ago'
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
              Health Officer • {user.district} District
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              District Overview
            </Badge>
          </div>
        </div>
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
                  <Button size="sm" variant="danger">
                    <Phone className="w-4 h-4 mr-1" />
                    Call ASHA
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* District Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{districtStats.totalVillages}</div>
            <div className="text-sm text-muted-foreground">Villages</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">{districtStats.activeAlerts}</div>
            <div className="text-sm text-muted-foreground">Active Alerts</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{districtStats.ashaWorkers}</div>
            <div className="text-sm text-muted-foreground">ASHA Workers</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{districtStats.reportsToday}</div>
            <div className="text-sm text-muted-foreground">Reports Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Recent Reports</span>
          </CardTitle>
          <CardDescription>
            Latest submissions from ASHA workers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {report.type === 'symptom' ? (
                    <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-danger" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{report.ashaWorker}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.village} • {report.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {report.type === 'symptom' ? `${report.patients} patients` : `${report.tests} tests`}
                  </p>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="flex space-x-2 mb-6">
        <Button 
          variant={activeView === 'overview' ? 'default' : 'outline'}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </Button>
        <Button 
          variant={activeView === 'map' ? 'default' : 'outline'}
          onClick={() => setActiveView('map')}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Risk Map
        </Button>
        <Button 
          variant={activeView === 'analytics' ? 'default' : 'outline'}
          onClick={() => setActiveView('analytics')}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Analytics
        </Button>
      </div>

      {/* Conditional Content */}
      {activeView === 'map' && (
        <VillageRiskMap 
          selectedVillage={selectedVillage}
          onVillageSelect={setSelectedVillage}
        />
      )}

      {activeView === 'overview' && (
        <>
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveView('map')}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Village Risk Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  View Risk Map
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveView('analytics')}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <span>Analytics Dashboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>ASHA Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  Manage Workers
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeView === 'analytics' && (
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>
              Health trends and disease prediction analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
              <p className="text-muted-foreground">
                Advanced analytics dashboard with ML predictions and trend analysis will be available here.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthOfficerDashboard;