class User {
  final String id;
  final String name;
  final String email;
  final String role;
  final String? village;
  final String? district;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.village,
    this.district,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      role: json['role'],
      village: json['village'],
      district: json['district'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'role': role,
      'village': village,
      'district': district,
    };
  }
}

class VillageData {
  final String id;
  final String name;
  final double latitude;
  final double longitude;
  final int population;
  final String riskLevel;
  final int recentCases;
  final List<String> waterSources;
  final String ashaWorker;

  VillageData({
    required this.id,
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.population,
    required this.riskLevel,
    required this.recentCases,
    required this.waterSources,
    required this.ashaWorker,
  });
}

class SymptomReport {
  final String patientName;
  final int age;
  final String gender;
  final String address;
  final List<String> symptoms;
  final String severity;
  final DateTime onsetDate;
  final double? temperature;
  final String waterSource;
  final String notes;

  SymptomReport({
    required this.patientName,
    required this.age,
    required this.gender,
    required this.address,
    required this.symptoms,
    required this.severity,
    required this.onsetDate,
    this.temperature,
    required this.waterSource,
    required this.notes,
  });
}

class WaterQualityReport {
  final String location;
  final String sourceType;
  final double ph;
  final double turbidity;
  final double tds;
  final double temperature;
  final double chlorine;
  final String eColiPresence;
  final DateTime testDate;
  final String gpsCoordinates;
  final String notes;

  WaterQualityReport({
    required this.location,
    required this.sourceType,
    required this.ph,
    required this.turbidity,
    required this.tds,
    required this.temperature,
    required this.chlorine,
    required this.eColiPresence,
    required this.testDate,
    required this.gpsCoordinates,
    required this.notes,
  });
}