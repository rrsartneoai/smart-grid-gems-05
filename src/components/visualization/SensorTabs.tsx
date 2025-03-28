
import React from 'react';

interface SensorTabsProps {
  activeSensorTab: string;
  setActiveSensorTab: (tab: string) => void;
  selectedSensors: string[];
  onSensorSelection: (sensor: string) => void;
}

export const SensorTabs: React.FC<SensorTabsProps> = ({
  activeSensorTab,
  setActiveSensorTab,
  selectedSensors,
  onSensorSelection
}) => {
  const sensorTypes = [
    { id: 'Temp', label: 'Temp' },
    { id: 'CO2', label: 'CO₂' },
    { id: 'VOC', label: 'VOC' },
    { id: 'PM2.5', label: 'PM 2.5' },
    { id: 'PM1', label: 'PM1' },
    { id: 'PM10', label: 'PM10' },
    { id: 'Humidity', label: 'Humidity' },
    { id: 'Pressure', label: 'Pressure' },
    { id: 'Noise', label: 'Noise' },
    { id: 'Light', label: 'Light' },
    { id: 'VirusRisk', label: 'Virus Risk' }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-1 min-w-max">
        {sensorTypes.map((sensor) => (
          <button
            key={sensor.id}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative
              ${activeSensorTab === sensor.id 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
            onClick={() => setActiveSensorTab(sensor.id)}
          >
            {sensor.label}
            {activeSensorTab === sensor.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>
      <div className="h-0.5 w-full bg-border/50 -mt-0.5"></div>
    </div>
  );
};
