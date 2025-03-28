
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { SensorData } from './types';
import { generatePDF, generateCSV } from '@/utils/reportUtils';

interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sensorData: SensorData[];
  activeSensorTab: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  open,
  onOpenChange,
  sensorData,
  activeSensorTab
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(`Raport - ${activeSensorTab}`);
  const [description, setDescription] = useState('');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) {
      toast.error('Wprowadź tytuł raportu');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Prepare the report data
      const reportData = {
        title,
        description,
        date: new Date().toLocaleDateString(),
        sensorType: activeSensorTab,
        datasets: sensorData.map(dataset => ({
          name: dataset.name,
          readings: dataset.readings[activeSensorTab] || []
        }))
      };
      
      // Generate PDF report
      const filename = `raport-${activeSensorTab.toLowerCase()}-${new Date().toISOString().slice(0, 10)}`;
      
      // Use report generation utilities
      if (includeCharts) {
        await generatePDF('sensor-visualization-content', filename);
      }
      
      if (includeRawData) {
        // Prepare data for CSV export
        const exportData = sensorData.flatMap(sensor => 
          Object.entries(sensor.readings || {})
            .filter(([key]) => key === activeSensorTab)
            .flatMap(([_, readings]) => 
              readings.map(reading => ({
                sensorName: sensor.name,
                sensorType: activeSensorTab,
                timestamp: reading.timestamp,
                value: reading.value,
                status: reading.status
              }))
            )
        );
        
        generateCSV(exportData, filename);
      }
      
      toast.success(t('reportGenerated'));
      onOpenChange(false);
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Błąd podczas generowania raportu');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('generateReport')}</DialogTitle>
          <DialogDescription>
            Utwórz raport porównawczy dla danych sensorów {activeSensorTab}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="report-title" className="text-right">
              {t('reportTitle')}
            </Label>
            <Input
              id="report-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="report-description" className="text-right">
              {t('reportDescription')}
            </Label>
            <Textarea
              id="report-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="text-right">
              <Label>Opcje</Label>
            </div>
            <div className="col-span-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-charts" 
                  checked={includeCharts}
                  onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                />
                <Label htmlFor="include-charts">{t('includeCharts')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-raw-data" 
                  checked={includeRawData}
                  onCheckedChange={(checked) => setIncludeRawData(checked as boolean)}
                />
                <Label htmlFor="include-raw-data">{t('includeRawData')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-summary" 
                  checked={includeSummary}
                  onCheckedChange={(checked) => setIncludeSummary(checked as boolean)}
                />
                <Label htmlFor="include-summary">{t('includeSummary')}</Label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            {t('cancel')}
          </Button>
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generowanie...' : t('generateReport')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
