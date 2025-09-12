import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../auth/auth_provider.dart';
import '../widgets/asha_dashboard.dart';
import '../widgets/health_officer_dashboard.dart';
import '../widgets/admin_dashboard.dart';
import '../widgets/app_header.dart';

class DashboardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, auth, _) {
        if (auth.user == null) {
          return Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        return Scaffold(
          body: Column(
            children: [
              AppHeader(),
              Expanded(
                child: _buildDashboardContent(auth.user!.role),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildDashboardContent(String role) {
    switch (role.toLowerCase()) {
      case 'asha':
        return ASHADashboard();
      case 'health officer':
        return HealthOfficerDashboard();
      case 'admin':
        return AdminDashboard();
      default:
        return Center(
          child: Text(
            'Unknown role: $role',
            style: TextStyle(fontSize: 18),
          ),
        );
    }
  }
}