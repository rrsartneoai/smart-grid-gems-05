import { Line } from 'recharts';
import { BaseChart } from './BaseChart';

interface EnergyTrendsChartProps {
  data: any[];
}

export const EnergyTrendsChart = ({ data }: EnergyTrendsChartProps) => {
  return (
    <BaseChart data={data}>
      <Line
        type="monotone"
        dataKey="consumption"
        name="Zużycie"
        stroke="#8884d8"
        strokeWidth={2}
      />
      <Line
        type="monotone"
        dataKey="production"
        name="Produkcja"
        stroke="#82ca9d"
        strokeWidth={2}
      />
    </BaseChart>
  );
};