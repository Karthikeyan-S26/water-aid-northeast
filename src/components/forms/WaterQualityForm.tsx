import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Droplets, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WaterQualityFormProps {
  onClose: () => void;
}

const WaterQualityForm: React.FC<WaterQualityFormProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    location: '',
    sourceType: '',
    ph: '',
    turbidity: '',
    tds: '',
    temperature: '',
    chlorine: '',
    ecoli: '',
    testDate: new Date().toISOString().split('T')[0],
    testTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
    notes: '',
    coordinates: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isWaterQualityPoor = () => {
    const ph = parseFloat(formData.ph);
    const turbidity = parseFloat(formData.turbidity);
    const tds = parseFloat(formData.tds);
    
    return (
      (ph && (ph < 6.5 || ph > 8.5)) ||
      (turbidity && turbidity > 5) ||
      (tds && tds > 1000) ||
      formData.ecoli === 'detected'
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const isPoorQuality = isWaterQualityPoor();

    toast({
      title: "Water Quality Report Submitted",
      description: isPoorQuality 
        ? "Poor water quality detected. Health officer has been alerted."
        : "Water quality data has been recorded successfully.",
      variant: isPoorQuality ? "destructive" : "default"
    });

    setIsSubmitting(false);
    onClose();
  };

  const poorQuality = isWaterQualityPoor();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onClose} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Droplets className="w-6 h-6 text-primary" />
              <span>Water Quality Report</span>
            </CardTitle>
            <CardDescription>
              Record water quality measurements from field testing
            </CardDescription>
            {poorQuality && (
              <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="text-warning font-medium">Poor water quality detected - immediate attention required</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Water Source Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Village Well #1, Main Road"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sourceType">Source Type *</Label>
                  <Select value={formData.sourceType} onValueChange={(value) => setFormData(prev => ({ ...prev, sourceType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="village_well">Village Well</SelectItem>
                      <SelectItem value="tube_well">Tube Well</SelectItem>
                      <SelectItem value="hand_pump">Hand Pump</SelectItem>
                      <SelectItem value="river">River</SelectItem>
                      <SelectItem value="pond">Pond</SelectItem>
                      <SelectItem value="tap_water">Tap Water</SelectItem>
                      <SelectItem value="spring">Natural Spring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Test Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testDate">Test Date *</Label>
                  <Input
                    id="testDate"
                    type="date"
                    value={formData.testDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, testDate: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="testTime">Test Time *</Label>
                  <Input
                    id="testTime"
                    type="time"
                    value={formData.testTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, testTime: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Water Quality Parameters */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Water Quality Parameters</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ph">pH Level</Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      value={formData.ph}
                      onChange={(e) => setFormData(prev => ({ ...prev, ph: e.target.value }))}
                      placeholder="6.5-8.5 (normal)"
                    />
                    <p className="text-xs text-muted-foreground">Normal: 6.5-8.5</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="turbidity">Turbidity (NTU)</Label>
                    <Input
                      id="turbidity"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.turbidity}
                      onChange={(e) => setFormData(prev => ({ ...prev, turbidity: e.target.value }))}
                      placeholder="< 5 NTU (good)"
                    />
                    <p className="text-xs text-muted-foreground">Good: &lt; 5 NTU</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tds">TDS (ppm)</Label>
                    <Input
                      id="tds"
                      type="number"
                      min="0"
                      value={formData.tds}
                      onChange={(e) => setFormData(prev => ({ ...prev, tds: e.target.value }))}
                      placeholder="< 1000 ppm (acceptable)"
                    />
                    <p className="text-xs text-muted-foreground">Acceptable: &lt; 1000 ppm</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
                      placeholder="e.g., 25.5"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chlorine">Chlorine (mg/L)</Label>
                    <Input
                      id="chlorine"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.chlorine}
                      onChange={(e) => setFormData(prev => ({ ...prev, chlorine: e.target.value }))}
                      placeholder="0.2-1.0 mg/L (treated)"
                    />
                    <p className="text-xs text-muted-foreground">Treated: 0.2-1.0 mg/L</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ecoli">E. coli Test</Label>
                    <Select value={formData.ecoli} onValueChange={(value) => setFormData(prev => ({ ...prev, ecoli: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not_detected">Not Detected</SelectItem>
                        <SelectItem value="detected">Detected</SelectItem>
                        <SelectItem value="not_tested">Not Tested</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* GPS Coordinates */}
              <div className="space-y-2">
                <Label htmlFor="coordinates">GPS Coordinates (Optional)</Label>
                <Input
                  id="coordinates"
                  value={formData.coordinates}
                  onChange={(e) => setFormData(prev => ({ ...prev, coordinates: e.target.value }))}
                  placeholder="e.g., 26.1445, 91.7362"
                />
                <p className="text-xs text-muted-foreground">Format: Latitude, Longitude</p>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Observations</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Color, odor, taste, surrounding conditions, etc."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-6">
                <Button 
                  type="submit" 
                  variant={poorQuality ? "warning" : "default"}
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
                      {poorQuality ? "Submit Priority Report" : "Submit Report"}
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

export default WaterQualityForm;