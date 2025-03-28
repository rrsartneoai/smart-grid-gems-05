
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SensorLineChart } from './charts/SensorLineChart';
import { SensorData } from './types';
import { getSensorColor, getSensorUnit } from './utils/sensorUtils';

interface SensorTabContentProps {
  sensorData: SensorData[];
  activeSensorTab: string;
  selectedTimeRange: string;
  isLoading: boolean;
}

export const SensorTabContent: React.FC<SensorTabContentProps> = ({
  sensorData,
  activeSensorTab,
  selectedTimeRange,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading sensor data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!sensorData.length) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex items-center justify-center h-[400px]">
          <div className="text-center">
            <p className="text-muted-foreground">
              No sensor data available. Please upload a CSV file with sensor readings.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Combine all sensor readings for the active sensor type
  const allReadings = sensorData.flatMap(sensor => 
    sensor.readings[activeSensorTab as keyof typeof sensor.readings] || []
  );

  // Filter readings based on selected time range
  const filteredReadings = allReadings.filter(reading => {
    const now = new Date();
    const readingDate = new Date(reading.timestamp);
    
    switch (selectedTimeRange) {
      case '12hours':
        return readingDate >= new Date(now.setHours(now.getHours() - 12));
      case '48hours':
        return readingDate >= new Date(now.setHours(now.getHours() - 48));
      case 'week':
        return readingDate >= new Date(now.setDate(now.getDate() - 7));
      case 'month':
        return readingDate >= new Date(now.setMonth(now.getMonth() - 1));
      case 'year':
        return readingDate >= new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return true;
    }
  });

  const sensorColor = getSensorColor(activeSensorTab);
  const sensorUnit = getSensorUnit(activeSensorTab);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="h-[400px]">
          {filteredReadings.length > 0 ? (
            <SensorLineChart 
              data={filteredReadings} 
              sensorType={activeSensorTab}
              color={sensorColor}
              unit={sensorUnit}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                No data available for {activeSensorTab} in the selected time range.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
