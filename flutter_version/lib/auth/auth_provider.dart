import 'package:flutter/foundation.dart';
import '../models/user.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  bool _isLoading = false;

  User? get user => _user;
  bool get isAuthenticated => _user != null;
  bool get isLoading => _isLoading;

  // Demo users for testing
  final List<Map<String, dynamic>> _demoUsers = [
    {
      'email': 'asha@demo.com',
      'password': 'demo123',
      'user': User(
        id: '1',
        name: 'Priya Sharma',
        email: 'asha@demo.com',
        role: 'ASHA',
        village: 'Majuli',
        district: 'Jorhat',
      ),
    },
    {
      'email': 'officer@demo.com',
      'password': 'demo123',
      'user': User(
        id: '2',
        name: 'Dr. Rajesh Kumar',
        email: 'officer@demo.com',
        role: 'Health Officer',
        district: 'Guwahati',
      ),
    },
    {
      'email': 'admin@demo.com',
      'password': 'demo123',
      'user': User(
        id: '3',
        name: 'System Admin',
        email: 'admin@demo.com',
        role: 'Admin',
      ),
    },
  ];

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    try {
      // Simulate API call delay
      await Future.delayed(Duration(seconds: 1));

      // Find matching demo user
      final demoUser = _demoUsers.firstWhere(
        (user) => user['email'] == email && user['password'] == password,
        orElse: () => {},
      );

      if (demoUser.isNotEmpty) {
        _user = demoUser['user'];
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  void logout() {
    _user = null;
    notifyListeners();
  }

  String getRoleColor(String role) {
    switch (role.toLowerCase()) {
      case 'asha':
        return 'blue';
      case 'health officer':
        return 'green';
      case 'admin':
        return 'purple';
      default:
        return 'gray';
    }
  }
}