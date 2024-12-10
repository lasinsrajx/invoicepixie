import React, { useState } from "react";
import { InvoiceForm } from "@/components/InvoiceForm";
import { InvoicePreview } from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { AdminSettings } from "@/components/AdminSettings";
import { TemplateSelector } from "@/components/TemplateSelector";

const Index = () => {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState({
    companyName: "",
    clientName: "",
    lineItems: [{ description: "", quantity: 1, unitPrice: 0, taxRate: 6 }],
  });
  const [template, setTemplate] = useState("modern");

  // Get saved ad codes from localStorage
  const topAdCode = localStorage.getItem("topAdCode");
  const bottomAdCode = localStorage.getItem("bottomAdCode");
  const bankName = localStorage.getItem("bankName") || "First National Bank";
  const accountNumber = localStorage.getItem("accountNumber") || "XXXX-XXXX-XXXX";

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1e3a8a]">
            Invoice Generator
          </h1>
          <AdminSettings />
        </div>

        {/* Top Ad Space */}
        <div className="w-full mb-8 rounded-lg">
          {topAdCode ? (
            <div dangerouslySetInnerHTML={{ __html: topAdCode }} />
          ) : (
            <div className="h-24 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Advertisement Space</span>
            </div>
          )}
        </div>

        {/* Payment Information Display */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-[#1e3a8a] mb-2">Payment Information</h2>
          <p className="text-gray-600">Bank: {bankName}</p>
          <p className="text-gray-600">Account: {accountNumber}</p>
        </div>

        <div className="mb-4">
          <TemplateSelector 
            currentTemplate={template}
            onTemplateChange={setTemplate}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <InvoiceForm onUpdateInvoice={setInvoiceData} />
          </div>
          <div>
            <div className="sticky top-8">
              <div id="invoice-preview">
                <InvoicePreview {...invoiceData} template={template} />
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

        {/* Bottom Ad Space */}
        <div className="w-full mt-8 rounded-lg">
          {bottomAdCode ? (
            <div dangerouslySetInnerHTML={{ __html: bottomAdCode }} />
          ) : (
            <div className="h-24 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Advertisement Space</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;