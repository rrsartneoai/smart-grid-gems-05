import { FloatingChatbot } from "../FloatingChatbot";
import { Card } from "@/components/ui/card";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { ChartCard } from "./ChartCard";
import { useHiddenItems } from "@/hooks/useHiddenItems";
import { RestoreButton } from "@/components/ui/restore-button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { EnergyTrendsChart } from './charts/EnergyTrendsChart';
import { EfficiencyChart } from './charts/EfficiencyChart';
import { EnergySourcesChart } from './charts/EnergySourcesChart';
import { CorrelationChart } from './charts/CorrelationChart';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { UploadOptions } from "./UploadOptions";
import { ExportButtons } from "./ExportButtons";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const calculateForecast = (data: any[]) => {
  if (!data || data.length === 0) return [];
  
  return data.map((item, index) => ({
    name: `Forecast ${index + 1}`,
    consumption: item.consumption * 1.1,
    production: item.production * 1.15,
    efficiency: Math.min(item.efficiency * 1.05, 100),
  }));
};

export function CompanyAnalysis() {
  const { toast } = useToast();
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    if (!selectedCompany) {
      toast({
        title: "Brak wybranej firmy",
        description: "Wybierz firmę z menu bocznego, aby zobaczyć analizę.",
        variant: "destructive"
      });
    }
  }, [selectedCompany, toast]);

  const handleExport = async (format: 'pdf' | 'jpg' | 'xlsx' | 'csv') => {
    try {
      const element = document.getElementById('company-analysis');
      if (!element) {
        throw new Error('Export element not found');
      }

      if (format === 'pdf' || format === 'jpg') {
        const canvas = await html2canvas(element, {
          useCORS: true,
          allowTaint: true,
          logging: false,
          scale: 2
        });
        
        if (format === 'jpg') {
          const link = document.createElement('a');
          link.download = `company-analysis-${Date.now()}.jpg`;
          link.href = canvas.toDataURL('image/jpeg', 1.0);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          const imgData = canvas.toDataURL('image/png', 1.0);
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm'
          });
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`company-analysis-${Date.now()}.pdf`);
        }
      } else {
        const data = selectedCompany?.energyData || [];
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Analysis Data");
        
        if (format === 'csv') {
          XLSX.writeFile(wb, `company-analysis-${Date.now()}.csv`);
        } else {
          XLSX.writeFile(wb, `company-analysis-${Date.now()}.xlsx`);
        }
      }

      toast({
        title: "Export completed",
        description: `File exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "An error occurred during export. Please try again.",
        variant: "destructive",
      });
    }
  };

  const { hiddenItems, hideItem, restoreItems, isHidden } = useHiddenItems('hidden-analysis-charts');

  if (!selectedCompanyId) {
    return (
      <Card className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Brak wybranej firmy</AlertTitle>
          <AlertDescription>
            Wybierz firmę z menu bocznego, aby zobaczyć analizę danych.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!selectedCompany?.energyData) {
    return (
      <Card className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Brak danych</AlertTitle>
          <AlertDescription>
            Nie znaleziono danych dla wybranej firmy. Sprawdź połączenie z bazą danych.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  const charts = [
    {
      id: 'energy-trends',
      title: 'Trendy zużycia energii',
      component: (
        <EnergyTrendsChart 
          data={showForecast ? 
            [...selectedCompany.energyData, ...calculateForecast(selectedCompany.energyData)] : 
            selectedCompany.energyData
          }
        />
      )
    },
    {
      id: 'efficiency-analysis',
      title: 'Analiza wydajności',
      component: (
        <EfficiencyChart 
          data={showForecast ? 
            [...selectedCompany.energyData, ...calculateForecast(selectedCompany.energyData)] : 
            selectedCompany.energyData
          }
        />
      )
    },
    {
      id: 'energy-sources',
      title: 'Źródła energii',
      component: <EnergySourcesChart />
    },
    {
      id: 'correlation-analysis',
      title: 'Analiza korelacji',
      component: (
        <CorrelationChart 
          data={showForecast ? 
            [...selectedCompany.energyData, ...calculateForecast(selectedCompany.energyData)] : 
            selectedCompany.energyData
          }
        />
      )
    },
  ];

  const visibleCharts = charts.filter(chart => !isHidden(chart.id));

  return (
    <div className="relative">
      <div className="grid gap-6" id="company-analysis">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-2xl font-bold">
            Analiza - {selectedCompany?.name}
          </h2>
          <div className="flex gap-2">
            <RestoreButton
              onClick={restoreItems}
              hiddenCount={charts.length - visibleCharts.length}
            />
            <ExportButtons 
              onExport={handleExport}
              onGenerateForecast={() => setShowForecast(true)}
              showForecast={showForecast}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {visibleCharts.map(chart => (
            <ChartCard
              key={chart.id}
              title={chart.title}
              onHide={() => hideItem(chart.id)}
            >
              {chart.component}
            </ChartCard>
          ))}
        </div>

        <UploadOptions />
      </div>
      <FloatingChatbot />
    </div>
  );
}
