import { motion, useScroll, useTransform } from "framer-motion";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { PowerStats } from "@/components/dashboard/PowerStats";
import { FileUpload } from "@/components/FileUpload";
import { CompanySidebar } from "@/components/CompanySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CompanyAnalysis } from "@/components/analysis/CompanyAnalysis";
import { IoTStatus } from "@/components/status/IoTStatus";
import SensorsPanel from "@/components/sensors/SensorsPanel";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useRef } from "react";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { Chatbot } from "@/components/Chatbot";
import { useHotkeys } from "react-hotkeys-hook";
import { useToast } from "@/hooks/use-toast";
import EnergyMap from "@/components/map/EnergyMap";
import { DeviceStatus } from "@/components/network/DeviceStatus";
import { NetworkMap } from "@/components/network/NetworkMap";
import { FailureAnalysis } from "@/components/network/FailureAnalysis";
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IntegrationsPanel } from "@/components/integrations/IntegrationsPanel";
import { ExperimentsPanel } from "@/components/experiments/ExperimentsPanel";
import { KnowledgePanel } from "@/components/knowledge/KnowledgePanel";
import { PageHeader } from "@/components/header/PageHeader";
import '../i18n/config';

// Add Montserrat font to all map containers
const mapStyle = document.createElement('style');
mapStyle.textContent = `
  .leaflet-container {
    font-family: 'Montserrat', sans-serif !important;
  }
`;
document.head.appendChild(mapStyle);

const Index = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const spacesRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const headerTranslateY = useTransform(scrollY, [0, 100], [0, -100]);

  const handleExport = async (format: 'pdf' | 'jpg') => {
    if (!spacesRef.current) return;

    try {
      const canvas = await html2canvas(spacesRef.current);
      
      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('przestrzenie-export.pdf');
        
        toast({
          title: "Eksport zakończony",
          description: "Plik PDF został pobrany",
        });
      } else {
        const link = document.createElement('a');
        link.download = 'przestrzenie-export.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
        
        toast({
          title: "Eksport zakończony",
          description: "Plik JPG został pobrany",
        });
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować sekcji",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useHotkeys("?", () => {
    toast({
      title: t("availableShortcuts", "Available keyboard shortcuts"),
      description: "Ctrl+K: Search\nCtrl+/: Help\nCtrl+B: Side menu",
    });
  });

  useHotkeys("ctrl+k", (e) => {
    e.preventDefault();
    toast({
      title: t("search", "Search"),
      description: t("searchComingSoon", "Search functionality coming soon"),
    });
  });

  return (
    <div className="min-h-screen bg-background">
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        style={{
          opacity: headerOpacity,
          y: headerTranslateY
        }}
      >
        <PageHeader />
      </motion.div>
      
      <div className="pt-28">
        <SidebarProvider>
          <div className="min-h-screen flex w-full flex-col lg:flex-row">
            <CompanySidebar />
            <main className="flex-1 p-4 lg:pl-[320px] transition-all duration-300">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-6"
              >
                <Tabs defaultValue="spaces" className="w-full">
                  <TabsList className="w-full justify-start overflow-x-auto flex-wrap">
                    <TabsTrigger value="spaces">{t('spaces')}</TabsTrigger>
                    <TabsTrigger value="insights">{t('analysis')}</TabsTrigger>
                    <TabsTrigger value="status">{t('status')}</TabsTrigger>
                    <TabsTrigger value="sensors">{t('sensors')}</TabsTrigger>
                    <TabsTrigger value="integrations">Integracje</TabsTrigger>
                    <TabsTrigger value="experiments">Eksperymenty</TabsTrigger>
                    <TabsTrigger value="knowledge">Kompendium</TabsTrigger>
                  </TabsList>

                  <TabsContent value="spaces" className="space-y-6">
                    <div className="flex justify-end gap-2 mb-4">
                      <Button
                        variant="outline"
                        onClick={() => handleExport('jpg')}
                      >
                        Eksportuj do JPG
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleExport('pdf')}
                      >
                        Eksportuj do PDF
                      </Button>
                    </div>
                    <div ref={spacesRef}>

<DndContext collisionDetection={closestCenter}>
  <SortableContext items={[]} strategy={rectSortingStrategy}>
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
      <PowerStats />
    </div>
  </SortableContext>
</DndContext>

                      <div className="grid gap-6 p-8">
                        <EnergyChart />
                      </div>

                      <div className="grid gap-6 p-8">
                        <DeviceStatus />
                      </div>

                      <div className="grid gap-6 p-8">
                        <NetworkMap />
                      </div>

                      <div className="grid gap-6 p-8">
                        <FailureAnalysis />
                      </div>

                      <div className="grid gap-6 p-8">
                        <EnergyMap />
                      </div>

                      <div className="mt-8 grid gap-8 md:grid-cols-2">
                        <div className="w-full">
                          <h2 className="text-2xl font-bold mb-4">{t('Wgraj pliki')}</h2>
                          <FileUpload />
                        </div>
                        <div className="w-full">
                          <h2 className="text-2xl font-bold mb-4">{t('Asystent AI')}</h2>
                          <Chatbot />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="insights">
                    <CompanyAnalysis />
                  </TabsContent>

                  <TabsContent value="status">
                    <IoTStatus />
                  </TabsContent>

                  <TabsContent value="sensors">
                    <SensorsPanel />
                  </TabsContent>

                  <TabsContent value="integrations">
                    <IntegrationsPanel />
                  </TabsContent>

                  <TabsContent value="experiments">
                    <ExperimentsPanel />
                  </TabsContent>

                  <TabsContent value="knowledge">
                    <KnowledgePanel />
                  </TabsContent>
                </Tabs>
              </motion.div>
            </main>
          </div>
        </SidebarProvider>
        <FloatingChatbot />
      </div>
    </div>
  );
};

export default Index;
