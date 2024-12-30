import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { fetchEnergyData } from "@/utils/electricityApi";
import { EnergyMap } from "./EnergyMap";
import { EnergyStats } from "./EnergyStats";

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
  const { toast } = useToast();

  // Memoize the map center coordinates
  const mapCenter = useMemo(() => [52.0689, 19.4803] as [number, number], []);

  const { data: energyData, isLoading } = useQuery({
    queryKey: ['energy-data', selectedRange],
    queryFn: async () => {
      const API_KEY = import.meta.env.VITE_ELECTRICITY_MAP_API_KEY;
      
      try {
        return await fetchEnergyData(API_KEY);
      } catch (error) {
        toast({
          title: "Błąd API",
          description: error instanceof Error ? error.message : "Nie udało się pobrać danych",
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
            <EnergyMap center={mapCenter} zoom={6} />
            <EnergyStats 
              productionData={productionData}
              carbonIntensity={energyData?.carbonIntensity || 0}
              renewablePercentage={energyData?.renewablePercentage || 0}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}