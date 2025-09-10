import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SymptomReportFormProps {
  onClose: () => void;
}

const SymptomReportForm: React.FC<SymptomReportFormProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    symptoms: [] as string[],
    severity: '',
    onsetDate: '',
    notes: '',
    temperature: '',
    waterSource: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const commonSymptoms = [
    { id: 'fever', label: 'Fever', critical: true },
    { id: 'diarrhea', label: 'Diarrhea', critical: true },
    { id: 'vomiting', label: 'Vomiting', critical: true },
    { id: 'nausea', label: 'Nausea', critical: false },
    { id: 'stomach_pain', label: 'Stomach Pain', critical: false },
    { id: 'headache', label: 'Headache', critical: false },
    { id: 'weakness', label: 'Weakness', critical: false },
    { id: 'dehydration', label: 'Dehydration', critical: true },
    { id: 'skin_rash', label: 'Skin Rash', critical: false },
    { id: 'jaundice', label: 'Jaundice (Yellow skin/eyes)', critical: true }
  ];

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      symptoms: checked 
        ? [...prev.symptoms, symptomId]
        : prev.symptoms.filter(id => id !== symptomId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check for critical symptoms
    const criticalSymptoms = formData.symptoms.filter(symptomId => 
      commonSymptoms.find(s => s.id === symptomId)?.critical
    );

    toast({
      title: "Report Submitted Successfully",
      description: criticalSymptoms.length > 0 
        ? "Critical symptoms detected. Health officer has been alerted."
        : "Report has been recorded and will be reviewed.",
      variant: criticalSymptoms.length > 0 ? "destructive" : "default"
    });

    setIsSubmitting(false);
    onClose();
  };

  const criticalSymptomsSelected = formData.symptoms.some(symptomId => 
    commonSymptoms.find(s => s.id === symptomId)?.critical
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onClose} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Health Symptom Report</CardTitle>
            <CardDescription>
              Record patient symptoms and health concerns for early disease detection
            </CardDescription>
            {criticalSymptomsSelected && (
              <div className="flex items-center space-x-2 p-3 bg-danger/10 border border-danger/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-danger" />
                <span className="text-danger font-medium">Critical symptoms detected - priority submission</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address/Location *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="House number, street, village"
                  required
                />
              </div>

              {/* Symptoms */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Symptoms Observed *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {commonSymptoms.map((symptom) => (
                    <div key={symptom.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom.id}
                        checked={formData.symptoms.includes(symptom.id)}
                        onCheckedChange={(checked) => handleSymptomChange(symptom.id, !!checked)}
                      />
                      <Label 
                        htmlFor={symptom.id}
                        className={`text-sm ${symptom.critical ? 'text-danger font-medium' : ''}`}
                      >
                        {symptom.label}
                        {symptom.critical && <span className="text-danger ml-1">⚠</span>}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Level *</Label>
                  <Select value={formData.severity} onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="onsetDate">Symptom Onset Date *</Label>
                  <Input
                    id="onsetDate"
                    type="date"
                    value={formData.onsetDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, onsetDate: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
                    placeholder="e.g., 101.5"
                  />
                </div>
              </div>

              {/* Water Source */}
              <div className="space-y-2">
                <Label htmlFor="waterSource">Primary Water Source *</Label>
                <Select value={formData.waterSource} onValueChange={(value) => setFormData(prev => ({ ...prev, waterSource: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select water source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="village_well">Village Well</SelectItem>
                    <SelectItem value="tube_well">Tube Well</SelectItem>
                    <SelectItem value="river">River</SelectItem>
                    <SelectItem value="pond">Pond</SelectItem>
                    <SelectItem value="tap_water">Tap Water</SelectItem>
                    <SelectItem value="bottled_water">Bottled Water</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional observations, patient history, or concerns..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-6">
                <Button 
                  type="submit" 
                  variant={criticalSymptomsSelected ? "danger" : "default"}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Save className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {criticalSymptomsSelected ? "Submit Priority Report" : "Submit Report"}
                    </>
                  )}
                </Button>
                
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomReportForm;