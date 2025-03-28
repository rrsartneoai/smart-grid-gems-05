
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { processFile, calculateSpeed, validateFile, extractTopicsFromContent, UploadingFile } from "./FileProcessingService";

// Constants for file validation
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_TOTAL_SIZE = 200 * 1024 * 1024; // 200MB
export const ALLOWED_FILE_TYPES = {
  'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'],
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/csv': ['.csv'],
  'application/xml': ['.xml'],
  'audio/*': ['.mp3', '.wav'],
  'video/*': ['.mp4', '.mov']
};

export function useFileUpload() {
  const { toast } = useToast();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [showApiKeyWarning, setShowApiKeyWarning] = useState<boolean>(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const handleFileUpload = async (file: File) => {
    const startTime = Date.now();
    let preview = undefined;

    const currentTotalSize = uploadingFiles.reduce((acc, f) => acc + f.file.size, 0);
    const validationError = validateFile(file, MAX_FILE_SIZE, MAX_TOTAL_SIZE, currentTotalSize, ALLOWED_FILE_TYPES, formatFileSize);
    
    if (validationError) {
      toast({
        variant: "destructive",
        title: "Błąd walidacji",
        description: validationError,
      });
      return;
    }

    if (file.type.startsWith("image/")) {
      preview = URL.createObjectURL(file);
    }

    const newFile: UploadingFile = {
      file,
      progress: 0,
      status: 'uploading',
      preview,
    };

    setUploadingFiles(prev => [...prev, newFile]);

    try {
      let text = "";
      const progressInterval = setInterval(() => {
        setUploadingFiles(prev => prev.map(f => {
          if (f.file === file && f.progress < 100) {
            const newProgress = Math.min(f.progress + 10, 100);
            return {
              ...f,
              progress: newProgress,
              speed: calculateSpeed((newProgress / 100) * file.size, startTime, formatFileSize),
            };
          }
          return f;
        }));
      }, 200);

      text = await processFile(file);
      const extractedTopics = await extractTopicsFromContent(text);
      
      if(extractedTopics.length > 0) {
        setTopics(extractedTopics);
        if (extractedTopics.some(topic => topic.includes("Błąd") || topic.includes("błąd"))) {
          setShowApiKeyWarning(true);
        }
      }

      clearInterval(progressInterval);

      setUploadingFiles(prev => prev.map(f =>
        f.file === file ? { ...f, progress: 100, status: 'completed' } : f
      ));

      toast({
        title: "Sukces",
        description: `Przetworzono plik: ${file.name}`,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      setUploadingFiles(prev => prev.map(f =>
        f.file === file ? { 
          ...f, 
          status: 'error',
          error: error instanceof Error ? error.message : "Nieznany błąd" 
        } : f
      ));

      const errorMessage = error instanceof Error ? error.message : "Nieznany błąd";
      if (
        errorMessage.includes("API") || 
        errorMessage.includes("api") || 
        errorMessage.includes("klucz") || 
        errorMessage.includes("Gemini")
      ) {
        setShowApiKeyWarning(true);
        toast({
          variant: "destructive",
          title: "Błąd API",
          description: "Problem z kluczem API Gemini. Sprawdź konfigurację.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Błąd",
          description: `Błąd podczas przetwarzania pliku: ${file.name}`,
        });
      }
    }
  };

  const handleCancelUpload = (file: File) => {
    setUploadingFiles(prev => prev.filter(f => f.file !== file));
    toast({
      description: `Anulowano wgrywanie pliku: ${file.name}`,
    });
  };

  const handleFilesAccepted = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      await handleFileUpload(file);
    }
  }, []);

  return {
    uploadingFiles,
    topics,
    showApiKeyWarning,
    setShowApiKeyWarning,
    handleFilesAccepted,
    handleCancelUpload,
    formatFileSize,
    MAX_FILE_SIZE,
    MAX_TOTAL_SIZE,
    ALLOWED_FILE_TYPES
  };
}
