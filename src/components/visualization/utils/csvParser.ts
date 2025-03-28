
import { parseCSV } from './csvFormatUtils';
import { extractSensorReadings, transformReadingsToSensorData } from './dataTransformUtils';
import { readFileAsText } from './fileReaderUtils';
import { SensorData } from '../types';
import { removeBOM } from '@/components/upload/FileProcessingService';

export { parseCSV, extractSensorReadings };

/**
 * Parses multiple CSV files and returns sensor data for visualization
 */
export async function parseCsvFiles(files: File[]): Promise<SensorData[]> {
  if (!files || files.length === 0) {
    console.warn("No files provided to parseCsvFiles");
    return [];
  }

  try {
    // Process each file
    const results: SensorData[] = [];
    
    for (const file of files) {
      try {
        console.log(`Processing file: ${file.name} (${file.size} bytes, type: ${file.type})`);
        let csvContent = await readFileAsText(file);
        
        // Remove BOM if present
        csvContent = removeBOM(csvContent);
        
        if (csvContent.trim().length === 0) {
          console.warn(`File is empty: ${file.name}`);
          continue;
        }
        
        console.log(`File content preview: ${csvContent.substring(0, 100)}...`);
        
        const parsedData = parseCSV(csvContent);
        
        if (!parsedData || parsedData.length === 0) {
          console.warn(`No data parsed from file: ${file.name}`);
          continue;
        }
        
        console.log(`Parsed ${parsedData.length} rows from ${file.name}`);
        console.log(`Sample parsed data:`, parsedData[0]);
        
        const readings = extractSensorReadings(parsedData);
        
        if (readings.length === 0) {
          console.warn(`No valid readings found in file: ${file.name}`);
          continue;
        }
        
        console.log(`Extracted ${readings.length} readings from ${file.name}`);
        console.log(`Sample reading:`, readings[0]);
        
        const sensorData = transformReadingsToSensorData(readings, file.name);
        
        // Verify we have actual sensor readings
        const hasSensorData = Object.values(sensorData.readings).some(arr => arr.length > 0);
        
        if (hasSensorData) {
          results.push(sensorData);
          console.log(`Successfully processed ${file.name}`);
        } else {
          console.warn(`No sensor data extracted from ${file.name}`);
        }
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        // Continue with other files instead of failing completely
      }
    }
    
    console.log(`Successfully processed ${results.length} out of ${files.length} files`);
    return results;
  } catch (error) {
    console.error('Error parsing CSV files:', error);
    throw error;
  }
}
