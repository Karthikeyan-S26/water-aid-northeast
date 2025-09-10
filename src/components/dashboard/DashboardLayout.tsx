import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import ASHADashboard from '@/components/dashboard/ASHADashboard';
import HealthOfficerDashboard from '@/components/dashboard/HealthOfficerDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'asha_worker':
        return <ASHADashboard user={user} />;
      case 'health_officer':
        return <HealthOfficerDashboard user={user} />;
      case 'admin':
        return <AdminDashboard user={user} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {renderDashboard()}
      </main>
    </div>
  );
};

export default DashboardLayout;