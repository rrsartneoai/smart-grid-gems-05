
/**
 * Parses a timestamp string that may have various formats or separators
 * Returns a valid Date object or null if parsing fails
 */
export const parseTimestamp = (timestampStr: string): Date | null => {
  if (!timestampStr || typeof timestampStr !== 'string') {
    return null;
  }

  try {
    // Handle semicolon-separated format (timestamp is before first semicolon)
    if (timestampStr.includes(';')) {
      const parts = timestampStr.split(';');
      const dateTimeStr = parts[0]?.trim();
      
      if (!dateTimeStr) {
        return null;
      }
      
      // Try to parse as ISO string
      const date = new Date(dateTimeStr);
      
      // Check if date is valid (not Invalid Date)
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    
    // Clean up the timestamp string
    const cleaned = timestampStr.trim()
      .replace(/\s+/g, ' ')  // Normalize spaces
      .replace(/,/g, '.');   // Replace commas with dots in decimal numbers
    
    // Try different common formats
    // 1. Try direct ISO parsing (YYYY-MM-DDTHH:MM:SS)
    const directDate = new Date(cleaned);
    if (!isNaN(directDate.getTime())) {
      return directDate;
    }
    
    // 2. Handle European format (DD.MM.YYYY HH:MM:SS)
    const europeanRegex = /(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{2,4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/;
    const europeanMatch = cleaned.match(europeanRegex);
    
    if (europeanMatch) {
      const [_, day, month, year, hours = '0', minutes = '0', seconds = '0'] = europeanMatch;
      const fullYear = year.length === 2 ? '20' + year : year;
      const dateStr = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
      const parsedDate = new Date(dateStr);
      
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
    
    // 3. Handle US format (MM/DD/YYYY HH:MM:SS)
    const usRegex = /(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{2,4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/;
    const usMatch = cleaned.match(usRegex);
    
    if (usMatch) {
      const [_, month, day, year, hours = '0', minutes = '0', seconds = '0'] = usMatch;
      const fullYear = year.length === 2 ? '20' + year : year;
      const dateStr = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
      const parsedDate = new Date(dateStr);
      
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
    
    // 4. Handle ISO format with space instead of T (YYYY-MM-DD HH:MM:SS)
    const isoSpaceRegex = /(\d{4})[\/\.\-](\d{1,2})[\/\.\-](\d{1,2})\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/;
    const isoSpaceMatch = cleaned.match(isoSpaceRegex);
    
    if (isoSpaceMatch) {
      const [_, year, month, day, hours, minutes, seconds = '0'] = isoSpaceMatch;
      const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
      const parsedDate = new Date(dateStr);
      
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
    
    // 5. Handle just date without time (YYYY-MM-DD)
    const dateOnlyRegex = /^(\d{4})[\/\.\-](\d{1,2})[\/\.\-](\d{1,2})$/;
    const dateOnlyMatch = cleaned.match(dateOnlyRegex);
    
    if (dateOnlyMatch) {
      const [_, year, month, day] = dateOnlyMatch;
      const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`;
      const parsedDate = new Date(dateStr);
      
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
    
    // 6. Try to handle Unix timestamp (seconds or milliseconds since epoch)
    const unixRegex = /^\d{10,13}$/;
    if (unixRegex.test(cleaned)) {
      const timestamp = parseInt(cleaned);
      // If it's in seconds (10 digits), convert to ms
      const timestampMs = cleaned.length === 10 ? timestamp * 1000 : timestamp;
      const parsedDate = new Date(timestampMs);
      
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
    
    // Log failure for debugging
    console.debug(`Failed to parse timestamp: ${timestampStr} (cleaned: ${cleaned})`);
    return null;
  } catch (error) {
    console.debug(`Error parsing timestamp: ${timestampStr}`, error);
    return null;
  }
};

/**
 * Safely parses CSV or semicolon-separated data with timestamps
 * Returns an object with parsed values or null values for invalid entries
 */
export const parseDataWithTimestamp = (dataLine: string): Record<string, any> | null => {
  if (!dataLine) return null;
  
  const parts = dataLine.split(';');
  if (parts.length < 1) return null;
  
  const timestamp = parseTimestamp(parts[0]);
  
  if (!timestamp) {
    return null;
  }
  
  // Parse the remaining values as numbers when possible
  const values = parts.slice(1).map(val => {
    const trimmed = val.trim();
    return trimmed === '' ? null : isNaN(Number(trimmed)) ? trimmed : Number(trimmed);
  });
  
  return {
    timestamp,
    values
  };
};

/**
 * Validates if a timestamp string can be parsed into a valid Date
 */
export const isValidTimestamp = (timestampStr: string): boolean => {
  return parseTimestamp(timestampStr) !== null;
};
