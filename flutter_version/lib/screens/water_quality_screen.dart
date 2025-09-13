import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../auth/auth_provider.dart';
import '../models/user.dart';

class WaterQualityScreen extends StatefulWidget {
  @override
  _WaterQualityScreenState createState() => _WaterQualityScreenState();
}

class _WaterQualityScreenState extends State<WaterQualityScreen> {
  final _formKey = GlobalKey<FormState>();
  final _locationController = TextEditingController();
  final _phController = TextEditingController();
  final _turbidityController = TextEditingController();
  final _tdsController = TextEditingController();
  final _temperatureController = TextEditingController();
  final _chlorineController = TextEditingController();
  final _notesController = TextEditingController();
  
  String _sourceType = 'Tube Well';
  String _eColiPresence = 'Absent';
  DateTime _testDate = DateTime.now();
  String _gpsCoordinates = '';
  bool _isSubmitting = false;

  final List<String> _sourceTypes = [
    'Tube Well',
    'Hand Pump',
    'River',
    'Pond',
    'Well',
    'Other',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Water Quality Test'),
        backgroundColor: Colors.blue.shade600,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Card(
                color: Colors.blue.shade50,
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Icon(Icons.water, color: Colors.blue.shade600, size: 32),
                      SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Water Quality Assessment',
                              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: Colors.blue.shade700,
                              ),
                            ),
                            Text(
                              'Test and report water quality parameters',
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                color: Colors.blue.shade600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              
              SizedBox(height: 24),
              
              // Location Information
              _SectionCard(
                title: 'Location Information',
                icon: Icons.location_on,
                children: [
                  TextFormField(
                    controller: _locationController,
                    decoration: InputDecoration(
                      labelText: 'Test Location *',
                      hintText: 'Enter village/area name',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.place),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter test location';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 16),
                  DropdownButtonFormField<String>(
                    value: _sourceType,
                    decoration: InputDecoration(
                      labelText: 'Water Source Type *',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.water_drop),
                    ),
                    items: _sourceTypes.map((type) => DropdownMenuItem(
                      value: type,
                      child: Text(type),
                    )).toList(),
                    onChanged: (value) {
                      setState(() {
                        _sourceType = value!;
                      });
                    },
                  ),
                  SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: _getCurrentLocation,
                          icon: Icon(Icons.my_location),
                          label: Text('Get GPS Location'),
                        ),
                      ),
                      if (_gpsCoordinates.isNotEmpty) ...[
                        SizedBox(width: 16),
                        Icon(Icons.check_circle, color: Colors.green),
                      ],
                    ],
                  ),
                  if (_gpsCoordinates.isNotEmpty)
                    Padding(
                      padding: EdgeInsets.only(top: 8),
                      child: Text(
                        'GPS: $_gpsCoordinates',
                        style: TextStyle(color: Colors.grey.shade600),
                      ),
                    ),
                ],
              ),
              
              SizedBox(height: 16),
              
              // Water Quality Parameters
              _SectionCard(
                title: 'Water Quality Parameters',
                icon: Icons.science,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          controller: _phController,
                          decoration: InputDecoration(
                            labelText: 'pH Level *',
                            hintText: '6.5-8.5',
                            border: OutlineInputBorder(),
                            suffixText: 'pH',
                          ),
                          keyboardType: TextInputType.numberWithOptions(decimal: true),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Required';
                            }
                            final ph = double.tryParse(value);
                            if (ph == null || ph < 0 || ph > 14) {
                              return 'Invalid pH';
                            }
                            return null;
                          },
                        ),
                      ),
                      SizedBox(width: 16),
                      Expanded(
                        child: TextFormField(
                          controller: _turbidityController,
                          decoration: InputDecoration(
                            labelText: 'Turbidity *',
                            hintText: '< 5 NTU',
                            border: OutlineInputBorder(),
                            suffixText: 'NTU',
                          ),
                          keyboardType: TextInputType.numberWithOptions(decimal: true),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Required';
                            }
                            final turbidity = double.tryParse(value);
                            if (turbidity == null || turbidity < 0) {
                              return 'Invalid';
                            }
                            return null;
                          },
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          controller: _tdsController,
                          decoration: InputDecoration(
                            labelText: 'TDS *',
                            hintText: '< 500 ppm',
                            border: OutlineInputBorder(),
                            suffixText: 'ppm',
                          ),
                          keyboardType: TextInputType.numberWithOptions(decimal: true),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Required';
                            }
                            final tds = double.tryParse(value);
                            if (tds == null || tds < 0) {
                              return 'Invalid';
                            }
                            return null;
                          },
                        ),
                      ),
                      SizedBox(width: 16),
                      Expanded(
                        child: TextFormField(
                          controller: _temperatureController,
                          decoration: InputDecoration(
                            labelText: 'Temperature',
                            hintText: '20-30°C',
                            border: OutlineInputBorder(),
                            suffixText: '°C',
                          ),
                          keyboardType: TextInputType.numberWithOptions(decimal: true),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          controller: _chlorineController,
                          decoration: InputDecoration(
                            labelText: 'Free Chlorine',
                            hintText: '0.2-0.5 ppm',
                            border: OutlineInputBorder(),
                            suffixText: 'ppm',
                          ),
                          keyboardType: TextInputType.numberWithOptions(decimal: true),
                        ),
                      ),
                      SizedBox(width: 16),
                      Expanded(
                        child: DropdownButtonFormField<String>(
                          value: _eColiPresence,
                          decoration: InputDecoration(
                            labelText: 'E. Coli *',
                            border: OutlineInputBorder(),
                          ),
                          items: ['Absent', 'Present'].map((status) => DropdownMenuItem(
                            value: status,
                            child: Text(status),
                          )).toList(),
                          onChanged: (value) {
                            setState(() {
                              _eColiPresence = value!;
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              
              SizedBox(height: 16),
              
              // Test Information
              _SectionCard(
                title: 'Test Information',
                icon: Icons.info,
                children: [
                  ListTile(
                    leading: Icon(Icons.calendar_today),
                    title: Text('Test Date'),
                    subtitle: Text('${_testDate.day}/${_testDate.month}/${_testDate.year}'),
                    trailing: TextButton(
                      onPressed: _selectDate,
                      child: Text('Change'),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _notesController,
                    decoration: InputDecoration(
                      labelText: 'Additional Notes',
                      hintText: 'Any observations or concerns...',
                      border: OutlineInputBorder(),
                      alignLabelWithHint: true,
                    ),
                    maxLines: 3,
                  ),
                ],
              ),
              
              SizedBox(height: 24),
              
              // Water Quality Assessment
              _buildQualityAssessment(),
              
              SizedBox(height: 32),
              
              // Submit Button
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  onPressed: _isSubmitting ? null : _submitReport,
                  icon: _isSubmitting
                      ? SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : Icon(Icons.send),
                  label: Text(_isSubmitting ? 'Submitting...' : 'Submit Water Quality Report'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue.shade600,
                    foregroundColor: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
  
  Widget _buildQualityAssessment() {
    final ph = double.tryParse(_phController.text);
    final turbidity = double.tryParse(_turbidityController.text);
    final tds = double.tryParse(_tdsController.text);
    
    if (ph == null || turbidity == null || tds == null) {
      return SizedBox.shrink();
    }
    
    final qualityScore = _calculateWaterQuality(ph, turbidity, tds);
    final qualityStatus = _getQualityStatus(qualityScore);
    
    return Card(
      color: qualityStatus['color'].withOpacity(0.1),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              children: [
                Icon(
                  qualityStatus['icon'],
                  color: qualityStatus['color'],
                  size: 32,
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Water Quality Assessment',
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        qualityStatus['status'],
                        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          color: qualityStatus['color'],
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                Text(
                  '${qualityScore}/100',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    color: qualityStatus['color'],
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            LinearProgressIndicator(
              value: qualityScore / 100,
              backgroundColor: Colors.grey.shade300,
              valueColor: AlwaysStoppedAnimation<Color>(qualityStatus['color']),
            ),
            SizedBox(height: 8),
            Text(
              qualityStatus['recommendation'],
              style: Theme.of(context).textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
  
  int _calculateWaterQuality(double ph, double turbidity, double tds) {
    int score = 100;
    
    // pH scoring (ideal range: 6.5-8.5)
    if (ph < 6.5 || ph > 8.5) {
      score -= 30;
    } else if (ph < 7.0 || ph > 8.0) {
      score -= 10;
    }
    
    // Turbidity scoring (ideal: < 1 NTU, acceptable: < 5 NTU)
    if (turbidity > 5) {
      score -= 40;
    } else if (turbidity > 1) {
      score -= 15;
    }
    
    // TDS scoring (ideal: < 300 ppm, acceptable: < 500 ppm)
    if (tds > 500) {
      score -= 30;
    } else if (tds > 300) {
      score -= 10;
    }
    
    // E. Coli presence
    if (_eColiPresence == 'Present') {
      score -= 50;
    }
    
    return score.clamp(0, 100);
  }
  
  Map<String, dynamic> _getQualityStatus(int score) {
    if (score >= 80) {
      return {
        'status': 'Excellent',
        'color': Colors.green,
        'icon': Icons.check_circle,
        'recommendation': 'Water quality is excellent and safe for consumption.',
      };
    } else if (score >= 60) {
      return {
        'status': 'Good',
        'color': Colors.lightGreen,
        'icon': Icons.thumb_up,
        'recommendation': 'Water quality is good with minor concerns.',
      };
    } else if (score >= 40) {
      return {
        'status': 'Fair',
        'color': Colors.orange,
        'icon': Icons.warning,
        'recommendation': 'Water quality needs attention. Consider treatment.',
      };
    } else {
      return {
        'status': 'Poor',
        'color': Colors.red,
        'icon': Icons.error,
        'recommendation': 'Water quality is poor. Immediate action required.',
      };
    }
  }
  
  void _getCurrentLocation() {
    // Simulate getting GPS coordinates
    setState(() {
      _gpsCoordinates = '26.9124, 94.2120'; // Sample coordinates for Guwahati
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('GPS location captured successfully')),
    );
  }
  
  void _selectDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _testDate,
      firstDate: DateTime.now().subtract(Duration(days: 30)),
      lastDate: DateTime.now(),
    );
    if (date != null) {
      setState(() {
        _testDate = date;
      });
    }
  }
  
  void _submitReport() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    
    setState(() {
      _isSubmitting = true;
    });
    
    try {
      // Simulate API call
      await Future.delayed(Duration(seconds: 2));
      
      final report = WaterQualityReport(
        location: _locationController.text,
        sourceType: _sourceType,
        ph: double.parse(_phController.text),
        turbidity: double.parse(_turbidityController.text),
        tds: double.parse(_tdsController.text),
        temperature: double.tryParse(_temperatureController.text) ?? 0,
        chlorine: double.tryParse(_chlorineController.text) ?? 0,
        eColiPresence: _eColiPresence,
        testDate: _testDate,
        gpsCoordinates: _gpsCoordinates,
        notes: _notesController.text,
      );
      
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Water quality report submitted successfully'),
          backgroundColor: Colors.green,
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to submit report. Please try again.'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() {
        _isSubmitting = false;
      });
    }
  }
  
  @override
  void dispose() {
    _locationController.dispose();
    _phController.dispose();
    _turbidityController.dispose();
    _tdsController.dispose();
    _temperatureController.dispose();
    _chlorineController.dispose();
    _notesController.dispose();
    super.dispose();
  }
}

class _SectionCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final List<Widget> children;
  
  const _SectionCard({
    required this.title,
    required this.icon,
    required this.children,
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
                Icon(icon, color: Colors.blue.shade600),
                SizedBox(width: 8),
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            ...children,
          ],
        ),
      ),
    );
  }
}