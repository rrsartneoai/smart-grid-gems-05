
// Utility functions for sensor data display

export const getSensorColor = (sensorType: string): string => {
  switch (sensorType) {
    case 'Temp':
      return '#FF5722';  // Orange-red
    case 'CO2':
      return '#4CAF50';  // Green
    case 'VOC':
      return '#9C27B0';  // Purple
    case 'PM2.5':
      return '#F44336';  // Red
    case 'PM1':
      return '#E91E63';  // Pink
    case 'PM10':
      return '#FF9800';  // Orange
    case 'Humidity':
      return '#2196F3';  // Blue
    case 'Pressure':
      return '#607D8B';  // Blue-gray
    case 'Noise':
      return '#795548';  // Brown
    case 'Light':
      return '#FFC107';  // Amber
    case 'VirusRisk':
      return '#9E9E9E';  // Gray
    default:
      return '#8884d8';  // Default purple
  }
};

export const getSensorUnit = (sensorType: string): string => {
  switch (sensorType) {
    case 'Temp':
      return '°C';
    case 'CO2':
      return 'ppm';
    case 'VOC':
      return 'ppb';
    case 'PM2.5':
    case 'PM1':
    case 'PM10':
      return 'µg/m³';
    case 'Humidity':
      return '%';
    case 'Pressure':
      return 'hPa';
    case 'Noise':
      return 'dB';
    case 'Light':
      return 'lux';
    case 'VirusRisk':
      return '%';
    default:
      return '';
  }
};

export const getSensorStatus = (value: number, sensorType: string): 'Good' | 'Fair' | 'Poor' | 'Unknown' => {
  // This function should match the logic in csvParser.ts
  switch(sensorType) {
    case 'Temp':
      return value > 30 ? 'Poor' : value > 25 ? 'Fair' : 'Good';
    case 'CO2':
      return value > 1000 ? 'Poor' : value > 700 ? 'Fair' : 'Good';
    case 'VOC':
      return value > 300 ? 'Poor' : value > 150 ? 'Fair' : 'Good';
    case 'PM2.5':
      return value > 25 ? 'Poor' : value > 10 ? 'Fair' : 'Good';
    case 'PM10':
      return value > 50 ? 'Poor' : value > 20 ? 'Fair' : 'Good';
    case 'Humidity':
      return value > 70 || value < 30 ? 'Poor' : value > 60 || value < 40 ? 'Fair' : 'Good';
    default:
      return 'Unknown';
  }
};
