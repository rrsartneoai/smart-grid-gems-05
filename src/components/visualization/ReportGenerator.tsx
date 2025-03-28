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

      // Ensure the element is in view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Initial delay to allow for any animations or transitions
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Check dimensions multiple times to ensure chart is fully rendered
      let attempts = 0;
      const maxAttempts = 15; // Increased max attempts
      let elementRect;

      const checkDimensions = () => {
        elementRect = element.getBoundingClientRect();
        const hasValidDimensions = elementRect.width > 100 && elementRect.height > 100; // Minimum size threshold
        const isVisible = elementRect.top >= 0 && elementRect.left >= 0 &&
                         elementRect.bottom <= window.innerHeight && elementRect.right <= window.innerWidth;
        
        // Check if all child elements are rendered and have reasonable dimensions
        const allChildrenRendered = Array.from(element.getElementsByTagName('*'))
          .every(el => {
            const rect = el.getBoundingClientRect();
            // Ensure elements have reasonable dimensions (at least 5x5 pixels)
            return rect.width >= 5 && rect.height >= 5;
          });

        // Additional check for SVG elements which might need special handling
        const svgElements = element.getElementsByTagName('svg');
        const svgRendered = Array.from(svgElements).every(svg => {
          const rect = svg.getBoundingClientRect();
          return rect.width >= 5 && rect.height >= 5;
        });

        return hasValidDimensions && isVisible && allChildrenRendered && svgRendered;
      };

      while (attempts < maxAttempts) {
        if (checkDimensions()) {
          // Element and all children are fully visible and have valid dimensions
          // Add extra delay after successful check to ensure stability
          await new Promise(resolve => setTimeout(resolve, 1000));
          break;
        }
        
        // Force a reflow to trigger any pending layout calculations
        element.offsetHeight;
        
        await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay
        attempts++;
        
        if (attempts === maxAttempts - 1) {
          // Last attempt - try forcing a style update
          element.style.display = 'none';
          element.offsetHeight; // Force reflow
          element.style.display = '';
        }
        
        if (attempts === maxAttempts) {
          console.error('Chart dimensions:', elementRect);
          console.error('Window dimensions:', { 
            width: window.innerWidth, 
            height: window.innerHeight 
          });
          throw new Error(`Chart element not properly rendered after ${maxAttempts} attempts. Dimensions: ${JSON.stringify(elementRect)}`);
        }
      }

      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: true, // Enable logging for debugging
        backgroundColor: '#ffffff',
        allowTaint: true,
        foreignObjectRendering: true, // Better support for external elements
        onclone: (clonedDoc) => {
          // Ensure all images are loaded
          const images = clonedDoc.getElementsByTagName('img');
          const imagePromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });
          });

          // Ensure all SVGs are properly rendered
          const svgs = clonedDoc.getElementsByTagName('svg');
          Array.from(svgs).forEach(svg => {
            // Force SVG to render by accessing its bounding box
            svg.getBBox();
            // Ensure SVG has explicit dimensions
            if (!svg.getAttribute('width')) {
              const rect = svg.getBoundingClientRect();
              svg.setAttribute('width', rect.width.toString());
              svg.setAttribute('height', rect.height.toString());
            }
          });

          return Promise.all(imagePromises);
        }
      });

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

      // Ensure the element is in view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Initial delay to allow for any animations or transitions
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Check dimensions multiple times to ensure chart is fully rendered
      let attempts = 0;
      const maxAttempts = 15; // Increased max attempts
      let elementRect;

      const checkDimensions = () => {
        elementRect = element.getBoundingClientRect();
        const hasValidDimensions = elementRect.width > 100 && elementRect.height > 100; // Minimum size threshold
        const isVisible = elementRect.top >= 0 && elementRect.left >= 0 &&
                         elementRect.bottom <= window.innerHeight && elementRect.right <= window.innerWidth;
        
        // Check if all child elements are rendered and have reasonable dimensions
        const allChildrenRendered = Array.from(element.getElementsByTagName('*'))
          .every(el => {
            const rect = el.getBoundingClientRect();
            // Ensure elements have reasonable dimensions (at least 5x5 pixels)
            return rect.width >= 5 && rect.height >= 5;
          });

        // Additional check for SVG elements which might need special handling
        const svgElements = element.getElementsByTagName('svg');
        const svgRendered = Array.from(svgElements).every(svg => {
          const rect = svg.getBoundingClientRect();
          return rect.width >= 5 && rect.height >= 5;
        });

        return hasValidDimensions && isVisible && allChildrenRendered && svgRendered;
      };

      while (attempts < maxAttempts) {
        if (checkDimensions()) {
          // Element and all children are fully visible and have valid dimensions
          // Add extra delay after successful check to ensure stability
          await new Promise(resolve => setTimeout(resolve, 1000));
          break;
        }
        
        // Force a reflow to trigger any pending layout calculations
        element.offsetHeight;
        
        await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay
        attempts++;
        
        if (attempts === maxAttempts - 1) {
          // Last attempt - try forcing a style update
          element.style.display = 'none';
          element.offsetHeight; // Force reflow
          element.style.display = '';
        }
        
        if (attempts === maxAttempts) {
          console.error('Chart dimensions:', elementRect);
          console.error('Window dimensions:', { 
            width: window.innerWidth, 
            height: window.innerHeight 
          });
          throw new Error(`Chart element not properly rendered after ${maxAttempts} attempts. Dimensions: ${JSON.stringify(elementRect)}`);
        }
      }
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: true, // Enable logging for debugging
        backgroundColor: '#ffffff',
        allowTaint: true,
        foreignObjectRendering: true, // Better support for external elements
        onclone: (clonedDoc) => {
          // Ensure all images are loaded
          const images = clonedDoc.getElementsByTagName('img');
          const imagePromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });
          });

          // Ensure all SVGs are properly rendered
          const svgs = clonedDoc.getElementsByTagName('svg');
          Array.from(svgs).forEach(svg => {
            // Force SVG to render by accessing its bounding box
            svg.getBBox();
            // Ensure SVG has explicit dimensions
            if (!svg.getAttribute('width')) {
              const rect = svg.getBoundingClientRect();
              svg.setAttribute('width', rect.width.toString());
              svg.setAttribute('height', rect.height.toString());
            }
          });

          return Promise.all(imagePromises);
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
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to generate PDF: ${errorMessage}. Please try again.`);
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
      <div ref={chartRef} id="chart">
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