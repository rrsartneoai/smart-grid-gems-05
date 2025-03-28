
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
  speed?: string;
  error?: string;
}

interface FileProgressProps {
  uploadingFiles: UploadingFile[];
  onCancelUpload: (file: File) => void;
  formatFileSize: (bytes: number) => string;
}

export function FileProgress({ uploadingFiles, onCancelUpload, formatFileSize }: FileProgressProps) {
  if (uploadingFiles.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4"
    >
      {uploadingFiles.map((uploadingFile) => (
        <Card key={uploadingFile.file.name} className="p-4">
          <div className="flex items-start gap-4">
            {uploadingFile.preview ? (
              <img
                src={uploadingFile.preview}
                alt="Preview"
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              <FileText className="w-12 h-12 text-muted-foreground" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate">
                  {uploadingFile.file.name}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onCancelUpload(uploadingFile.file)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(uploadingFile.file.size)}
              </p>
              <div className="mt-2">
                <Progress value={uploadingFile.progress} className="h-2" />
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{uploadingFile.progress}%</span>
                {uploadingFile.speed && uploadingFile.status === 'uploading' && (
                  <span>{uploadingFile.speed}</span>
                )}
              </div>
              {uploadingFile.error && (
                <p className="mt-1 text-xs text-destructive">
                  {uploadingFile.error}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
