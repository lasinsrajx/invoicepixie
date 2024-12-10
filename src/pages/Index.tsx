import React, { useState } from "react";
import { InvoiceForm } from "@/components/InvoiceForm";
import { InvoicePreview } from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Index = () => {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState({
    companyName: "",
    clientName: "",
    lineItems: [{ description: "", quantity: 1, unitPrice: 0, taxRate: 6 }],
  });

  const handleExportPDF = async () => {
    const element = document.getElementById("invoice-preview");
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#1e3a8a]">
          Invoice Generator
        </h1>

        {/* AdSense Placeholder */}
        <div className="w-full h-24 bg-gray-200 mb-8 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Advertisement Space</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <InvoiceForm onUpdateInvoice={setInvoiceData} />
          </div>
          <div>
            <div className="sticky top-8">
              <div id="invoice-preview">
                <InvoicePreview {...invoiceData} />
              </div>
              <div className="mt-4 flex gap-4 justify-end">
                <Button 
                  onClick={handleExportPDF}
                  className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
                >
                  Export PDF
                </Button>
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/10"
                >
                  Print
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom AdSense Placeholder */}
        <div className="w-full h-24 bg-gray-200 mt-8 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Advertisement Space</span>
        </div>
      </div>
    </div>
  );
};

export default Index;