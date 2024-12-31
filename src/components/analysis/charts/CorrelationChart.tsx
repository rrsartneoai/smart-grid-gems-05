import { ComposedChart, Bar, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CorrelationChartProps {
  data: any[];
}

export const CorrelationChart = ({ data }: CorrelationChartProps) => {
  return (
    <ComposedChart data={data} width={500} height={300}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="consumption" name="Zużycie" fill="#8884d8" />
      <Scatter dataKey="efficiency" name="Wydajność" fill="#82ca9d" />
    </ComposedChart>
  );
};