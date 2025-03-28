export interface SensorReading {
  timestamp: Date;
  value: number;
  sensorId: string;
  status: 'Good' | 'Fair' | 'Poor' | 'Unknown';
  metric: string;
}

export interface SensorData {
  id: string;
  name: string;
  lastSynced: Date;
  signalStrength: number;
  readings: {
    Temp?: SensorReading[];
    CO2?: SensorReading[];
    VOC?: SensorReading[];
    'PM2.5'?: SensorReading[];
    PM10?: SensorReading[];
    PM1?: SensorReading[];
    Humidity?: SensorReading[];
    Pressure?: SensorReading[];
    Noise?: SensorReading[];
    Light?: SensorReading[];
    VirusRisk?: SensorReading[];
  };
}

export type TimeRange = '12hours' | '48hours' | 'week' | 'month' | 'year' | 'custom';

export interface SensorDisplayInfo {
  name: string;
  icon: React.ReactNode;
  unit: string;
  color: string;
}
