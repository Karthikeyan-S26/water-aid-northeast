import 'package:flutter/material.dart';
import '../models/user.dart';

class SymptomReportScreen extends StatefulWidget {
  @override
  _SymptomReportScreenState createState() => _SymptomReportScreenState();
}

class _SymptomReportScreenState extends State<SymptomReportScreen> {
  final _formKey = GlobalKey<FormState>();
  final _patientNameController = TextEditingController();
  final _ageController = TextEditingController();
  final _addressController = TextEditingController();
  final _temperatureController = TextEditingController();
  final _notesController = TextEditingController();
  
  String _selectedGender = 'Male';
  String _selectedSeverity = 'Mild';
  String _selectedWaterSource = 'Well';
  DateTime _onsetDate = DateTime.now();
  List<String> _selectedSymptoms = [];
  bool _isSubmitting = false;

  final List<Map<String, dynamic>> _symptoms = [
    {'id': 'fever', 'label': 'Fever', 'critical': true},
    {'id': 'diarrhea', 'label': 'Diarrhea', 'critical': true},
    {'id': 'vomiting', 'label': 'Vomiting', 'critical': true},
    {'id': 'dehydration', 'label': 'Dehydration', 'critical': true},
    {'id': 'headache', 'label': 'Headache', 'critical': false},
    {'id': 'fatigue', 'label': 'Fatigue', 'critical': false},
    {'id': 'abdominal_pain', 'label': 'Abdominal Pain', 'critical': false},
    {'id': 'nausea', 'label': 'Nausea', 'critical': false},
    {'id': 'loss_appetite', 'label': 'Loss of Appetite', 'critical': false},
    {'id': 'muscle_aches', 'label': 'Muscle Aches', 'critical': false},
  ];

  bool get _hasCriticalSymptoms {
    return _selectedSymptoms.any((symptomId) {
      final symptom = _symptoms.firstWhere((s) => s['id'] == symptomId);
      return symptom['critical'] == true;
    });
  }

  Future<void> _submitReport() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isSubmitting = true;
    });

    try {
      // Simulate API call
      await Future.delayed(Duration(seconds: 2));

      // Show success message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            _hasCriticalSymptoms
                ? 'Critical symptoms reported! Medical team will be notified immediately.'
                : 'Symptom report submitted successfully.',
          ),
          backgroundColor: _hasCriticalSymptoms ? Colors.red : Colors.green,
        ),
      );

      Navigator.pop(context);
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
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Symptom Report'),
        backgroundColor: Theme.of(context).primaryColor,
        foregroundColor: Colors.white,
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (_hasCriticalSymptoms)
                Container(
                  padding: EdgeInsets.all(12),
                  margin: EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    color: Colors.red.shade50,
                    border: Border.all(color: Colors.red.shade200),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.warning, color: Colors.red),
                      SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          'Critical symptoms detected! This case will be prioritized for immediate medical attention.',
                          style: TextStyle(color: Colors.red.shade700),
                        ),
                      ),
                    ],
                  ),
                ),

              // Patient Information
              Text(
                'Patient Information',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              
              TextFormField(
                controller: _patientNameController,
                decoration: InputDecoration(
                  labelText: 'Patient Name *',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter patient name';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _ageController,
                      decoration: InputDecoration(
                        labelText: 'Age *',
                        border: OutlineInputBorder(),
                      ),
                      keyboardType: TextInputType.number,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter age';
                        }
                        return null;
                      },
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      value: _selectedGender,
                      decoration: InputDecoration(
                        labelText: 'Gender *',
                        border: OutlineInputBorder(),
                      ),
                      items: ['Male', 'Female', 'Other']
                          .map((gender) => DropdownMenuItem(
                                value: gender,
                                child: Text(gender),
                              ))
                          .toList(),
                      onChanged: (value) {
                        setState(() {
                          _selectedGender = value!;
                        });
                      },
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              
              TextFormField(
                controller: _addressController,
                decoration: InputDecoration(
                  labelText: 'Address *',
                  border: OutlineInputBorder(),
                ),
                maxLines: 2,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter address';
                  }
                  return null;
                },
              ),
              
              SizedBox(height: 24),
              
              // Symptoms
              Text(
                'Observed Symptoms',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: _symptoms.map((symptom) {
                  final isSelected = _selectedSymptoms.contains(symptom['id']);
                  final isCritical = symptom['critical'] == true;
                  
                  return FilterChip(
                    label: Text(symptom['label']),
                    selected: isSelected,
                    onSelected: (selected) {
                      setState(() {
                        if (selected) {
                          _selectedSymptoms.add(symptom['id']);
                        } else {
                          _selectedSymptoms.remove(symptom['id']);
                        }
                      });
                    },
                    backgroundColor: isCritical 
                        ? Colors.red.shade50 
                        : null,
                    selectedColor: isCritical 
                        ? Colors.red.shade100 
                        : Theme.of(context).primaryColor.withOpacity(0.2),
                    checkmarkColor: isCritical ? Colors.red : null,
                  );
                }).toList(),
              ),
              
              SizedBox(height: 24),
              
              // Severity and Details
              Text(
                'Additional Details',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              
              DropdownButtonFormField<String>(
                value: _selectedSeverity,
                decoration: InputDecoration(
                  labelText: 'Severity *',
                  border: OutlineInputBorder(),
                ),
                items: ['Mild', 'Moderate', 'Severe']
                    .map((severity) => DropdownMenuItem(
                          value: severity,
                          child: Text(severity),
                        ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedSeverity = value!;
                  });
                },
              ),
              SizedBox(height: 16),
              
              InkWell(
                onTap: () async {
                  final date = await showDatePicker(
                    context: context,
                    initialDate: _onsetDate,
                    firstDate: DateTime.now().subtract(Duration(days: 30)),
                    lastDate: DateTime.now(),
                  );
                  if (date != null) {
                    setState(() {
                      _onsetDate = date;
                    });
                  }
                },
                child: InputDecorator(
                  decoration: InputDecoration(
                    labelText: 'Symptom Onset Date *',
                    border: OutlineInputBorder(),
                  ),
                  child: Text(
                    '${_onsetDate.day}/${_onsetDate.month}/${_onsetDate.year}',
                  ),
                ),
              ),
              SizedBox(height: 16),
              
              TextFormField(
                controller: _temperatureController,
                decoration: InputDecoration(
                  labelText: 'Temperature (°F)',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
              ),
              SizedBox(height: 16),
              
              DropdownButtonFormField<String>(
                value: _selectedWaterSource,
                decoration: InputDecoration(
                  labelText: 'Primary Water Source *',
                  border: OutlineInputBorder(),
                ),
                items: ['Well', 'Borehole', 'River', 'Pond', 'Tap Water', 'Other']
                    .map((source) => DropdownMenuItem(
                          value: source,
                          child: Text(source),
                        ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedWaterSource = value!;
                  });
                },
              ),
              SizedBox(height: 16),
              
              TextFormField(
                controller: _notesController,
                decoration: InputDecoration(
                  labelText: 'Additional Notes',
                  border: OutlineInputBorder(),
                ),
                maxLines: 3,
              ),
              
              SizedBox(height: 32),
              
              // Submit Button
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  onPressed: _isSubmitting ? null : _submitReport,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _hasCriticalSymptoms ? Colors.red : null,
                  ),
                  child: _isSubmitting
                      ? CircularProgressIndicator()
                      : Text(
                          _hasCriticalSymptoms 
                              ? 'Submit Critical Report' 
                              : 'Submit Report',
                          style: TextStyle(
                            color: _hasCriticalSymptoms ? Colors.white : null,
                          ),
                        ),
                ),
              ),
              SizedBox(height: 16),
              
              SizedBox(
                width: double.infinity,
                height: 48,
                child: OutlinedButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text('Cancel'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}