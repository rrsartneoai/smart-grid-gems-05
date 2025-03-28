
import { SensorData, SensorReading } from '../types';

/**
 * Extract sensor readings from parsed data
 */
export function extractSensorReadings(parsedData: any[]) {
  if (!parsedData || parsedData.length === 0) {
    console.warn("No data to extract readings from");
    return [];
  }
  
  // Find the timestamp column - it could be named differently
  const sampleRow = parsedData[0];
  const columns = Object.keys(sampleRow);
  
  console.log("Available columns:", columns);
  
  // Try to find the timestamp column
  const timestampColumn = columns.find(col => {
    const colLower = col.toLowerCase();
    return sampleRow[col] instanceof Date || 
           colLower.includes('time') || 
           colLower.includes('date') ||
           colLower.includes('timestamp');
  }) || columns[0];
  
  console.log("Using timestamp column:", timestampColumn);
  
  // Extract readings with robust error handling
  return parsedData.map((row, index) => {
    try {
      let timestamp = row[timestampColumn];
      
      // If the timestamp is not a Date object, try to parse it
      if (timestamp && !(timestamp instanceof Date)) {
        try {
          timestamp = new Date(timestamp);
        } catch (e) {
          console.debug(`Failed to parse timestamp at row ${index + 1}`);
          return null;
        }
      }
      
      // Skip entries with invalid timestamps
      if (!timestamp || !(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
        console.debug(`Invalid timestamp at row ${index + 1}: ${timestamp}`);
        return null;
      }
      
      // Extract numeric values, excluding the timestamp
      const readings = columns
        .filter(col => col !== timestampColumn)
        .reduce((acc, col) => {
          // Only include numeric values or explicitly set to null if missing
          const value = row[col];
          
          // Check if it could be a sensor reading (we want numbers)
          if (value !== undefined && (
              typeof value === 'number' || 
              (typeof value === 'string' && !isNaN(Number(value))) ||
              value === null
          )) {
            // Convert string numbers to actual numbers
            acc[col] = typeof value === 'string' ? Number(value) : value;
          }
          return acc;
        }, {} as Record<string, number | null>);
      
      // Only return readings if we have at least one reading value
      if (Object.keys(readings).length === 0) {
        console.debug(`No numeric readings found in row ${index + 1}`);
        return null;
      }
      
      return {
        timestamp,
        ...readings
      };
    } catch (error) {
      console.warn('Error processing data row:', error);
      return null;
    }
  }).filter(Boolean); // Remove null entries
}

/**
 * Transform extracted readings into sensor data structure
 */
export function transformReadingsToSensorData(readings: any[], fileName: string): SensorData {
  // Initialize readings for all sensor types
  const sensorReadings = {
    'PM2.5': [],
    'CO2': [],
    'HUMIDITY': [],
    'TEMP': [],
    'VOC': [],
    'PRESSURE': [],
    'PM1': [],
    'PM10': [],
    'SOUND_LEVEL_A': [],
    'LIGHT': []
  };

  // Process each reading
  readings.forEach(reading => {
    if (reading.SOUND_LEVEL_A !== undefined) {
      sensorReadings['SOUND_LEVEL_A'].push({
        timestamp: new Date(reading.recorded),
        value: reading.SOUND_LEVEL_A,
        sensorId: 'SOUND_LEVEL_A'
      });
    }
    if (reading.LIGHT !== undefined) {
      sensorReadings['LIGHT'].push({
        timestamp: new Date(reading.recorded),
        value: reading.LIGHT,
        sensorId: 'LIGHT'
      });
    }
  });
  console.log(`Transforming ${readings.length} readings from ${fileName}`);
  
  // Organize readings by sensor type
  const sensorData: Record<string, SensorReading[]> = {};
  
  // Log the first few readings for debugging
  if (readings.length > 0) {
    console.log("Sample reading:", readings[0]);
  }
  
  let sensorKeys = new Set<string>();
  
  readings.forEach(reading => {
    if (!reading) return;
    
    const { timestamp, ...sensorValues } = reading;
    
    Object.entries(sensorValues).forEach(([sensor, value]) => {
      // Skip internal fields or non-sensor values
      if (sensor.startsWith('_') || typeof value === 'object') {
        return;
      }
      
      // Normalize sensor names to handle variations
      const normalizedSensor = normalizeSensorName(sensor);
      sensorKeys.add(normalizedSensor);
      
      if (!sensorReadings[normalizedSensor]) {
        sensorReadings[normalizedSensor] = [];
      }
      
      if (value !== null && !isNaN(Number(value))) {
        sensorReadings[normalizedSensor].push({
          timestamp,
          value: Number(value),
          sensorId: normalizedSensor,
          status: 'Normal'
        });
      }
    });
  });
  
  console.log("Detected sensor types:", Array.from(sensorKeys));
  
  // Create a properly typed SensorData object
  return {
    id: fileName,
    name: fileName.split('.')[0],
    lastSynced: new Date(),
    signalStrength: -60, // Default value
    readings: sensorReadings
  };
}

/**
 * Normalize sensor names to handle variations in naming
 */
function normalizeSensorName(sensorName: string): string {
  // Convert to lowercase for comparison
  const nameLower = sensorName.toLowerCase();
  
  // Temperature variations
  if (nameLower.includes('temp') || nameLower.includes('temperature')) {
    return 'Temp';
  }
  
  // CO2 variations
  if (nameLower.includes('co2') || nameLower === 'carbon dioxide') {
    return 'CO2';
  }
  
  // VOC variations
  if (nameLower.includes('voc') || nameLower.includes('volatile')) {
    return 'VOC';
  }
  
  // PM2.5 variations
  if (nameLower.includes('pm2.5') || nameLower === 'pm2,5' || nameLower === 'pm 2.5') {
    return 'PM2.5';
  }
  
  // PM10 variations
  if (nameLower.includes('pm10') || nameLower === 'pm 10') {
    return 'PM10';
  }
  
  // PM1 variations
  if (nameLower === 'pm1' || nameLower === 'pm 1' || nameLower === 'pm1.0') {
    return 'PM1';
  }
  
  // Humidity variations
  if (nameLower.includes('humid') || nameLower === 'wilgotność') {
    return 'Humidity';
  }

  // Pressure variations
  if (nameLower.includes('pressure') || nameLower.includes('press')) {
    return 'Pressure';
  }

  // Noise variations
  if (nameLower.includes('noise') || nameLower.includes('sound')) {
    return 'Noise';
  }

  // Light variations
  if (nameLower.includes('light') || nameLower.includes('lum')) {
    return 'Light';
  }

  // Virus Risk variations
  if (nameLower.includes('virus') || nameLower.includes('risk')) {
    return 'VirusRisk';
  }
  
  // Default: return the original name with first letter capitalized
  return sensorName.charAt(0).toUpperCase() + sensorName.slice(1);
}
