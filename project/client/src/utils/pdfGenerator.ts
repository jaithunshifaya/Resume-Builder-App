import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Resume } from '../contexts/ResumeContext';

export const generatePDF = async (resume: Resume) => {
  const element = document.getElementById('resume-preview');
  if (!element) {
    throw new Error('Resume preview element not found');
  }

  try {
    // Wait a bit for images to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Configure html2canvas for better quality
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      removeContainer: true,
      imageTimeout: 15000,
      logging: false,
      onclone: (clonedDoc) => {
        // Ensure images are loaded in the cloned document
        const images = clonedDoc.querySelectorAll('img');
        images.forEach((img) => {
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
        });
      },
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    // Generate filename
    const sanitizedName = (resume.personalInfo.fullName || 'Resume').replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${sanitizedName}_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
    
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};