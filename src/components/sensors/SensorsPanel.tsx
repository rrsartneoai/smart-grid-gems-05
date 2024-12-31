import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SensorCard } from "./SensorCard";

type SensorStatus = "Good" | "Warning";

interface Sensor {
  id: number;
  name: string;
  value: string;
  unit: string;
  status: SensorStatus;
  description: string;
  icon: React.ReactNode;
}

const defaultSensors: Sensor[] = [
  {
    id: 1,
    name: "Czujnik temperatury",
    value: "22",
    unit: "°C",
    status: "Good",
    description: "Temperatura w normie.",
    icon: <span>🌡️</span>,
  },
  {
    id: 2,
    name: "Czujnik wilgotności",
    value: "45",
    unit: "%",
    status: "Good",
    description: "Wilgotność w normie.",
    icon: <span>💧</span>,
  },
  {
    id: 3,
    name: "Czujnik jakości powietrza",
    value: "35",
    unit: "AQI",
    status: "Warning",
    description: "Jakość powietrza poniżej normy.",
    icon: <span>🌫️</span>,
  },
];

const SensorsPanel = () => {
  const { t } = useTranslation();
  const [sensors, setSensors] = useState<Sensor[]>(defaultSensors);
  const [hiddenSensors, setHiddenSensors] = useState<Sensor[]>([]);

  const handleHide = (id: number) => {
    const sensorToHide = sensors.find(sensor => sensor.id === id);
    if (sensorToHide) {
      setHiddenSensors([...hiddenSensors, sensorToHide]);
      setSensors(sensors.filter(sensor => sensor.id !== id));
    }
  };

  const handleRestoreAll = () => {
    setSensors([...sensors, ...hiddenSensors]);
    setHiddenSensors([]);
  };

  return (
    <div className="space-y-6">
      {hiddenSensors.length > 0 && (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={handleRestoreAll}
            className="text-sm"
          >
            Przywróć ukryte czujniki ({hiddenSensors.length})
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sensors.map(sensor => (
          <SensorCard
            key={sensor.id}
            icon={sensor.icon}
            name={sensor.name}
            value={sensor.value}
            unit={sensor.unit}
            status={sensor.status}
            description={sensor.description}
            onHide={() => handleHide(sensor.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SensorsPanel;