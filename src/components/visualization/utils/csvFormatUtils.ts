
import { detectAndParseCSV } from '../../../utils/csvParserFixed';

/**
 * Detect CSV format and parse accordingly
 */
export function parseCSV(csvContent: string) {
  // Use enhanced parser that automatically detects format
  return detectAndParseCSV(csvContent);
}
