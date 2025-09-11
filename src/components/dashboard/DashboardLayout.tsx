import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import UnifiedDashboard from '@/components/dashboard/UnifiedDashboard';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const renderDashboard = () => {
    return <UnifiedDashboard user={user} />;
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