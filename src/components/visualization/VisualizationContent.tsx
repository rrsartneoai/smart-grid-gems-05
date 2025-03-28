
import ReportGenerator from './ReportGenerator';
import React from 'react';
import { SensorTabs } from './SensorTabs';
import { SensorTabContent } from './SensorTabContent';
import { SensorData, TimeRange } from './types';

interface VisualizationContentProps {
  sensorData: SensorData[];
  selectedTimeRange: TimeRange;
  selectedSensors: string[];
  onSensorSelection: (sensor: string) => void;
  isLoading: boolean;
  activeSensorTab: string;
  setActiveSensorTab: (tab: string) => void;
}

export const VisualizationContent: React.FC<VisualizationContentProps> = ({
  sensorData,
  selectedTimeRange,
  selectedSensors,
  onSensorSelection,
  isLoading,
  activeSensorTab,
  setActiveSensorTab
}) => {
  return (
    <div className="p-6 space-y-6">
      <SensorTabs 
        activeSensorTab={activeSensorTab}
        setActiveSensorTab={setActiveSensorTab}
        selectedSensors={selectedSensors}
        onSensorSelection={onSensorSelection}
      />
      
      <SensorTabContent 
        sensorData={sensorData}
        activeSensorTab={activeSensorTab}
        selectedTimeRange={selectedTimeRange}
        isLoading={isLoading}
      />
      
      <ReportGenerator data={sensorData} fileName="Sensor_Report" />
    </div>
  );
};
