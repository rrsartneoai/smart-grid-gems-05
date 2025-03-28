
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { toast } from '@/hooks/use-toast';

/**
 * Generate a PNG from a DOM element
 */
export const generatePNG = async (elementId: string, fileName: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found`);
    }

    // Ensure the element has proper dimensions
    const originalStyle = element.getAttribute('style') || '';
    element.setAttribute('style', `${originalStyle}; min-height: 400px !important; display: block !important;`);
    
    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      allowTaint: true,
      onclone: (clonedDoc) => {
        // Force minimum height on cloned element too
        const clonedElement = clonedDoc.getElementById(elementId);
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

    toast({
      title: "Sukces",
      description: "Raport został wyeksportowany do pliku PNG",
    });
  } catch (error) {
    console.error('Failed to generate PNG:', error);
    toast({
      title: "Błąd",
      description: "Nie udało się wygenerować raportu PNG",
      variant: "destructive"
    });
  }
};

/**
 * Generate a PDF from a DOM element
 */
export const generatePDF = async (elementId: string, fileName: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found`);
    }

    // Ensure the element has proper dimensions
    const originalStyle = element.getAttribute('style') || '';
    element.setAttribute('style', `${originalStyle}; min-height: 400px !important; display: block !important;`);
    
    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      allowTaint: true,
      onclone: (clonedDoc) => {
        // Force minimum height on cloned element too
        const clonedElement = clonedDoc.getElementById(elementId);
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

    toast({
      title: "Sukces",
      description: "Raport został wyeksportowany do pliku PDF",
    });
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    toast({
      title: "Błąd",
      description: "Nie udało się wygenerować raportu PDF",
      variant: "destructive"
    });
  }
};

/**
 * Generate a CSV from data
 */
export const generateCSV = (data: any[], fileName: string) => {
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

    toast({
      title: "Sukces",
      description: "Dane zostały wyeksportowane do pliku CSV",
    });
  } catch (error) {
    console.error('Failed to generate CSV:', error);
    toast({
      title: "Błąd",
      description: "Nie udało się wyeksportować danych do CSV",
      variant: "destructive"
    });
  }
};

/**
 * Generate an XLSX file from data
 */
export const generateXLSX = (data: any[], fileName: string) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);

    toast({
      title: "Sukces",
      description: "Dane zostały wyeksportowane do pliku Excel",
    });
  } catch (error) {
    console.error('Failed to generate XLSX:', error);
    toast({
      title: "Błąd",
      description: "Nie udało się wyeksportować danych do Excela",
      variant: "destructive"
    });
  }
};
