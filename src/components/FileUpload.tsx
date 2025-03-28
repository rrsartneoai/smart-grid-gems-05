
import { HelpCircle } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFileUpload } from "./upload/useFileUpload";
import { UploadZone } from "./upload/UploadZone";
import { FileProgress } from "./upload/FileProgress";
import { FileInfo } from "./upload/FileInfo";
import { AnimatePresence } from "framer-motion";

export function FileUpload() {
  const {
    uploadingFiles,
    topics,
    handleFilesAccepted,
    handleCancelUpload,
    formatFileSize,
    MAX_FILE_SIZE,
    MAX_TOTAL_SIZE,
    ALLOWED_FILE_TYPES
  } = useFileUpload();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Wgraj pliki</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Obsługiwane formaty: PDF, DOCX, TXT, CSV, XML, obrazy, audio, wideo</p>
              <p>Maksymalny rozmiar: {formatFileSize(MAX_FILE_SIZE)} na plik</p>
              <p>Łączny limit: {formatFileSize(MAX_TOTAL_SIZE)}</p>
              <p>Limit plików: 5</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <UploadZone 
        onFilesAccepted={handleFilesAccepted}
        maxFileSize={MAX_FILE_SIZE}
        maxTotalSize={MAX_TOTAL_SIZE}
        allowedFileTypes={ALLOWED_FILE_TYPES}
      />

      <AnimatePresence>
        <FileProgress 
          uploadingFiles={uploadingFiles} 
          onCancelUpload={handleCancelUpload}
          formatFileSize={formatFileSize}
        />
      </AnimatePresence>

      {uploadingFiles.length > 0 && uploadingFiles.some(f => f.status === 'completed') && (
        <>
          {uploadingFiles.filter(f => f.status === 'completed').map(completedFile => (
            <FileInfo
              key={completedFile.file.name}
              file={completedFile.file}
              topics={topics}
            />
          ))}
        </>
      )}
    </div>
  );
}
