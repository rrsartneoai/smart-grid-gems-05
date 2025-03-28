
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Upload, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onFilesAccepted: (files: File[]) => void;
  maxFileSize: number;
  maxTotalSize: number;
  allowedFileTypes: Record<string, string[]>;
}

export function UploadZone({ 
  onFilesAccepted, 
  maxFileSize, 
  maxTotalSize, 
  allowedFileTypes 
}: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [showApiKeyWarning, setShowApiKeyWarning] = useState(!import.meta.env.VITE_GOOGLE_API_KEY);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onFilesAccepted,
    maxFiles: 5,
    maxSize: maxFileSize,
    accept: allowedFileTypes,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <div className="space-y-4">
      {showApiKeyWarning && (
        <Alert variant="destructive" className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Uwaga: Klucz API Gemini</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Używasz domyślnego klucza API Gemini, który może mieć ograniczenia.
            Zalecane jest dodanie własnego klucza API poprzez zmienną środowiskową VITE_GOOGLE_API_KEY.
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-yellow-800 border-yellow-400 hover:bg-yellow-100"
              onClick={() => setShowApiKeyWarning(false)}
            >
              Rozumiem
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card
        {...getRootProps()}
        className={`p-6 border-2 border-dashed cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <AnimatePresence>
            {isDragActive ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col items-center gap-2"
              >
                <Upload className="h-12 w-12 text-primary" />
                <p className="text-sm text-primary">Upuść pliki tutaj...</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center">
                    <Upload className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Przeciągnij i upuść pliki lub kliknij, aby wybrać
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Obsługiwane formaty: PDF, DOCX, TXT, CSV, XML, obrazy, audio, wideo
                  (max {formatFileSize(maxFileSize)} na plik)
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
