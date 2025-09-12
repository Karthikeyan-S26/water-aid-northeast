# Health Monitor Northeast - Flutter Version

A Flutter mobile application for health monitoring and water quality reporting in Northeast India.

## Features

- **Multi-role Authentication**: Support for ASHA workers, Health Officers, and Administrators
- **Symptom Reporting**: Comprehensive health symptom tracking with critical case detection
- **Water Quality Testing**: Water quality parameter monitoring and reporting
- **Dashboard Views**: Role-specific dashboards with relevant metrics and actions
- **Mobile-First Design**: Optimized for mobile devices with responsive layouts
- **Real-time Notifications**: Important health alerts and updates

## Getting Started

### Prerequisites

- Flutter SDK (3.10.0 or higher)
- Dart SDK (3.0.0 or higher)
- Android Studio / VS Code with Flutter extensions
- Android device or emulator for testing

### Installation

1. Clone this repository or copy the flutter_version folder
2. Navigate to the project directory:
   ```bash
   cd flutter_version
   ```

3. Install dependencies:
   ```bash
   flutter pub get
   ```

4. Run the application:
   ```bash
   flutter run
   ```

### Demo Credentials

The app includes demo users for testing:

**ASHA Worker**
- Email: asha@demo.com
- Password: demo123

**Health Officer**
- Email: officer@demo.com
- Password: demo123

**Admin**
- Email: admin@demo.com
- Password: demo123

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/                   # Data models
│   └── user.dart
├── auth/                     # Authentication logic
│   └── auth_provider.dart
├── screens/                  # Main application screens
│   ├── login_screen.dart
│   ├── dashboard_screen.dart
│   ├── symptom_report_screen.dart
│   └── water_quality_screen.dart
├── widgets/                  # Reusable UI components
│   ├── app_header.dart
│   ├── asha_dashboard.dart
│   ├── health_officer_dashboard.dart
│   └── admin_dashboard.dart
└── utils/                    # Utilities and themes
    └── app_theme.dart
```

## Key Components

### Authentication
- Provider-based state management for user authentication
- Role-based access control
- Secure login with demo credentials

### Dashboard System
- **ASHA Dashboard**: Quick actions for symptom and water quality reporting
- **Health Officer Dashboard**: Village management and health overview
- **Admin Dashboard**: System-wide statistics and user management

### Reporting System
- **Symptom Reports**: Comprehensive patient health data collection
- **Water Quality Reports**: Detailed water testing parameter tracking
- Critical case detection and prioritization

### UI/UX Features
- Material Design 3 components
- Dark/Light theme support
- Responsive layouts for different screen sizes
- Intuitive navigation and user flows

## Dependencies

Key packages used in this project:

- `provider: ^6.1.1` - State management
- `flutter_map: ^6.1.0` - Interactive maps
- `geolocator: ^10.1.0` - Location services
- `image_picker: ^1.0.7` - Camera/gallery access
- `shared_preferences: ^2.2.2` - Local storage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.