import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface EnergyStatsProps {
  productionData: Array<{ name: string; value: number }>;
  carbonIntensity: number;
  renewablePercentage: number;
}

export const EnergyStats = ({ productionData, carbonIntensity, renewablePercentage }: EnergyStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-[300px]">
        <h3 className="text-lg font-semibold mb-4">Produkcja energii</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={productionData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-card rounded-lg border">
          <h4 className="font-medium mb-2">Intensywność węglowa</h4>
          <p className="text-2xl font-bold">
            {carbonIntensity} gCO₂eq/kWh
          </p>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <h4 className="font-medium mb-2">Udział OZE</h4>
          <p className="text-2xl font-bold text-green-500">
            {renewablePercentage}%
          </p>
        </div>
      </div>
    </div>
  );
};