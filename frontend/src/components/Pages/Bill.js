import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = (contentElement) => {
  const pdf = new jsPDF('p', 'mm', 'a4');

  html2canvas(contentElement).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    pdf.addImage(imgData, 'PNG', 10, 10, 190, 277); // Adjust the position and size as needed

    pdf.save('general_ledger.pdf');
  });
};

export default generatePDF;
