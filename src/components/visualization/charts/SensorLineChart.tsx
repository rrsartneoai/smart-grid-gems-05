
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { SensorReading } from '../types';

interface SensorLineChartProps {
  data: SensorReading[];
  sensorType: string;
  color?: string;
  unit?: string;
  height?: number | string;
  width?: number | string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
}

export const SensorLineChart: React.FC<SensorLineChartProps> = ({
  data,
  sensorType,
  color = '#8884d8',
  unit = '',
  height = 300,
  width = "100%",
  showGrid = true,
  showTooltip = true,
  showLegend = true
}) => {
  // Format the data for the chart
  const chartData = data.map(reading => ({
    time: new Date(reading.timestamp).toLocaleString(),
    value: reading.value,
    status: reading.status
  }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
        
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 12 }} 
          angle={-45} 
          textAnchor="end"
          height={60}
          tickMargin={10}
        />
        
        <YAxis 
          tick={{ fontSize: 12 }}
          tickMargin={10}
          label={{ 
            value: unit, 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' }
          }}
        />
        
        {showTooltip && (
          <Tooltip
            formatter={(value) => [`${value} ${unit}`, sensorType]}
            labelFormatter={(label) => `Time: ${label}`}
          />
        )}
        
        {showLegend && <Legend />}
        
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          name={sensorType}
          dot={{ strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
