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
import { AdContainer } from "@/components/AdContainer";
import { loadAndExecuteAds } from "@/utils/adManager";

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

  useEffect(() => {
    // Initial load of ads
    const timeoutId = setTimeout(() => {
      loadAndExecuteAds();
    }, 1000); // Wait for 1 second after component mount
    
    // Handle localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith('admin')) {
        loadAndExecuteAds();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleExportPDF = async () => {
    const element = document.getElementById("invoice-preview");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });
      
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const scaleFactor = imgHeight > 297 ? 297 / imgHeight : 1;
      const finalWidth = imgWidth * scaleFactor;
      const finalHeight = imgHeight * scaleFactor;
      const xPosition = (210 - finalWidth) / 2;
      const yPosition = (297 - finalHeight) / 2;

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

        <AdContainer position="top" className="mb-8" />

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

        <AdContainer position="bottom" className="mt-8" />
      </div>
      <Footer />
    </div>
  );
};

export default Index;