import { ReactElement } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';

interface BaseChartProps {
  data: any[];
  children: ReactElement | ReactElement[];
}

export const BaseChart = ({ data, children }: BaseChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name"
          height={60}
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis
          width={80}
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <Tooltip />
        <Legend />
        {children}
      </LineChart>
    </ResponsiveContainer>
  );
};