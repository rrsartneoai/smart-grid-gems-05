import { WeatherPanel } from "@/components/weather/WeatherPanel";
import { EnergyCard } from "./EnergyCard";
import { ChargingStationsCard } from "./charging/ChargingStationsCard";
import { BikeStationsCard } from "./bikes/BikeStationsCard";
import { WeatherMap } from "@/components/weather/WeatherMap";
import { Card } from "@/components/ui/card";
import { Cloud } from "lucide-react";

export const ExperimentsPanel = () => {
  return (
    <div className="space-y-6">
      <WeatherPanel />
      
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Mapa opadów</h2>
        </div>
        <WeatherMap />
      </Card>

      <EnergyCard />
      <ChargingStationsCard />
      <BikeStationsCard />
    </div>
  );
};