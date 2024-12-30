import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import L from 'leaflet';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LoadingSpinner = () => (
  <div className="h-[400px] w-full bg-muted rounded-lg flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

const timeRanges = [
  { id: '24h', label: '24 godziny' },
  { id: '72h', label: '72 godziny' },
  { id: '30d', label: '30 dni' },
  { id: '12mo', label: '12 miesięcy' },
];

export function EnergyMaps() {
  const [selectedRange, setSelectedRange] = useState('24h');
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Delay map initialization to avoid render issues
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setMapReady(false);
    };
  }, []);

  const { data: energyData, isLoading } = useQuery({
    queryKey: ['energy-data', selectedRange],
    queryFn: async () => {
      const API_KEY = import.meta.env.VITE_ELECTRICITY_MAP_API_KEY;
      
      if (!API_KEY) {
        toast({
          title: "Błąd konfiguracji",
          description: "Brak klucza API dla Electricity Map",
          variant: "destructive",
        });
        throw new Error('API key is not configured');
      }

      try {
        const response = await fetch('https://api.electricitymap.org/v3/power-breakdown/PL', {
          headers: {
            'auth-token': API_KEY,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast({
            title: "Błąd API",
            description: errorData.error || "Nie udało się pobrać danych",
            variant: "destructive",
          });
          throw new Error(errorData.error || 'Failed to fetch energy data');
        }

        return response.json();
      } catch (error) {
        console.error('API Error:', error);
        toast({
          title: "Błąd połączenia",
          description: "Nie udało się połączyć z API",
          variant: "destructive",
        });
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    retry: false
  });

  const productionData = energyData?.production ? Object.entries(energyData.production).map(([source, value]) => ({
    name: source,
    value: value
  })) : [];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Mapa Energetyczna Polski</CardTitle>
          <Select
            value={selectedRange}
            onValueChange={setSelectedRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wybierz zakres" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            <div className="h-[400px] relative bg-muted rounded-lg overflow-hidden">
              {mapReady && (
                <MapContainer
                  key={mapReady.toString()}
                  center={[52.0689, 19.4803]}
                  zoom={6}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                  ref={mapRef}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[52.0689, 19.4803]}>
                    <Popup>
                      Centrum Polski
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[300px]">
                <h3 className="text-lg font-semibold mb-4">Produkcja energii</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productionData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border">
                  <h4 className="font-medium mb-2">Intensywność węglowa</h4>
                  <p className="text-2xl font-bold">
                    {energyData?.carbonIntensity || 0} gCO₂eq/kWh
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg border">
                  <h4 className="font-medium mb-2">Udział OZE</h4>
                  <p className="text-2xl font-bold text-green-500">
                    {energyData?.renewablePercentage || 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}