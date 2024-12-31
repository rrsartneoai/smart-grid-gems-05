import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface EfficiencyChartProps {
  data: any[];
}

export const EfficiencyChart = ({ data }: EfficiencyChartProps) => {
  return (
    <AreaChart data={data} width={500} height={300}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="efficiency"
        name="Wydajność"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </AreaChart>
  );
};