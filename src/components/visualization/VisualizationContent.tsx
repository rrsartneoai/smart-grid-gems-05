
import React, { useState } from 'react';
import { SensorTabs } from './SensorTabs';
import { SensorTabContent } from './SensorTabContent';
import { SensorData, TimeRange } from './types';
import ReportGenerator from './ReportGenerator';
import SensorComparison from './SensorComparison';
import ReportModal from './ReportModal';

interface VisualizationContentProps {
  sensorData: SensorData[];
  selectedTimeRange: TimeRange;
  selectedSensors: string[];
  onSensorSelection: (sensor: string) => void;
  isLoading: boolean;
  activeSensorTab: string;
  setActiveSensorTab: (tab: string) => void;
  onAddSensor: () => void;
}

export const VisualizationContent: React.FC<VisualizationContentProps> = ({
  sensorData,
  selectedTimeRange,
  selectedSensors,
  onSensorSelection,
  isLoading,
  activeSensorTab,
  setActiveSensorTab,
  onAddSensor
}) => {
  // State for report modal
  const [reportModalOpen, setReportModalOpen] = useState(false);
  
  // Create a dataset for exporting
  const exportableData = sensorData.flatMap(sensor => 
    Object.entries(sensor.readings || {}).map(([date, readings]) => ({
      sensorId: sensor.id,
      sensorName: sensor.name,
      date,
      ...readings.reduce((acc, reading) => ({ ...acc, [reading.sensorId]: reading.value }), {})
    }))
  );

  return (
    <div className="p-6 space-y-6" id="sensor-visualization-content">
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
      
      {/* Add the SensorComparison component */}
      <SensorComparison 
        sensorData={sensorData}
        activeSensorTab={activeSensorTab}
        onAddSensor={onAddSensor}
        onGenerateReport={() => setReportModalOpen(true)}
      />
      
      <ReportGenerator data={exportableData} fileName="Sensor_Report">
        <div className="text-center text-sm text-muted-foreground">
          {sensorData.length > 0 ? (
            <p>Dane z {sensorData.length} czujników zostały wczytane i są gotowe do analizy.</p>
          ) : (
            <p>Brak danych czujników. Użyj przycisku "Dodaj plik" aby wczytać dane.</p>
          )}
        </div>
      </ReportGenerator>
      
      {/* Report Modal */}
      <ReportModal 
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
        sensorData={sensorData}
        activeSensorTab={activeSensorTab}
      />
    </div>
  );
};
