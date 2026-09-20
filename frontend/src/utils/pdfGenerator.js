import { jsPDF } from 'jspdf';
import { formatNPR } from './formatters';

export const generateItineraryPDF = (itinerary, travelerName = 'Traveler') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Cover Page
  doc.setFillColor(37, 99, 235); // #2563eb
  doc.rect(0, 0, pageWidth, 60, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('YatraPath', 20, 28);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Intelligent Travel Itinerary Planner · Nepal', 20, 38);
  doc.text('"Let the path find you"', 20, 46);

  // Title block
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(itinerary.title || 'Personalized Nepal Travel Itinerary', 20, 80);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Prepared for: ${travelerName}`, 20, 90);
  doc.text(`Dates: ${itinerary.start_date} to ${itinerary.end_date} (${itinerary.total_days} Days)`, 20, 98);
  doc.text(`Season: ${itinerary.season}`, 20, 106);
  doc.text(`Total Budget: ${formatNPR(itinerary.budget_summary?.total_budget || itinerary.total_budget)}`, 20, 114);
  doc.text(`Estimated Cost: ${formatNPR(itinerary.budget_summary?.total_estimated || itinerary.estimated_cost)}`, 20, 122);

  // Days Section
  let y = 140;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text('Day-by-Day Schedule', 20, y);
  y += 10;

  const days = itinerary.days || [];
  days.forEach((day, idx) => {
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 25;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`Day ${day.day_number}: ${day.destination} (${day.date})`, 20, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);

    const slots = day.slots || {};
    const morningAct = slots.morning?.activity || 'Free Time';
    const morningCost = formatNPR(slots.morning?.cost || 0);
    doc.text(`• Morning: ${morningAct} (${morningCost})`, 24, y);
    y += 5;

    const afternoonAct = slots.afternoon?.activity || 'Free Time';
    const afternoonCost = formatNPR(slots.afternoon?.cost || 0);
    doc.text(`• Afternoon: ${afternoonAct} (${afternoonCost})`, 24, y);
    y += 5;

    const eveningAct = slots.evening?.activity || 'Free Time';
    const eveningCost = formatNPR(slots.evening?.cost || 0);
    doc.text(`• Evening: ${eveningAct} (${eveningCost})`, 24, y);
    y += 5;

    const accomName = day.accommodation?.name || 'Hotel';
    const dayTotal = formatNPR(day.day_total || 0);
    doc.setFont('helvetica', 'italic');
    doc.text(`Stay: ${accomName} | Day Total: ${dayTotal}`, 24, y);
    y += 10;
  });

  // Footer / Page numbers
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `YatraPath Itinerary · Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  const cleanTitle = (itinerary.title || 'Itinerary').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`YatraPath_${cleanTitle}_${itinerary.start_date || 'Plan'}.pdf`);
};
