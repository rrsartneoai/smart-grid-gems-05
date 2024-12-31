import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SensorCard } from "./SensorCard";
import { Button } from "@/components/ui/button";
import { useHiddenItems } from "@/hooks/useHiddenItems";

const initialSensors = [
  {
    id: 1,
    name: "Czujnik temperatury",
    value: "22",
    unit: "°C",
    status: "Good",
    description: "Temperatura w normie.",
    tooltip: "Mierzy temperaturę otoczenia w stopniach Celsjusza. Wartości między 20-25°C są optymalne dla większości pomieszczeń.",
    icon: <span>🌡️</span>,
  },
  {
    id: 2,
    name: "Czujnik wilgotności",
    value: "45",
    unit: "%",
    status: "Good",
    description: "Wilgotność w normie.",
    tooltip: "Monitoruje poziom wilgotności względnej w powietrzu. Optymalna wilgotność mieści się w zakresie 40-60%.",
    icon: <span>💧</span>,
  },
  {
    id: 3,
    name: "Czujnik jakości powietrza",
    value: "35",
    unit: "AQI",
    status: "Warning",
    description: "Jakość powietrza poniżej normy.",
    tooltip: "Mierzy jakość powietrza według indeksu AQI. Wartości poniżej 50 oznaczają dobrą jakość powietrza.",
    icon: <span>🌫️</span>,
  },
  {
    id: 4,
    name: "Czujnik napięcia",
    value: "230",
    unit: "V",
    status: "Good",
    description: "Napięcie w sieci stabilne.",
    tooltip: "Monitoruje napięcie w sieci elektrycznej. Standardowe napięcie w Polsce to 230V ±10%.",
    icon: <span>⚡</span>,
  },
  {
    id: 5,
    name: "Czujnik prądu",
    value: "10",
    unit: "A",
    status: "Good",
    description: "Natężenie prądu w normie.",
    tooltip: "Mierzy natężenie prądu płynącego w obwodzie. Pomaga w monitorowaniu obciążenia instalacji.",
    icon: <span>🔌</span>,
  },
  {
    id: 6,
    name: "Czujnik mocy",
    value: "2.3",
    unit: "kW",
    status: "Good",
    description: "Moc w normie.",
    tooltip: "Pokazuje aktualny pobór mocy. Pomaga w optymalizacji zużycia energii.",
    icon: <span>⚡</span>,
  },
  {
    id: 7,
    name: "Czujnik częstotliwości",
    value: "50",
    unit: "Hz",
    status: "Good",
    description: "Częstotliwość sieci stabilna.",
    tooltip: "Monitoruje częstotliwość prądu w sieci. W Europie standardowa częstotliwość to 50 Hz.",
    icon: <span>📊</span>,
  },
  {
    id: 8,
    name: "Czujnik harmonicznych",
    value: "2.5",
    unit: "%",
    status: "Good",
    description: "Poziom harmonicznych w normie.",
    tooltip: "Mierzy zniekształcenia harmoniczne w sieci. Wysokie wartości mogą wskazywać na problemy z jakością energii.",
    icon: <span>📈</span>,
  },
  {
    id: 9,
    name: "Czujnik współczynnika mocy",
    value: "0.95",
    unit: "PF",
    status: "Good",
    description: "Współczynnik mocy optymalny.",
    tooltip: "Pokazuje stosunek mocy czynnej do pozornej. Wartość bliska 1.0 oznacza efektywne wykorzystanie energii.",
    icon: <span>📉</span>,
  },
  {
    id: 10,
    name: "Czujnik obciążenia",
    value: "75",
    unit: "%",
    status: "Warning",
    description: "Wysokie obciążenie sieci.",
    tooltip: "Monitoruje procentowe obciążenie systemu. Wartości powyżej 80% mogą wymagać uwagi.",
    icon: <span>⚖️</span>,
  }
];

const SensorsPanel = () => {
  const { t } = useTranslation();
  const { hiddenItems, hideItem, restoreItems } = useHiddenItems('hidden-sensors');
  const [sensors] = useState(initialSensors);

  const visibleSensors = sensors.filter(sensor => !hiddenItems.includes(sensor.id.toString()));

  return (
    <div>
      {hiddenItems.length > 0 && (
        <div className="mb-4">
          <Button variant="outline" onClick={restoreItems}>
            Przywróć ukryte czujniki ({hiddenItems.length})
          </Button>
        </div>
      )}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleSensors.map(sensor => (
          <SensorCard
            key={sensor.id}
            icon={sensor.icon}
            name={sensor.name}
            value={sensor.value}
            unit={sensor.unit}
            status={sensor.status as "Good" | "Warning"}
            description={sensor.description}
            tooltip={sensor.tooltip}
            onHide={() => hideItem(sensor.id.toString())}
          />
        ))}
      </div>
    </div>
  );
};

export default SensorsPanel;