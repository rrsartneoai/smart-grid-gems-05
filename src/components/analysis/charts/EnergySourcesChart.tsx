import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface EnergySourcesChartProps {
  data: any[];
}

export const EnergySourcesChart = () => {
  const data = [
    { name: "Energia słoneczna", value: 30 },
    { name: "Energia wiatrowa", value: 25 },
    { name: "Biomasa", value: 20 },
    { name: "Inne źródła", value: 25 },
  ];

  return (
    <PieChart width={500} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};