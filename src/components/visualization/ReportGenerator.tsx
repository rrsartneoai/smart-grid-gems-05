
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

interface ReportGeneratorProps {
  data: any[];
  fileName: string;
  children: React.ReactNode;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ data, fileName, children }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const generatePNG = async () => {
    try {
      if (!chartRef.current || !document.body.contains(chartRef.current)) {
        throw new Error('Chart element not found or not mounted in DOM');
      }

      const element = chartRef.current;
      
      // Force element to have minimum height if it's zero
      const originalStyle = element.getAttribute('style') || '';
      element.setAttribute('style', `${originalStyle}; min-height: 400px !important; display: block !important;`);
      
      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Force minimum height on cloned element too
          const clonedElement = clonedDoc.getElementById(chartRef.current?.id || 'chart');
          if (clonedElement) {
            clonedElement.style.minHeight = '400px';
            clonedElement.style.display = 'block';
          }
          return Promise.resolve();
        }
      });

      // Restore original style
      element.setAttribute('style', originalStyle);

      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate PNG:', error);
      alert('Failed to generate PNG. Please try again.');
    }
  };

  const generatePDF = async () => {
    try {
      if (!chartRef.current || !document.body.contains(chartRef.current)) {
        throw new Error('Chart element not found or not mounted in DOM');
      }

      const element = chartRef.current;
      
      // Force element to have minimum height if it's zero
      const originalStyle = element.getAttribute('style') || '';
      element.setAttribute('style', `${originalStyle}; min-height: 400px !important; display: block !important;`);
      
      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Force minimum height on cloned element too
          const clonedElement = clonedDoc.getElementById(chartRef.current?.id || 'chart');
          if (clonedElement) {
            clonedElement.style.minHeight = '400px';
            clonedElement.style.display = 'block';
          }
          return Promise.resolve();
        }
      });

      // A4 dimensions in mm
      const pageWidth = 210;
      const pageHeight = 297;

      // Calculate dimensions while maintaining aspect ratio
      let imgWidth = pageWidth - 20; // 10mm margins on each side
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If height exceeds page height, scale down proportionally
      if (imgHeight > pageHeight - 20) {
        imgHeight = pageHeight - 20;
        imgWidth = (canvas.width * imgHeight) / canvas.height;
      }

      // Center the image on the page
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      const doc = new jsPDF({
        orientation: imgWidth > imgHeight ? 'l' : 'p',
        unit: 'mm',
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      doc.save(`${fileName}.pdf`);
      
      // Restore original style
      element.setAttribute('style', originalStyle);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const generateCSV = () => {
    try {
      const processRow = (row: any) => {
        if (Array.isArray(row)) {
          return row.join(',');
        } else if (typeof row === 'object' && row !== null) {
          return Object.values(row).join(',');
        }
        return String(row);
      };

      const csvContent = data.map(processRow).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate CSV:', error);
      alert('Failed to generate CSV. Please try again.');
    }
  };

  const generateXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div>
      <div ref={chartRef} id="chart" style={{ minHeight: '400px' }}>
        {children}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Pobierz raport</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={generatePNG}>Pobierz PNG</DropdownMenuItem>
          <DropdownMenuItem onClick={generatePDF}>Pobierz PDF</DropdownMenuItem>
          <DropdownMenuItem onClick={generateCSV}>Pobierz CSV</DropdownMenuItem>
          <DropdownMenuItem onClick={generateXLSX}>Pobierz XLSX</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ReportGenerator;
