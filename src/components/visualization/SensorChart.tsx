
import React from 'react';
import { SensorData, TimeRange } from './types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface SensorChartProps {
  sensorData: SensorData[];
  selectedTimeRange: TimeRange;
  activeSensorTab: string;
}

export const SensorChart: React.FC<SensorChartProps> = ({
  sensorData,
  selectedTimeRange,
  activeSensorTab
}) => {
  // Process data for the chart
  const chartData = prepareChartData(sensorData, activeSensorTab, selectedTimeRange);
  
  // Get Y-axis range
  const yRange = getYAxisRange(chartData, activeSensorTab);
  
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#888' }}
            tickFormatter={(tick) => formatXAxisTick(tick, selectedTimeRange)}
          />
          <YAxis 
            domain={[yRange.min, yRange.max]} 
            tick={{ fill: '#888' }}
          />
          <Tooltip content={<CustomTooltip activeSensorTab={activeSensorTab} />} />
          
          {sensorData.map((sensor, index) => (
            <Line
              key={sensor.id}
              type="monotone"
              dataKey={`${sensor.id}`}
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#22c55e", stroke: "#fff" }}
              isAnimationActive={true}
              animationDuration={500}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Helper function to prepare data for the chart
const prepareChartData = (sensorData: SensorData[], activeSensorTab: string, timeRange: TimeRange) => {
  // Get the current date
  const now = new Date();
  
  // Determine the start date based on the selected time range
  let startDate = new Date();
  switch(timeRange) {
    case '12hours':
      startDate.setHours(startDate.getHours() - 12);
      break;
    case '48hours':
      startDate.setHours(startDate.getHours() - 48);
      break;
    case 'week':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 'year':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    case 'custom':
      startDate.setMonth(startDate.getMonth() - 1); // Default to 1 month for custom
      break;
  }
  
  // Create a map to store readings by timestamp
  const readingsByTimestamp: Record<string, any> = {};
  
  // Process each sensor's readings
  sensorData.forEach(sensor => {
    const readings = sensor.readings[activeSensorTab as keyof typeof sensor.readings] || [];
    
    readings.forEach(reading => {
      const timestamp = reading.timestamp.getTime();
      
      // Only include readings within the selected time range
      if (timestamp >= startDate.getTime() && timestamp <= now.getTime()) {
        const timeKey = timestamp.toString();
        
        if (!readingsByTimestamp[timeKey]) {
          readingsByTimestamp[timeKey] = {
            timestamp,
            time: reading.timestamp,
          };
        }
        
        readingsByTimestamp[timeKey][sensor.id] = reading.value;
      }
    });
  });
  
  // Convert the map to an array and sort by timestamp
  const sortedData = Object.values(readingsByTimestamp).sort((a, b) => a.timestamp - b.timestamp);
  
  return sortedData;
};

// Helper function to determine the Y-axis range based on the data
const getYAxisRange = (data: any[], sensorType: string) => {
  if (data.length === 0) {
    return { min: 0, max: 100 };
  }
  
  // Extract all values for the given sensor type
  const allValues: number[] = [];
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'timestamp' && key !== 'time' && typeof item[key] === 'number') {
        allValues.push(item[key]);
      }
    });
  });
  
  if (allValues.length === 0) {
    return { min: 0, max: 100 };
  }
  
  // Calculate min and max values
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  
  // Add some padding to the range
  const padding = (max - min) * 0.1;
  
  return {
    min: Math.max(0, min - padding), // Don't go below 0 for most sensor types
    max: max + padding
  };
};

// Helper function to format X-axis ticks based on time range
const formatXAxisTick = (tick: any, timeRange: TimeRange) => {
  const date = new Date(tick);
  
  switch(timeRange) {
    case '12hours':
    case '48hours':
      return format(date, 'HH:mm');
    case 'week':
      return format(date, 'E', { locale: pl });
    case 'month':
      return format(date, 'dd.MM.yyyy HH:mm', { locale: pl });
    case 'year':
      return format(date, 'MMM', { locale: pl });
    default:
      return format(date, 'dd.MM');
  }
};

// Custom tooltip component for the chart
interface CustomTooltipProps extends TooltipProps<any, any> {
  activeSensorTab: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, activeSensorTab }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }
  
  const date = new Date(label);
  let unit = '';
  
  switch(activeSensorTab) {
    case 'Temp':
      unit = '°C';
      break;
    case 'CO2':
      unit = 'ppm';
      break;
    case 'VOC':
      unit = 'ppb';
      break;
    case 'PM2.5':
    case 'PM10':
    case 'PM1':
      unit = 'µg/m³';
      break;
    case 'Humidity':
      unit = '%';
      break;
    case 'Pressure':
      unit = 'hPa';
      break;
    case 'Noise':
      unit = 'dB';
      break;
    case 'Light':
      unit = 'lux';
      break;
    case 'VirusRisk':
      unit = '%';
      break;
  }
  
  return (
    <div className="bg-background p-3 border rounded-lg shadow-lg">
      <p className="text-sm font-semibold mb-1">{format(date, 'PPpp', { locale: pl })}</p>
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color || '#22c55e' }}></div>
          <span className="text-sm">{entry.name}: </span>
          <span className="text-sm font-semibold">{entry.value.toFixed(1)} {unit}</span>
        </div>
      ))}
    </div>
  );
};
