import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../auth/auth_provider.dart';

class AdminDashboard extends StatelessWidget {
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
                'Admin Dashboard',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8),
              Text(
                'System Overview and Management',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: Colors.grey.shade600,
                ),
              ),
              SizedBox(height: 24),
              
              // System Statistics
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                childAspectRatio: 1.5,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _SystemStatsCard(
                    title: 'Total Users',
                    value: '156',
                    icon: Icons.people,
                    color: Colors.blue,
                    subtitle: '12 new this week',
                  ),
                  _SystemStatsCard(
                    title: 'Health Reports',
                    value: '2,340',
                    icon: Icons.health_and_safety,
                    color: Colors.green,
                    subtitle: '45 today',
                  ),
                  _SystemStatsCard(
                    title: 'Water Tests',
                    value: '890',
                    icon: Icons.water,
                    color: Colors.cyan,
                    subtitle: '12 pending',
                  ),
                  _SystemStatsCard(
                    title: 'Active Villages',
                    value: '48',
                    icon: Icons.location_on,
                    color: Colors.orange,
                    subtitle: '3 regions',
                  ),
                ],
              ),
              
              SizedBox(height: 32),
              
              // User Management
              Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.admin_panel_settings, color: Colors.purple),
                          SizedBox(width: 8),
                          Text(
                            'User Management',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Spacer(),
                          ElevatedButton.icon(
                            onPressed: () {
                              _showAddUserDialog(context);
                            },
                            icon: Icon(Icons.add),
                            label: Text('Add User'),
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                      ..._buildUserList(),
                    ],
                  ),
                ),
              ),
              
              SizedBox(height: 24),
              
              // System Health
              Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.monitor_heart, color: Colors.green),
                          SizedBox(width: 8),
                          Text(
                            'System Health',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: _HealthIndicator(
                              label: 'Server Status',
                              status: 'Online',
                              color: Colors.green,
                            ),
                          ),
                          Expanded(
                            child: _HealthIndicator(
                              label: 'Database',
                              status: 'Healthy',
                              color: Colors.green,
                            ),
                          ),
                          Expanded(
                            child: _HealthIndicator(
                              label: 'API Response',
                              status: '120ms',
                              color: Colors.orange,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              
              SizedBox(height: 24),
              
              // Recent Activity
              Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.history, color: Colors.blue),
                          SizedBox(width: 8),
                          Text(
                            'Recent Activity',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                      ..._buildActivityList(),
                    ],
                  ),
                ),
              ),
              
              SizedBox(height: 24),
              
              // Quick Actions
              Text(
                'System Management',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                childAspectRatio: 2.5,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _ActionButton(
                    label: 'Export Data',
                    icon: Icons.download,
                    color: Colors.blue,
                    onTap: () {
                      // Handle export
                    },
                  ),
                  _ActionButton(
                    label: 'Generate Report',
                    icon: Icons.assessment,
                    color: Colors.green,
                    onTap: () {
                      // Handle report generation
                    },
                  ),
                  _ActionButton(
                    label: 'System Backup',
                    icon: Icons.backup,
                    color: Colors.orange,
                    onTap: () {
                      // Handle backup
                    },
                  ),
                  _ActionButton(
                    label: 'Settings',
                    icon: Icons.settings,
                    color: Colors.purple,
                    onTap: () {
                      // Handle settings
                    },
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
  
  List<Widget> _buildUserList() {
    final users = [
      {
        'name': 'Priya Sharma',
        'role': 'ASHA Worker',
        'location': 'Majuli',
        'status': 'Active',
        'lastLogin': '2 hours ago',
      },
      {
        'name': 'Dr. Rajesh Kumar',
        'role': 'Health Officer',
        'location': 'Guwahati',
        'status': 'Active',
        'lastLogin': '1 hour ago',
      },
      {
        'name': 'Rita Das',
        'role': 'ASHA Worker',
        'location': 'Dhemaji',
        'status': 'Inactive',
        'lastLogin': '2 days ago',
      },
    ];
    
    return users.map((user) => ListTile(
      leading: CircleAvatar(
        backgroundColor: _getRoleColor(user['role'] as String),
        child: Text(
          (user['name'] as String).substring(0, 1),
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
      title: Text(user['name'] as String),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('${user['role']} • ${user['location']}'),
          Text('Last login: ${user['lastLogin']}'),
        ],
      ),
      trailing: Chip(
        label: Text(user['status'] as String),
        backgroundColor: user['status'] == 'Active' 
            ? Colors.green.shade100 
            : Colors.grey.shade100,
      ),
    )).toList();
  }
  
  List<Widget> _buildActivityList() {
    final activities = [
      {
        'action': 'New user registered',
        'user': 'Anita Borah (ASHA)',
        'time': '10 minutes ago',
        'icon': Icons.person_add,
      },
      {
        'action': 'Critical health report',
        'user': 'Majuli Village',
        'time': '1 hour ago',
        'icon': Icons.warning,
      },
      {
        'action': 'Water quality test completed',
        'user': 'Dhemaji',
        'time': '3 hours ago',
        'icon': Icons.water,
      },
      {
        'action': 'System backup completed',
        'user': 'System',
        'time': '6 hours ago',
        'icon': Icons.backup,
      },
    ];
    
    return activities.map((activity) => ListTile(
      leading: Icon(activity['icon'] as IconData, color: Colors.blue),
      title: Text(activity['action'] as String),
      subtitle: Text('${activity['user']} • ${activity['time']}'),
    )).toList();
  }
  
  Color _getRoleColor(String role) {
    switch (role.toLowerCase()) {
      case 'asha worker':
        return Colors.blue;
      case 'health officer':
        return Colors.green;
      case 'admin':
        return Colors.purple;
      default:
        return Colors.grey;
    }
  }
  
  void _showAddUserDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add New User'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Name',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            TextField(
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            DropdownButtonFormField<String>(
              decoration: InputDecoration(
                labelText: 'Role',
                border: OutlineInputBorder(),
              ),
              items: ['ASHA Worker', 'Health Officer', 'Admin']
                  .map((role) => DropdownMenuItem(
                        value: role,
                        child: Text(role),
                      ))
                  .toList(),
              onChanged: (value) {},
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('User added successfully')),
              );
            },
            child: Text('Add User'),
          ),
        ],
      ),
    );
  }
}

class _SystemStatsCard extends StatelessWidget {
  final String title;
  final String value;
  final String subtitle;
  final IconData icon;
  final Color color;
  
  const _SystemStatsCard({
    required this.title,
    required this.value,
    required this.subtitle,
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
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: color,
                  ),
                ),
              ],
            ),
            SizedBox(height: 8),
            Text(
              title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            Text(
              subtitle,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.grey.shade600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _HealthIndicator extends StatelessWidget {
  final String label;
  final String status;
  final Color color;
  
  const _HealthIndicator({
    required this.label,
    required this.status,
    required this.color,
  });
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
          ),
        ),
        SizedBox(height: 8),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall,
          textAlign: TextAlign.center,
        ),
        Text(
          status,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: color,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}

class _ActionButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;
  
  const _ActionButton({
    required this.label,
    required this.icon,
    required this.color,
    required this.onTap,
  });
  
  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Row(
            children: [
              Icon(icon, color: color),
              SizedBox(width: 12),
              Expanded(
                child: Text(
                  label,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}