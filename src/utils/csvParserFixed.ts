
import { parseTimestamp } from './timestampParser';

/**
 * Parses CSV data with more robust timestamp handling
 */
export const parseCSVWithTimestamps = (csvData: string): Array<Record<string, any>> => {
  if (!csvData) return [];
  
  // Remove BOM if present
  if (csvData.charCodeAt(0) === 0xFEFF) {
    csvData = csvData.slice(1);
  }
  
  const lines = csvData.split('\n').filter(line => line.trim().length > 0);
  
  if (lines.length === 0) {
    console.warn("CSV file contains no data lines");
    return [];
  }
  
  const headers = lines[0]?.split(',').map(h => h.trim()) || [];
  
  if (headers.length === 0) {
    console.warn("CSV file contains no headers");
    return [];
  }
  
  console.log("Detected CSV headers:", headers);
  
  const results: Array<Record<string, any>> = [];
  
  // Start from index 1 to skip headers
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(',').map(v => v.trim());
    
    if (values.length < headers.length / 2) {
      console.debug(`Skipping line ${i+1}: insufficient values`);
      continue;
    }
    
    // Check if first column contains timestamp
    if (values[0] && (headers[0]?.toLowerCase().includes('time') || 
                      headers[0]?.toLowerCase().includes('date') || 
                      headers[0]?.toLowerCase().includes('timestamp'))) {
      const timestamp = parseTimestamp(values[0]);
      
      // Skip rows with invalid timestamps
      if (!timestamp) {
        console.debug(`Skipping row ${i+1} due to invalid timestamp: ${values[0]}`);
        continue;
      }
      
      const row: Record<string, any> = { [headers[0]]: timestamp };
      
      // Add other fields
      for (let j = 1; j < Math.min(headers.length, values.length); j++) {
        const value = values[j];
        row[headers[j]] = value === '' ? null : isNaN(Number(value)) ? value : Number(value);
      }
      
      results.push(row);
    } else {
      // Handle rows without timestamps or with non-standard timestamp fields
      const row: Record<string, any> = {};
      
      // Try to find a potential timestamp field
      let hasTimestamp = false;
      
      for (let j = 0; j < Math.min(headers.length, values.length); j++) {
        const value = values[j];
        
        // Check if this might be a date/time field
        if (!hasTimestamp && 
            (headers[j]?.toLowerCase().includes('time') || 
             headers[j]?.toLowerCase().includes('date'))) {
          const timestamp = parseTimestamp(value);
          if (timestamp) {
            row[headers[j]] = timestamp;
            hasTimestamp = true;
            continue;
          }
        }
        
        row[headers[j]] = value === '' ? null : isNaN(Number(value)) ? value : Number(value);
      }
      
      results.push(row);
    }
  }
  
  console.log(`Parsed ${results.length} data rows from CSV`);
  return results;
};

/**
 * Parses semicolon-separated data with more robust timestamp handling
 */
export const parseSemicolonSeparatedData = (data: string): Array<Record<string, any>> => {
  if (!data) return [];
  
  // Remove BOM if present
  if (data.charCodeAt(0) === 0xFEFF) {
    data = data.slice(1);
  }
  
  const lines = data.split('\n').filter(line => line.trim().length > 0);
  
  if (lines.length === 0) {
    console.warn("CSV file contains no data lines");
    return [];
  }
  
  const headers = lines[0]?.split(';').map(h => h.trim()) || [];
  
  if (headers.length === 0) {
    console.warn("CSV file contains no headers");
    return [];
  }
  
  console.log("Detected semicolon-separated headers:", headers);
  
  const results: Array<Record<string, any>> = [];
  
  // Start from index 1 to skip headers
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(';').map(v => v.trim());
    
    if (values.length < headers.length / 2) {
      console.debug(`Skipping line ${i+1}: insufficient values`);
      continue;
    }
    
    // Check if first column contains timestamp
    if (values[0] && (headers[0]?.toLowerCase().includes('time') || 
                       headers[0]?.toLowerCase().includes('date') || 
                       headers[0]?.toLowerCase().includes('timestamp'))) {
      const timestamp = parseTimestamp(values[0]);
      
      // Skip rows with invalid timestamps but don't log in production
      if (!timestamp) {
        console.debug(`Skipping row ${i+1} due to invalid timestamp: ${values[0]}`);
        continue;
      }
      
      const row: Record<string, any> = { [headers[0]]: timestamp };
      
      // Add other fields
      for (let j = 1; j < Math.min(headers.length, values.length); j++) {
        const value = values[j];
        row[headers[j]] = value === '' ? null : isNaN(Number(value)) ? value : Number(value);
      }
      
      results.push(row);
    } else {
      // Handle rows without timestamps or with non-standard timestamp fields
      const row: Record<string, any> = {};
      
      // Try to find a potential timestamp field
      let hasTimestamp = false;
      
      for (let j = 0; j < Math.min(headers.length, values.length); j++) {
        const value = values[j];
        
        // Check if this might be a date/time field
        if (!hasTimestamp && 
            (headers[j]?.toLowerCase().includes('time') || 
             headers[j]?.toLowerCase().includes('date'))) {
          const timestamp = parseTimestamp(value);
          if (timestamp) {
            row[headers[j]] = timestamp;
            hasTimestamp = true;
            continue;
          }
        }
        
        row[headers[j]] = value === '' ? null : isNaN(Number(value)) ? value : Number(value);
      }
      
      results.push(row);
    }
  }
  
  console.log(`Parsed ${results.length} data rows from semicolon-separated data`);
  return results;
};

/**
 * Detect CSV format (comma vs semicolon) and parse accordingly
 */
export const detectAndParseCSV = (csvContent: string): Array<Record<string, any>> => {
  // Remove BOM if present
  if (csvContent.charCodeAt(0) === 0xFEFF) {
    csvContent = csvContent.slice(1);
  }
  
  // Try to determine the delimiter by checking the first line
  const firstLine = csvContent.split('\n')[0] || '';
  
  // Count occurrences of potential delimiters
  const commaCount = (firstLine.match(/,/g) || []).length;
  const semicolonCount = (firstLine.match(/;/g) || []).length;
  const tabCount = (firstLine.match(/\t/g) || []).length;
  
  console.log(`Detected delimiters - commas: ${commaCount}, semicolons: ${semicolonCount}, tabs: ${tabCount}`);
  
  // Use the most frequent delimiter
  if (semicolonCount > commaCount && semicolonCount > tabCount) {
    console.log("Parsing as semicolon-separated data");
    return parseSemicolonSeparatedData(csvContent);
  } else if (tabCount > commaCount && tabCount > semicolonCount) {
    console.log("Parsing as tab-separated data");
    // Convert tabs to commas and use the regular CSV parser
    const commaData = csvContent.replace(/\t/g, ',');
    return parseCSVWithTimestamps(commaData);
  } else {
    console.log("Parsing as comma-separated data");
    return parseCSVWithTimestamps(csvContent);
  }
};
