
import { useEffect, useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { searchStationsNear } from '@/utils/services/waqiService';
import { getCoordinatesForLocation } from '@/utils/locationUtils';
import { SensorData } from './types/SensorDataTypes';

interface SensorsMapProps {
  city: string;
  sensors: SensorData[];
}

export function SensorsMap({ city, sensors }: SensorsMapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  const cityCoordinates = getCoordinatesForLocation(city);
  
  // Initialize map when map element is ready
  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined' || !window.L) {
      if (!window.L) {
        setError("Nie można załadować biblioteki Leaflet. Sprawdź połączenie internetowe.");
      }
      return;
    }
    
    // Cleanup function to remove previous map instance if it exists
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }
    
    try {
      // Initialize the map
      const leafletMap = window.L.map(mapRef.current).setView(
        [cityCoordinates?.lat || 54.372158, cityCoordinates?.lng || 18.638306], 
        12
      );
      
      // Add OpenStreetMap tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);
      
      leafletMapRef.current = leafletMap;
      setIsLoading(false);
      
      return () => {
        if (leafletMapRef.current) {
          leafletMapRef.current.remove();
          leafletMapRef.current = null;
        }
      };
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Wystąpił błąd podczas inicjalizacji mapy. Spróbuj odświeżyć stronę.');
      setIsLoading(false);
    }
  }, [mapRef.current, city]); // Only re-initialize when city changes or map element is mounted
  
  // Add markers for sensors
  useEffect(() => {
    if (!leafletMapRef.current || !sensors.length) return;
    
    try {
      // Clear previous markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      // Add a marker for each sensor
      sensors.forEach(sensor => {
        const sensorValue = typeof sensor.value === 'string' 
          ? parseFloat(sensor.value) 
          : sensor.value;
        
        let markerColor = '#22c55e'; // Good (green)
        if (sensorValue > 50) markerColor = '#f97316'; // Moderate (orange)
        if (sensorValue > 100) markerColor = '#ef4444'; // Poor (red)
        
        // Create custom marker icon
        const customIcon = window.L.divIcon({
          className: 'custom-sensor-marker',
          html: `
            <div style="
              background-color: ${markerColor};
              color: white;
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              border: 2px solid white;
              box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            ">
              ${Math.round(sensorValue)}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        // Use fake coordinates based on city coordinates since we don't have real coords
        // This spreads sensors around the city area for visualization
        const offset = (Math.random() - 0.5) * 0.05;
        const lat = (cityCoordinates?.lat || 54.372158) + offset;
        const lng = (cityCoordinates?.lng || 18.638306) + offset;
        
        const marker = window.L.marker([lat, lng], { icon: customIcon })
          .addTo(leafletMapRef.current)
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-bold">${sensor.name}</h3>
              <p>${sensor.value} ${sensor.unit}</p>
              <p class="text-sm text-muted-foreground">${sensor.description}</p>
            </div>
          `);
        
        markersRef.current.push(marker);
      });
    } catch (err) {
      console.error('Error adding sensor markers:', err);
      setError('Wystąpił błąd podczas dodawania znaczników sensorów na mapie.');
    }
  }, [sensors, cityCoordinates, leafletMapRef.current]); // Only re-add markers when sensors or map changes
  
  // Try to get real station data - this is a separate effect to prevent dependency loop
  useEffect(() => {
    if (!leafletMapRef.current || !cityCoordinates) return;
    
    const fetchStations = async () => {
      try {
        const stations = await searchStationsNear(
          cityCoordinates.lat, 
          cityCoordinates.lng, 
          10
        );
        
        if (!stations || !Array.isArray(stations)) {
          console.warn('No stations data returned or data is not an array');
          return;
        }
        
        // Add station markers to the map
        stations.forEach(station => {
          if (!station.station || !station.station.geo) {
            console.warn('Station missing geo data:', station);
            return;
          }
          
          try {
            const [lat, lng] = station.station.geo;
            const aqi = typeof station.aqi === 'string' 
              ? parseInt(station.aqi, 10) 
              : station.aqi;
            
            let markerColor = '#22c55e'; // Good (green)
            if (aqi > 50) markerColor = '#f97316'; // Moderate (orange)
            if (aqi > 100) markerColor = '#ef4444'; // Poor (red)
            
            const stationIcon = window.L.divIcon({
              className: 'custom-station-marker',
              html: `
                <div style="
                  background-color: ${markerColor};
                  color: white;
                  border-radius: 50%;
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  border: 2px solid white;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                ">
                  ${aqi}
                </div>
              `,
              iconSize: [40, 40],
              iconAnchor: [20, 20]
            });
            
            const marker = window.L.marker([lat, lng], { icon: stationIcon })
              .addTo(leafletMapRef.current)
              .bindPopup(`
                <div class="p-2">
                  <h3 class="font-bold">${station.station.name}</h3>
                  <p>AQI: ${station.aqi}</p>
                </div>
              `);
            
            markersRef.current.push(marker);
          } catch (stationErr) {
            console.error('Error adding station marker:', stationErr);
          }
        });
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };
    
    fetchStations();
  }, [cityCoordinates, leafletMapRef.current]); // Only fetch stations when city coordinates or map changes
  
  if (error) {
    return (
      <Card className="h-[500px] flex items-center justify-center">
        <Alert variant="destructive" className="w-full max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Błąd</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <p className="text-sm text-muted-foreground mt-2">
            Spróbuj odświeżyć stronę lub sprawdź połączenie internetowe.
          </p>
        </Alert>
      </Card>
    );
  }
  
  return (
    <Card className="w-full h-[500px] overflow-hidden">
      {isLoading && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Spinner className="w-8 h-8 mb-4" />
            <p className="text-muted-foreground">Ładowanie mapy...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full leaflet-map" 
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      />
    </Card>
  );
}
