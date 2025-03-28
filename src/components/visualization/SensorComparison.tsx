
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, BarChart2 } from 'lucide-react';
import { SensorData, SensorReading } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { SensorLineChart } from './charts/SensorLineChart';
import { useTranslation } from 'react-i18next';
import { getSensorColor, getSensorUnit } from './utils/sensorUtils';

interface SensorComparisonProps {
  sensorData: SensorData[];
  activeSensorTab: string;
  onAddSensor: () => void;
  onGenerateReport: () => void;
}

export const SensorComparison: React.FC<SensorComparisonProps> = ({
  sensorData,
  activeSensorTab,
  onAddSensor,
  onGenerateReport
}) => {
  const { t } = useTranslation();
  const [showCombinedView, setShowCombinedView] = React.useState(false);
  
  // Only show comparison if we have multiple data sets
  if (sensorData.length <= 1) {
    return (
      <div className="mt-6 space-y-4">
        <Button 
          onClick={onAddSensor}
          className="w-full flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          {t('addAnotherSensor')}
        </Button>
      </div>
    );
  }

  // Extract readings for the active sensor type from all datasets
  const sensorReadings = sensorData.map(data => {
    const readings = Object.values(data.readings || {})
      .flatMap(r => r)
      .filter(reading => reading.sensorId === activeSensorTab);
    
    return {
      name: data.name,
      readings
    };
  });

  // Generate colors for each dataset
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onAddSensor}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          {t('addAnotherSensor')}
        </Button>
        
        <Button 
          onClick={() => setShowCombinedView(!showCombinedView)}
          variant={showCombinedView ? "default" : "outline"}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <BarChart2 size={18} />
          {t('combinedView')}
        </Button>
        
        <Button 
          onClick={onGenerateReport}
          variant="secondary"
          className="flex-1 flex items-center justify-center gap-2"
        >
          {t('generateReport')}
        </Button>
      </div>

      {showCombinedView ? (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">{t('comparisonChart')}</h3>
            <div className="h-[400px]">
              <CombinedChart 
                sensorReadings={sensorReadings} 
                activeSensorTab={activeSensorTab}
                colors={colors}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sensorReadings.map((data, index) => (
            <Card key={`${data.name}-${index}`}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">{data.name}</h3>
                <div className="h-[300px]">
                  {data.readings.length > 0 ? (
                    <SensorLineChart 
                      data={data.readings} 
                      sensorType={activeSensorTab}
                      color={colors[index % colors.length]}
                      unit={getSensorUnit(activeSensorTab)}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">
                        {t('noDataToCompare')}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Combined chart component to show all sensor data in one chart
const CombinedChart: React.FC<{
  sensorReadings: { name: string; readings: SensorReading[] }[];
  activeSensorTab: string;
  colors: string[];
}> = ({ sensorReadings, activeSensorTab, colors }) => {
  const sensorUnit = getSensorUnit(activeSensorTab);
  
  // Prepare data for the combined chart
  const chartData = sensorReadings.map((data, index) => ({
    name: data.name,
    readings: data.readings,
    color: colors[index % colors.length]
  }));
  
  return (
    <div className="h-full w-full">
      <MultiLineChart data={chartData} sensorType={activeSensorTab} unit={sensorUnit} />
    </div>
  );
};

// Custom chart component for multiple lines
const MultiLineChart: React.FC<{
  data: { name: string; readings: SensorReading[]; color: string }[];
  sensorType: string;
  unit?: string;
}> = ({ data, sensorType, unit }) => {
  // This is a placeholder for the actual multi-line chart implementation
  // You would use a library like recharts to implement this
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <p>Multi-line chart visualization would be rendered here</p>
        <p className="text-sm">Displaying {data.length} datasets for {sensorType} ({unit})</p>
      </div>
    </div>
  );
};

export default SensorComparison;
