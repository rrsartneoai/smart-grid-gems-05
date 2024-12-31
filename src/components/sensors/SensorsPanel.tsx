import { useState } from "react";
import { useTranslation } from "react-i18next";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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

const SensorsPanel = () => {
  const { t } = useTranslation();
  const [sensors, setSensors] = useState<Sensor[]>([
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
  ]);

  const handleHide = (id: number) => {
    setSensors(sensors.filter(sensor => sensor.id !== id));
  };

  return (
    <div className="grid gap-6">
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
  );
};

export default SensorsPanel;