import React from "react";
import { Card } from "@/components/ui/card";
import { LineItem } from "@/types/invoice";

interface InvoicePreviewProps {
  companyName: string;
  clientName: string;
  lineItems: LineItem[];
}

export const InvoicePreview = ({
  companyName,
  clientName,
  lineItems,
}: InvoicePreviewProps) => {
  const calculateSubtotal = () => {
    return lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.06; // 6% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="p-8 bg-white shadow-lg max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-4">INVOICE</h1>
            <p className="text-gray-600">Invoice Number: INV-{Math.floor(Math.random() * 10000).toString().padStart(5, '0')}</p>
            <p className="text-gray-600">Date: {currentDate}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-[#1e3a8a]">{companyName || "Company Name"}</h2>
          </div>
        </div>

        {/* Bill To & Payment Info */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">BILL TO:</h3>
            <p className="font-medium">{clientName || "Client Name"}</p>
            <p className="text-gray-600">123 Client Street</p>
            <p className="text-gray-600">City, State 12345</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">PAYMENT INFORMATION:</h3>
            <p className="text-gray-600">Bank: First National Bank</p>
            <p className="text-gray-600">Account: XXXX-XXXX-XXXX</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-8">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="py-3 px-4 text-left">ITEM</th>
                <th className="py-3 px-4 text-left">DESCRIPTION</th>
                <th className="py-3 px-4 text-right">RATE</th>
                <th className="py-3 px-4 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={index} className="border-b">
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

          {/* Totals */}
          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between border-b py-2">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span>Sales Tax (6%):</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between bg-[#1e3a8a] text-white py-2 px-4 mt-4">
                <span className="font-bold">TOTAL:</span>
                <span className="font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">TERMS AND CONDITIONS:</h3>
          <p className="text-gray-600">Payment is due 30 days from the invoice date.</p>
        </div>
      </div>
    </Card>
  );
};