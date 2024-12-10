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
    return lineItems.reduce(
      (sum, item) =>
        sum + item.quantity * item.unitPrice * (item.taxRate / 100),
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <Card className="p-6 bg-white">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-primary">{companyName || "Company Name"}</h2>
          <p className="text-gray-600">Invoice for: {clientName || "Client Name"}</p>
          <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Description</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Price</th>
                <th className="py-2">Tax</th>
                <th className="py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.description || "Item description"}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-2">{item.taxRate}%</td>
                  <td className="py-2">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="space-y-2 text-right">
            <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
            <p>Tax: ${calculateTax().toFixed(2)}</p>
            <p className="text-xl font-bold">
              Total: ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};