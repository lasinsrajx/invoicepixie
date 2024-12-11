import React from "react";
import { Card } from "@/components/ui/card";
import { LineItem } from "@/types/invoice";

interface InvoicePreviewProps {
  companyName: string;
  clientName: string;
  clientAddress: string;
  bankName: string;
  accountNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  lineItems: LineItem[];
  template?: string;
  letterhead?: {
    logo: string;
    companyAddress: string;
    showLogo: boolean;
    showAddress: boolean;
  };
  showFields?: {
    bankInfo: boolean;
    invoiceNumber: boolean;
    invoiceDate: boolean;
    paymentInfo: boolean;
  };
}

export const InvoicePreview = ({
  companyName,
  clientName,
  clientAddress,
  bankName,
  accountNumber,
  invoiceNumber,
  invoiceDate,
  lineItems,
  template = "modern",
  letterhead = {
    logo: "",
    companyAddress: "",
    showLogo: false,
    showAddress: false
  },
  showFields = {
    bankInfo: true,
    invoiceNumber: true,
    invoiceDate: true,
    paymentInfo: true
  }
}: InvoicePreviewProps) => {
  const calculateSubtotal = () => {
    return lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
  };

  const calculateTax = () => {
    return lineItems.reduce(
      (sum, item) => sum + (item.quantity * item.unitPrice * (item.taxRate / 100)),
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const getTemplateStyles = () => {
    switch (template) {
      case "classic":
        return {
          headerBg: "bg-gray-900",
          accentColor: "text-gray-900",
          borderColor: "border-gray-900",
        };
      case "minimal":
        return {
          headerBg: "bg-gray-600",
          accentColor: "text-gray-600",
          borderColor: "border-gray-600",
        };
      case "professional":
        return {
          headerBg: "bg-slate-800",
          accentColor: "text-slate-800",
          borderColor: "border-slate-800",
        };
      default: // modern
        return {
          headerBg: "bg-[#1e3a8a]",
          accentColor: "text-[#1e3a8a]",
          borderColor: "border-[#1e3a8a]",
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <Card className="p-8 bg-white shadow-lg max-w-[210mm] mx-auto" id="invoice-preview">
      <div className="space-y-8">
        {letterhead.showLogo && letterhead.logo && (
          <div className="flex justify-end">
            <img src={letterhead.logo} alt="Company Logo" className="h-16 object-contain" />
          </div>
        )}

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-4">INVOICE</h1>
            {showFields.invoiceNumber && (
              <p className="text-gray-600">Invoice Number: {invoiceNumber || 'INV-00001'}</p>
            )}
            {showFields.invoiceDate && (
              <p className="text-gray-600">Date: {invoiceDate || new Date().toLocaleDateString()}</p>
            )}
          </div>
          <div className="text-right">
            <h2 className={`text-2xl font-bold ${styles.accentColor}`}>{companyName || "Company Name"}</h2>
            {letterhead.showAddress && letterhead.companyAddress && (
              <p className="text-gray-600 mt-2">{letterhead.companyAddress}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className={`text-lg font-semibold mb-2 ${styles.accentColor}`}>BILL TO:</h3>
            <p className="font-medium">{clientName || "Client Name"}</p>
            <p className="text-gray-600 whitespace-pre-line">{clientAddress}</p>
          </div>
          {showFields.paymentInfo && showFields.bankInfo && (
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${styles.accentColor}`}>PAYMENT INFORMATION:</h3>
              <p className="text-gray-600">Bank: {bankName}</p>
              <p className="text-gray-600">Account: {accountNumber}</p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <table className="w-full">
            <thead>
              <tr className={`${styles.headerBg} text-white`}>
                <th className="py-3 px-4 text-left">ITEM</th>
                <th className="py-3 px-4 text-left">DESCRIPTION</th>
                <th className="py-3 px-4 text-right">RATE</th>
                <th className="py-3 px-4 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={index} className={`border-b ${styles.borderColor}`}>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{item.description || "Item description"}</td>
                  <td className="py-3 px-4 text-right">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between border-b py-2">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span>Tax:</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className={`flex justify-between ${styles.headerBg} text-white py-2 px-4 mt-4`}>
                <span className="font-bold">TOTAL:</span>
                <span className="font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
