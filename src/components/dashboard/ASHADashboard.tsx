import React, { useState } from 'react';
import { User } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  CheckCircle
} from 'lucide-react';
import SymptomReportForm from '@/components/forms/SymptomReportForm';
import WaterQualityForm from '@/components/forms/WaterQualityForm';

interface ASHADashboardProps {
  user: User;
}

const ASHADashboard: React.FC<ASHADashboardProps> = ({ user }) => {
  const { t } = useLanguage();
  const [activeForm, setActiveForm] = useState<'symptoms' | 'water' | null>(null);

  // Mock data for ASHA worker
  const todayStats = {
    reportsSubmitted: 3,
    waterTestsLogged: 2,
    alertsReceived: 1,
    householdsVisited: 8
  };

  const recentReports = [
    {
      id: '1',
      type: 'symptom',
      time: '2 hours ago',
      status: 'submitted',
      patient: 'Ramesh Kumar',
      symptoms: ['fever', 'diarrhea']
    },
    {
      id: '2',
      type: 'water',
      time: '4 hours ago',
      status: 'submitted',
      location: 'Village Well #1',
      quality: 'concerning'
    }
  ];

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
              ASHA Worker • {user.village}, {user.district}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{user.village}</span>
          </div>
        </div>
      </div>

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

      {/* Today's Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{todayStats.reportsSubmitted}</div>
            <div className="text-sm text-muted-foreground">Reports Today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{todayStats.waterTestsLogged}</div>
            <div className="text-sm text-muted-foreground">Water Tests</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">{todayStats.alertsReceived}</div>
            <div className="text-sm text-muted-foreground">Active Alerts</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{todayStats.householdsVisited}</div>
            <div className="text-sm text-muted-foreground">Households</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Recent Reports</span>
          </CardTitle>
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
                    <p className="text-sm text-muted-foreground">{report.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Submitted
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Health Guidelines</CardTitle>
          <CardDescription>Important reminders for community health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <p className="text-sm">Always test water sources before consumption</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <p className="text-sm">Report any symptoms of diarrhea, fever, or vomiting immediately</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <p className="text-sm">Encourage hand washing with soap and clean water</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <p className="text-sm">Monitor vulnerable populations: children under 5 and elderly</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ASHADashboard;