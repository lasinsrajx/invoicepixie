import React, { useState, useEffect } from "react";
import { InvoiceForm } from "@/components/InvoiceForm";
import { InvoicePreview } from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { AdminSettings } from "@/components/AdminSettings";
import { TemplateSelector } from "@/components/TemplateSelector";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState({
    companyName: "",
    clientName: "",
    clientAddress: "",
    bankName: "",
    accountNumber: "",
    invoiceNumber: "",
    invoiceDate: "",
    lineItems: [{ description: "", quantity: 1, unitPrice: 0, taxRate: 6 }],
  });
  const [template, setTemplate] = useState("modern");
  const [topAdCode, setTopAdCode] = useState("");
  const [bottomAdCode, setBottomAdCode] = useState("");

  useEffect(() => {
    // Load ad codes from localStorage
    const savedTopAdCode = localStorage.getItem("adminTopAdCode");
    const savedBottomAdCode = localStorage.getItem("adminBottomAdCode");
    
    if (savedTopAdCode) setTopAdCode(savedTopAdCode);
    if (savedBottomAdCode) setBottomAdCode(savedBottomAdCode);
    
    // Log for debugging
    console.log("Loaded top ad code:", savedTopAdCode);
    console.log("Loaded bottom ad code:", savedBottomAdCode);
  }, []);

  const handleExportPDF = async () => {
    const element = document.getElementById("invoice-preview");
    if (!element) return;

    try {
      // Set specific dimensions for A4
      const a4Width = 210; // mm
      const a4Height = 297; // mm
      const quality = 2; // Higher quality for better resolution

      const canvas = await html2canvas(element, {
        scale: quality,
        useCORS: true,
        logging: false, // Disable logging for better performance
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });
      
      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
      });

      // Calculate dimensions to fit A4 while maintaining aspect ratio
      const imgWidth = a4Width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // If height is greater than A4 height, scale down to fit
      const scaleFactor = imgHeight > a4Height ? a4Height / imgHeight : 1;
      const finalWidth = imgWidth * scaleFactor;
      const finalHeight = imgHeight * scaleFactor;

      // Center the content on the page
      const xPosition = (a4Width - finalWidth) / 2;
      const yPosition = (a4Height - finalHeight) / 2;

      // Add image to PDF
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', xPosition, yPosition, finalWidth, finalHeight, undefined, 'FAST');
      
      pdf.save("invoice.pdf");
      
      toast({
        title: "Success",
        description: "Invoice exported as PDF",
      });
    } catch (error) {
      console.error("PDF export failed:", error);
      toast({
        title: "Export failed",
        description: "Could not export invoice to PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1e3a8a] mb-4 lg:mb-0">
            Invoice Generator
          </h1>
          <AdminSettings />
        </div>

        {topAdCode && (
          <div 
            className="mb-8 w-full overflow-hidden"
            dangerouslySetInnerHTML={{ __html: topAdCode }}
          />
        )}

        <div className="mb-4">
          <TemplateSelector 
            currentTemplate={template}
            onTemplateChange={setTemplate}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <InvoiceForm onUpdateInvoice={setInvoiceData} />
          </div>
          <div className="w-full">
            <div className="sticky top-8 overflow-x-auto">
              <div id="invoice-preview" className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]">
                <InvoicePreview {...invoiceData} template={template} />
              </div>
              <div className="mt-4 flex gap-4 justify-end">
                <Button 
                  onClick={handleExportPDF}
                  className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
                >
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {bottomAdCode && (
          <div 
            className="mt-8 w-full overflow-hidden"
            dangerouslySetInnerHTML={{ __html: bottomAdCode }}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Index;