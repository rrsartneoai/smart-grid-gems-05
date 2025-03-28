
import { processImageFile, processPdfFile, processDocxFile, processCsvFile, processTextFile } from "@/utils/fileProcessing";
import { processDocumentForRAG } from "@/utils/rag";

export interface UploadingFile {
   file: File;
   progress: number;
   status: 'uploading' | 'completed' | 'error';
   preview?: string;
   speed?: string;
   error?: string;
}

/**
 * Process a file based on its type
 */
export async function processFile(file: File): Promise<string> {
  if (file.type.startsWith("image/")) {
    return await processImageFile(file);
  } else if (file.type === "application/pdf") {
    return await processPdfFile(file);
  } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    return await processDocxFile(file);
  } else if (file.type === "text/csv" || file.name.toLowerCase().endsWith('.csv')) {
    return await processCsvFile(file);
  } else if (file.type === "text/plain" || file.name.toLowerCase().endsWith('.txt')) {
    return await processTextFile(file);
  } else if (file.type === "application/xml" || file.name.toLowerCase().endsWith('.xml')) {
    return await processTextFile(file);
  } else {
    throw new Error("Nieobsługiwany format pliku");
  }
}

/**
 * Calculate upload speed
 */
export function calculateSpeed(bytesUploaded: number, startTime: number, formatFileSize: (bytes: number) => string): string {
  const elapsedSeconds = (Date.now() - startTime) / 1000;
  const bytesPerSecond = bytesUploaded / elapsedSeconds;
  return `${formatFileSize(bytesPerSecond)}/s`;
}

/**
 * Validate a file against size and type constraints
 */
export function validateFile(
  file: File,
  maxFileSize: number,
  maxTotalSize: number,
  currentTotalSize: number,
  allowedFileTypes: Record<string, string[]>,
  formatFileSize: (bytes: number) => string
): string | null {
  if (file.size > maxFileSize) {
    return `Plik jest za duży. Maksymalny rozmiar to ${formatFileSize(maxFileSize)}`;
  }

  if (currentTotalSize + file.size > maxTotalSize) {
    return `Przekroczono łączny limit rozmiaru plików (${formatFileSize(maxTotalSize)})`;
  }

  const isValidType = Object.entries(allowedFileTypes).some(([type, extensions]) => {
    if (type.includes('*')) {
      const baseType = type.split('/')[0];
      return file.type.startsWith(baseType);
    }
    return type === file.type || extensions.some(ext => file.name.toLowerCase().endsWith(ext));
  });

  if (!isValidType) {
    return "Nieobsługiwany format pliku";
  }

  return null;
}

/**
 * Extract RAG-related topics from file content
 */
export async function extractTopicsFromContent(text: string): Promise<string[]> {
  try {
    const result = await processDocumentForRAG(text);
    return result?.topics || [];
  } catch (error) {
    console.error("Error extracting topics:", error);
    return [];
  }
}

/**
 * Detect and remove BOM (Byte Order Mark) from file content
 */
export function removeBOM(content: string): string {
  if (content.charCodeAt(0) === 0xFEFF) {
    return content.slice(1);
  }
  return content;
}
