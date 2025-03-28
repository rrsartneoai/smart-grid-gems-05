
import React from 'react';
import { Button } from '../ui/button';
import { Plus, Settings, Trash2, Download, RefreshCw } from 'lucide-react';
import { TimeRange } from './types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { generatePDF, generatePNG, generateCSV, generateXLSX } from '@/utils/reportUtils';
import { useToast } from '@/hooks/use-toast';

interface VisualizationHeaderProps {
  onFileUpload: (files: File[]) => void;
  onTimeRangeChange: (range: TimeRange) => void;
  selectedTimeRange: TimeRange;
  onRefresh: () => void;
  onDeleteData: () => void;
  onDownloadReport: () => void;
  hasSensorData: boolean;
}

export const VisualizationHeader: React.FC<VisualizationHeaderProps> = ({
  onFileUpload,
  onTimeRangeChange,
  selectedTimeRange,
  onRefresh,
  onDeleteData,
  onDownloadReport,
  hasSensorData
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(Array.from(e.target.files));
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = (format: 'pdf' | 'png' | 'csv' | 'xlsx') => {
    if (!hasSensorData) {
      toast({
        title: "Brak danych",
        description: "Wczytaj dane czujników, aby wygenerować raport",
        variant: "destructive"
      });
      return;
    }

    const sensorContentElement = 'sensor-visualization-content';
    
    switch (format) {
      case 'pdf':
        generatePDF(sensorContentElement, 'sensor_report');
        break;
      case 'png':
        generatePNG(sensorContentElement, 'sensor_report');
        break;
      case 'csv':
        // For CSV and XLSX we should pass the data through the onDownloadReport callback
        onDownloadReport();
        break;
      case 'xlsx':
        // For CSV and XLSX we should pass the data through the onDownloadReport callback
        onDownloadReport();
        break;
    }
  };

  const timeRanges: {label: string, value: TimeRange}[] = [
    { label: '12 godzin', value: '12hours' },
    { label: '48 godzin', value: '48hours' },
    { label: 'Tydzień', value: 'week' },
    { label: 'Miesiąc', value: 'month' },
    { label: 'Rok', value: 'year' },
    { label: 'Dostosuj', value: 'custom' },
  ];

  return (
    <div className="w-full bg-card rounded-lg px-4 py-3 shadow-sm mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <h2 className="text-xl font-semibold text-primary">Wizualizacja</h2>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAddFileClick}
            className="flex items-center gap-1"
            title="Dodaj nowy plik CSV"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Dodaj plik</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            title="Ustawienia"
          >
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={onDeleteData}
            disabled={!hasSensorData}
            title="Usuń bieżący raport"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={!hasSensorData}
                title="Pobierz raport"
              >
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                Pobierz PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('png')}>
                Pobierz PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('csv')}>
                Pobierz CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('xlsx')}>
                Pobierz Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedTimeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeRangeChange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={!hasSensorData}
          title="Odśwież dane"
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">Odśwież</span>
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".csv"
        multiple
        onChange={handleFileInputChange}
      />
    </div>
  );
};
