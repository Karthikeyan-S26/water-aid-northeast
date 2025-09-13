import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../auth/auth_provider.dart';
import '../models/user.dart';
import '../screens/water_quality_screen.dart';

class HealthOfficerDashboard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, auth, _) {
        return SingleChildScrollView(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Health Officer Dashboard',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8),
              Text(
                'Welcome back, ${auth.user?.name}',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: Colors.grey.shade600,
                ),
              ),
              SizedBox(height: 24),
              
              // Statistics Cards
              Row(
                children: [
                  Expanded(
                    child: _StatsCard(
                      title: 'Villages',
                      value: '12',
                      icon: Icons.location_on,
                      color: Colors.blue,
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: _StatsCard(
                      title: 'ASHA Workers',
                      value: '24',
                      icon: Icons.people,
                      color: Colors.green,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: _StatsCard(
                      title: 'Active Cases',
                      value: '8',
                      icon: Icons.health_and_safety,
                      color: Colors.orange,
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: _StatsCard(
                      title: 'Critical Cases',
                      value: '2',
                      icon: Icons.warning,
                      color: Colors.red,
                    ),
                  ),
                ],
              ),
              
              SizedBox(height: 32),
              
              // Village Management
              Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.map, color: Colors.blue),
                          SizedBox(width: 8),
                          Text(
                            'Village Management',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                      ..._buildVillageList(),
                    ],
                  ),
                ),
              ),
              
              SizedBox(height: 24),
              
              // Recent Reports
              Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.assessment, color: Colors.green),
                          SizedBox(width: 8),
                          Text(
                            'Recent Reports',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                      ..._buildRecentReports(),
                    ],
                  ),
                ),
              ),
              
              SizedBox(height: 24),
              
              // Quick Actions
              Text(
                'Quick Actions',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => WaterQualityScreen(),
                          ),
                        );
                      },
                      icon: Icon(Icons.water),
                      label: Text('Water Quality Test'),
                      style: ElevatedButton.styleFrom(
                        padding: EdgeInsets.symmetric(vertical: 16),
                      ),
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {
                        // Navigate to reports view
                      },
                      icon: Icon(Icons.analytics),
                      label: Text('View Analytics'),
                      style: ElevatedButton.styleFrom(
                        padding: EdgeInsets.symmetric(vertical: 16),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
  
  List<Widget> _buildVillageList() {
    final villages = [
      VillageData(
        id: '1',
        name: 'Majuli',
        latitude: 26.95,
        longitude: 94.21,
        population: 1200,
        riskLevel: 'Medium',
        recentCases: 3,
        waterSources: ['Tube Well', 'River'],
        ashaWorker: 'Priya Sharma',
      ),
      VillageData(
        id: '2',
        name: 'Dhemaji',
        latitude: 27.48,
        longitude: 94.58,
        population: 800,
        riskLevel: 'Low',
        recentCases: 1,
        waterSources: ['Tube Well'],
        ashaWorker: 'Rita Das',
      ),
      VillageData(
        id: '3',
        name: 'Sivasagar',
        latitude: 26.98,
        longitude: 94.64,
        population: 1500,
        riskLevel: 'High',
        recentCases: 5,
        waterSources: ['Pond', 'Tube Well'],
        ashaWorker: 'Anita Borah',
      ),
    ];
    
    return villages.map((village) => Card(
      margin: EdgeInsets.symmetric(vertical: 4),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: _getRiskColor(village.riskLevel),
          child: Text(
            village.recentCases.toString(),
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
        ),
        title: Text(village.name),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('ASHA: ${village.ashaWorker}'),
            Text('Population: ${village.population} • Risk: ${village.riskLevel}'),
          ],
        ),
        trailing: Icon(Icons.chevron_right),
        onTap: () {
          // Navigate to village details
        },
      ),
    )).toList();
  }
  
  List<Widget> _buildRecentReports() {
    final reports = [
      {
        'type': 'Symptom Report',
        'location': 'Majuli',
        'time': '2 hours ago',
        'severity': 'High',
        'icon': Icons.health_and_safety,
      },
      {
        'type': 'Water Quality',
        'location': 'Dhemaji',
        'time': '4 hours ago',
        'severity': 'Normal',
        'icon': Icons.water,
      },
      {
        'type': 'Symptom Report',
        'location': 'Sivasagar',
        'time': '6 hours ago',
        'severity': 'Medium',
        'icon': Icons.health_and_safety,
      },
    ];
    
    return reports.map((report) => ListTile(
      leading: Icon(report['icon'] as IconData, color: Colors.blue),
      title: Text(report['type'] as String),
      subtitle: Text('${report['location']} • ${report['time']}'),
      trailing: Chip(
        label: Text(report['severity'] as String),
        backgroundColor: _getSeverityColor(report['severity'] as String),
      ),
    )).toList();
  }
  
  Color _getRiskColor(String risk) {
    switch (risk.toLowerCase()) {
      case 'high':
        return Colors.red;
      case 'medium':
        return Colors.orange;
      case 'low':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }
  
  Color _getSeverityColor(String severity) {
    switch (severity.toLowerCase()) {
      case 'high':
        return Colors.red.shade100;
      case 'medium':
        return Colors.orange.shade100;
      case 'normal':
        return Colors.green.shade100;
      default:
        return Colors.grey.shade100;
    }
  }
}

class _StatsCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;
  
  const _StatsCard({
    required this.title,
    required this.value,
    required this.icon,
    required this.color,
  });
  
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: color, size: 24),
                Spacer(),
                Text(
                  value,
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: color,
                  ),
                ),
              ],
            ),
            SizedBox(height: 8),
            Text(
              title,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.grey.shade600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}