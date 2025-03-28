
import React, { useState } from 'react';
import { VisualizationHeader } from '../visualization/VisualizationHeader';
import { VisualizationContent } from '../visualization/VisualizationContent';
import { SensorData, TimeRange } from '../visualization/types';
import { parseCsvFiles } from '../visualization/utils/csvParser';
import { toast } from 'sonner';
import { generateCSV, generateXLSX } from '@/utils/reportUtils';

const VisualizationTab = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('month');
  const [selectedSensors, setSelectedSensors] = useState<string[]>(['Temp', 'CO2', 'VOC', 'PM2.5', 'PM10', 'Humidity', 'Pressure', 'Noise', 'Light', 'Virus Risk']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSensorTab, setActiveSensorTab] = useState<string>('PM10');

  const handleFileUpload = async (files: File[]) => {
    if (!files || files.length === 0) {
      toast.error('Nie wybrano żadnych plików.');
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('Parsing CSV files:', files.map(f => f.name));
      const parsedData = await parseCsvFiles(files);
      
      if (parsedData && parsedData.length > 0) {
        // Append to existing data or set new data
        setSensorData(currentData => [...currentData, ...parsedData]);
        
        // Check if we have any actual readings
        const hasReadings = parsedData.some(sensor => 
          Object.values(sensor.readings).some(readings => readings && readings.length > 0)
        );
        
        if (hasReadings) {
          // Check if we're using mock data
          const hasMockData = parsedData.some(sensor => {
            const sensorKeys = Object.keys(sensor.readings);
            if (sensorKeys.length === 0) return false;
            
            const firstKey = sensorKeys[0];
            const readings = sensor.readings[firstKey];
            
            return readings && 
                  readings.length > 0 && 
                  readings[0]?.value !== undefined;
          });
          
          if (hasMockData) {
            toast.success(`Wczytano ${files.length} ${files.length === 1 ? 'plik' : 'pliki'} (dane przykładowe)`);
          } else {
            toast.success(`Wczytano ${files.length} ${files.length === 1 ? 'plik' : 'pliki'}`);
          }
        } else {
          toast.warning('Wczytano pliki, ale nie znaleziono odczytów czujników.');
        }
      } else {
        toast.error('Nie udało się wczytać danych z plików.');
      }
    } catch (error) {
      console.error('Error parsing CSV files:', error);
      toast.error(`Błąd podczas wczytywania plików CSV: ${error instanceof Error ? error.message : 'Nieznany błąd'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setSelectedTimeRange(range);
  };

  const handleSensorSelection = (sensor: string) => {
    if (selectedSensors.includes(sensor)) {
      setSelectedSensors(selectedSensors.filter(s => s !== sensor));
    } else {
      setSelectedSensors([...selectedSensors, sensor]);
    }
  };

  const handleDeleteData = () => {
    setSensorData([]);
    toast.success('Usunięto dane');
  };

  const handleRefreshData = () => {
    // In a real application, this might re-fetch data from an API
    toast.success('Odświeżono dane');
  };

  const handleDownloadReport = () => {
    // Prepare data for export formats that need explicit data (CSV, Excel)
    const exportableData = sensorData.flatMap(sensor => 
      Object.entries(sensor.readings || {}).map(([date, readings]) => ({
        sensorId: sensor.id,
        sensorName: sensor.name,
        date,
        ...readings.reduce((acc, reading) => ({ ...acc, [reading.sensorId]: reading.value }), {})
      }))
    );
    
    if (exportableData.length === 0) {
      toast.error('Brak danych do eksportu.');
      return;
    }
    
    // We'll use this for CSV and Excel exports (PDF and PNG use DOM rendering)
    const format = window.prompt('Wybierz format (csv lub xlsx):', 'csv');
    
    if (format === 'csv') {
      generateCSV(exportableData, 'sensor_data');
    } else if (format === 'xlsx') {
      generateXLSX(exportableData, 'sensor_data');
    }
  };

  // Function to trigger file selection for adding another sensor
  const handleAddAnotherSensor = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        handleFileUpload(Array.from(input.files));
      }
    };
    fileInput.click();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <VisualizationHeader 
        onFileUpload={handleFileUpload}
        onTimeRangeChange={handleTimeRangeChange}
        selectedTimeRange={selectedTimeRange}
        onRefresh={handleRefreshData}
        onDeleteData={handleDeleteData}
        onDownloadReport={handleDownloadReport}
        hasSensorData={sensorData.length > 0}
      />
      <VisualizationContent 
        sensorData={sensorData}
        selectedTimeRange={selectedTimeRange}
        selectedSensors={selectedSensors}
        onSensorSelection={handleSensorSelection}
        isLoading={isLoading}
        activeSensorTab={activeSensorTab}
        setActiveSensorTab={setActiveSensorTab}
        onAddSensor={handleAddAnotherSensor}
      />
    </div>
  );
};

export default VisualizationTab;
