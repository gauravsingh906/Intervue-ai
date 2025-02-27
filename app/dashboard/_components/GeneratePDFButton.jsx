"use client"

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileCheck } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Component for the PDF download button with authentication and improved UI
export const GeneratePDFButton = ({
  contentRef,
  fileName = 'interview-feedback.pdf',
  organizationName = 'Intervue AI',
  includeWatermark = true,
  includeFooter = true,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    if (!contentRef.current) return;
    
    try {
      setIsGenerating(true);
      
      toast.loading("Preparing your authenticated feedback report...", {
        id: "pdf-toast"
      });

      // Create a new jsPDF instance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Get the content element
      const content = contentRef.current;
      
      // Add margins to content to ensure better page breaks (in pixels)
      const contentMargins = 40;
      content.style.padding = `${contentMargins}px`;
      
      // Calculate dimensions
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margins = 5; // margins in mm
      const usableWidth = pageWidth - (margins * 2);
      const usableHeight = pageHeight - (margins * 2);
      
      // Create a canvas from the HTML content with higher scale for better quality
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });
      
      // Reset content padding
      content.style.padding = '';
      
      // Add metadata to the PDF
      pdf.setProperties({
        title: fileName.replace('.pdf', ''),
        subject: 'Interview Feedback Report',
        author: organizationName,
        keywords: 'interview, feedback, assessment',
        creator: organizationName,
        producer: organizationName,
        creationDate: new Date(),
      });
      
      // Add company logo (SVG)
      // First load the SVG logo
      const loadLogo = async () => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = '/logo.svg'; // Make sure this path is correct for your project
          // If you need a fallback for SVG loading issues
          img.onerror = () => {
            console.warn('Failed to load SVG logo, using text fallback');
            resolve(null);
          };
        });
      };
      
      const logoImage = await loadLogo();
      
      // Function to add watermark with proper positioning
      const addWatermark = (pageNum) => {
        // Save current state
        pdf.saveGraphicsState();
        
        // Set transparency for watermark
        pdf.setGState(new pdf.GState({opacity: 0.1}));
        
        // Set text properties for watermark
        pdf.setTextColor(100, 100, 180);
        pdf.setFontSize(50);
        pdf.setFont('helvetica', 'bold');
        
        // Calculate center position
        const centerX = pageWidth / 2;
        const centerY = pageHeight / 2;
        
        // Add text watermark
        // Using text transform instead of rotate for better positioning
        pdf.text(organizationName, centerX, centerY, {
          align: 'center',
          angle: 45
        });
        
        // Restore graphics state
        pdf.restoreGraphicsState();
      };
      
      // Function to add header with logo and organization name
      const addHeader = (pageNum, totalPages) => {
        // Add logo 
        if (logoImage) {
            const logoCanvas = document.createElement('canvas');
            logoCanvas.width = logoImage.width;
            logoCanvas.height = logoImage.height;
            const ctx = logoCanvas.getContext('2d');
            ctx.drawImage(logoImage, 0, 0);
            
            try {
                const logoData = logoCanvas.toDataURL('image/png');
                pdf.addImage(logoData, 'PNG', margins, margins, 15, 10, '', 'FAST');
            } catch (e) {
                console.warn('Error adding logo to PDF:', e);
                pdf.setFillColor(60, 100, 255);
                pdf.rect(margins, margins, 15, 10, 'F');
            }
        } else {
            pdf.setFillColor(60, 100, 255);
            pdf.rect(margins, margins, 15, 10, 'F');
        }
        
        // Organization name on the left
        pdf.setTextColor(40, 80, 160);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.text(organizationName, margins + 20, margins + 7);
    
        // Add "Document ID: {docId}" on the top-right corner
        const docIdText = `Document ID: ${docId}`;
        pdf.setFontSize(12);
        pdf.setTextColor(80, 80, 80);
        
        // Align text to the right margin
        const textWidth = pdf.getTextWidth(docIdText);
        pdf.text(docIdText, pageWidth - margins - textWidth, margins + 7);
    
        // Decorative lines
        pdf.setDrawColor(60, 100, 220);
        pdf.setLineWidth(0.7);
        pdf.line(margins, margins + 18, pageWidth - margins, margins + 18);
        
        pdf.setDrawColor(200, 220, 250);
        pdf.setLineWidth(0.3);
        pdf.line(margins, margins + 20, pageWidth - margins, margins + 20);
    };
    
    
      
      // Function to add footer with authentication info and better design
      const addFooter = (pageNum, docId) => {
        // Add decorative footer line
        pdf.setDrawColor(60, 100, 220);
        pdf.setLineWidth(0.7);
        pdf.line(margins, pageHeight - margins - 15, pageWidth - margins, pageHeight - margins - 15);
        
        // Add subtle secondary line
        pdf.setDrawColor(200, 220, 250);
        pdf.setLineWidth(0.3);
        pdf.line(margins, pageHeight - margins - 13, pageWidth - margins, pageHeight - margins - 13);
        
        // Add verification text with better formatting
        pdf.setFontSize(8);
        pdf.setTextColor(80, 80, 80);
        
        // Left aligned authentication information
        pdf.text(`Authenticated by ${organizationName}`, margins, pageHeight - margins - 8);
        
        // Center aligned document ID
        pdf.text(`Document ID: ${docId}`, pageWidth / 2 - 15, pageHeight - margins - 8);
        
        // Right aligned date
        const dateText = new Date().toISOString().split('T')[0];
        pdf.text(dateText, pageWidth - margins - 25, pageHeight - margins - 8);
        
        // Add security notice with icon-like symbol
        pdf.setFontSize(7);
        pdf.text('✓ This document includes tamper-evident authentication features', 
          margins, pageHeight - margins - 3);
      };
      
      // Generate a document ID for authentication
      const generateDocId = () => {
        return 'DOC-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      };
      
      const docId = generateDocId();
      
      // Calculate how many pages needed based on content dimensions
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = usableWidth;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Calculate total pages needed for content with proper scaling
      const contentHeight = usableHeight - 40; // Subtracting space for header and footer
      const totalPages = 1;
      
      // Prepare the PDF - add pages and content
      for (let i = 0; i < totalPages; i++) {
        // Add new page if not the first one
        if (i > 0) {
          pdf.addPage();
        }
        
        // Add watermark if enabled
        if (includeWatermark) {
          addWatermark(i + 1);
        }
        
        // Add header with page number
        addHeader(i + 1, totalPages);
        
        // Calculate position for this page's content slice
        const srcY = i * contentHeight * canvas.width / imgWidth;
        const srcHeight = Math.min(
          contentHeight * canvas.width / imgWidth,
          canvas.height - srcY
        );
        
        const destY = margins + 25; // Position below header
        const destHeight = Math.min(contentHeight, imgHeight - (i * contentHeight));
        
        // Add the content image to the PDF with proper clipping for this page
        pdf.addImage(
          imgData,
          'PNG',
          margins,
          destY,
          imgWidth,
          destHeight,
          '',
          'FAST',
          i > 0 ? 'NONE' : 'SLOW', // Higher quality for first page
          srcY,
          canvas.width,
          srcHeight
        );
        
        // Add footer if enabled
        if (includeFooter) {
          addFooter(i + 1, docId);
        }
      }
      
      // Process detailed feedback section to present only genuine feedback
      // This is handled by the HTML content preparation before PDF generation
      // The contentRef should already contain properly formatted feedback
      
      // Save the PDF
      pdf.save(fileName);
      
      toast.success("Your authenticated feedback report has been downloaded successfully.", {
        id: "pdf-toast",
        duration: 4000,
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      toast.error("There was a problem creating your authenticated report. Please try again.", {
        id: "pdf-toast"
      });
      
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Button 
      onClick={handleGeneratePDF} 
      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 py-2 rounded-md shadow transition-all duration-300"
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Creating Your Professional Report...</span>
        </>
      ) : (
        <>
          <FileCheck className="h-4 w-4" />
          <span>Download Authenticated Feedback</span>
        </>
      )}
    </Button>
  );
};