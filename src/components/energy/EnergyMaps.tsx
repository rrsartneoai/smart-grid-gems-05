import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import MapContainer with no SSR to avoid render2 issues
const Map = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-muted rounded-lg flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
});

const API_KEY = 'VQAxrPWZJxPNH';
const API_URL = 'https://api.electricitymap.org/v3';

interface EnergyData {
  carbonIntensity: number;
  fossilFuelPercentage: number;
  renewablePercentage: number;
  production: {
    [key: string]: number;
  };
}

const timeRanges = [
  { id: '24h', label: '24 godziny' },
  { id: '72h', label: '72 godziny' },
  { id: '30d', label: '30 dni' },
  { id: '12mo', label: '12 miesięcy' },
];

export function EnergyMaps() {
  const [selectedRange, setSelectedRange] = useState('24h');
  const { toast } = useToast();
  const [isMapMounted, setIsMapMounted] = useState(false);

  useEffect(() => {
    // Delay map mounting to ensure proper initialization
    const timer = setTimeout(() => {
      setIsMapMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const { data: energyData, isLoading } = useQuery({
    queryKey: ['energy-data', selectedRange],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_URL}/power-breakdown/PL`, {
          headers: {
            'auth-token': API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch energy data');
        }
        
        const data = await response.json();
        return data as EnergyData;
      } catch (error) {
        console.error('Error fetching energy data:', error);
        toast({
          title: "Błąd",
          description: error instanceof Error ? error.message : "Nie udało się pobrać danych energetycznych",
          variant: "destructive",
        });
        return null;
      }
    },
    refetchInterval: 300000, // 5 minutes
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
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {isMapMounted && (
              <div style={{ height: '400px', width: '100%', position: 'relative' }}>
                <Map
                  center={[52.0689, 19.4803]}
                  zoom={6}
                  style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                </Map>
              </div>
            )}

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