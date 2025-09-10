import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockVillages, type VillageData } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, AlertTriangle, Users, Droplets } from 'lucide-react';

// Fix leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VillageRiskMapProps {
  selectedVillage?: VillageData | null;
  onVillageSelect?: (village: VillageData) => void;
}

const VillageRiskMap: React.FC<VillageRiskMapProps> = ({ 
  selectedVillage, 
  onVillageSelect 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return '#dc2626'; // red-600
      case 'high': return '#ea580c'; // orange-600
      case 'medium': return '#ca8a04'; // yellow-600
      case 'low': return '#16a34a'; // green-600
      default: return '#6b7280'; // gray-500
    }
  };

  const createCustomIcon = (village: VillageData) => {
    const color = getRiskColor(village.riskLevel);
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: white;
          font-weight: bold;
        ">
          ${village.recentCases || 0}
        </div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -13],
    });
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on Northeast India
    const map = L.map(mapRef.current).setView([26.2006, 92.9376], 8);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add village markers
    mockVillages.forEach((village) => {
      const marker = L.marker([village.latitude, village.longitude], {
        icon: createCustomIcon(village)
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold;">${village.name}</h3>
          <p style="margin: 0 0 4px 0; color: #666;"><strong>District:</strong> ${village.district}</p>
          <p style="margin: 0 0 4px 0; color: #666;"><strong>Population:</strong> ${village.population.toLocaleString()}</p>
          <p style="margin: 0 0 4px 0; color: #666;"><strong>Risk Level:</strong> 
            <span style="color: ${getRiskColor(village.riskLevel)}; font-weight: bold;">
              ${village.riskLevel.toUpperCase()}
            </span>
          </p>
          <p style="margin: 0 0 4px 0; color: #666;"><strong>Recent Cases:</strong> ${village.recentCases}</p>
          <p style="margin: 0 0 8px 0; color: #666;"><strong>Water Sources:</strong> ${village.waterSources}</p>
          <p style="margin: 0; color: #666;"><strong>ASHA Worker:</strong> ${village.ashaWorker || 'Not assigned'}</p>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add click handler
      marker.on('click', () => {
        onVillageSelect?.(village);
      });

      markersRef.current.push(marker);
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [onVillageSelect]);

  // Update selected village
  useEffect(() => {
    if (selectedVillage && mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedVillage.latitude, selectedVillage.longitude], 12);
      
      // Find and open popup for selected village
      const marker = markersRef.current.find(m => {
        const latLng = m.getLatLng();
        return Math.abs(latLng.lat - selectedVillage.latitude) < 0.001 && 
               Math.abs(latLng.lng - selectedVillage.longitude) < 0.001;
      });
      
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedVillage]);

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Village Risk Assessment Map</span>
          </CardTitle>
          <CardDescription>
            Interactive map showing disease risk levels across Northeast India villages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapRef} 
            className="w-full h-96 rounded-lg border border-border"
            style={{ minHeight: '400px' }}
          />
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Level Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-success"></div>
              <span className="text-sm">Low Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-warning"></div>
              <span className="text-sm">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ea580c' }}></div>
              <span className="text-sm">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-danger"></div>
              <span className="text-sm">Critical</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Numbers on markers indicate recent disease cases in each village
          </p>
        </CardContent>
      </Card>

      {/* Selected Village Info */}
      {selectedVillage && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedVillage.name}</span>
              <Badge className={`${getRiskColor(selectedVillage.riskLevel)} text-white`}>
                {selectedVillage.riskLevel.toUpperCase()} RISK
              </Badge>
            </CardTitle>
            <CardDescription>
              {selectedVillage.district} District
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Users className="w-6 h-6 text-primary mx-auto mb-1" />
                <div className="text-lg font-semibold">{selectedVillage.population.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Population</div>
              </div>
              <div className="text-center">
                <AlertTriangle className="w-6 h-6 text-danger mx-auto mb-1" />
                <div className="text-lg font-semibold">{selectedVillage.recentCases}</div>
                <div className="text-xs text-muted-foreground">Recent Cases</div>
              </div>
              <div className="text-center">
                <Droplets className="w-6 h-6 text-primary mx-auto mb-1" />
                <div className="text-lg font-semibold">{selectedVillage.waterSources}</div>
                <div className="text-xs text-muted-foreground">Water Sources</div>
              </div>
              <div className="text-center">
                <Users className="w-6 h-6 text-success mx-auto mb-1" />
                <div className="text-lg font-semibold">1</div>
                <div className="text-xs text-muted-foreground">ASHA Worker</div>
              </div>
            </div>
            
            {selectedVillage.ashaWorker && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <strong>ASHA Worker:</strong> {selectedVillage.ashaWorker}
                </p>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" variant="outline">
                    Contact Worker
                  </Button>
                  <Button size="sm" variant="outline">
                    View Reports
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VillageRiskMap;