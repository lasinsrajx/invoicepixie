import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { LineItem } from "@/types/invoice";
import { LetterheadSettings } from "./LetterheadSettings";

export const InvoiceForm = ({ onUpdateInvoice }: { onUpdateInvoice: (data: any) => void }) => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unitPrice: 0, taxRate: 6 },
  ]);
  const [letterhead, setLetterhead] = useState({
    logo: "",
    companyAddress: "",
    showLogo: false,
    showAddress: false,
  });
  const [showFields, setShowFields] = useState({
    bankInfo: true,
    invoiceNumber: true,
    invoiceDate: true,
  });

  useEffect(() => {
    const savedData = localStorage.getItem("invoiceData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCompanyName(parsed.companyName || "");
      setClientName(parsed.clientName || "");
      setBankName(parsed.bankName || "");
      setAccountNumber(parsed.accountNumber || "");
      setInvoiceNumber(parsed.invoiceNumber || "");
      setInvoiceDate(parsed.invoiceDate || "");
      setLineItems(parsed.lineItems || []);
      setLetterhead(parsed.letterhead || {
        logo: "",
        companyAddress: "",
        showLogo: false,
        showAddress: false,
      });
      setShowFields(parsed.showFields || {
        bankInfo: true,
        invoiceNumber: true,
        invoiceDate: true,
      });
    }
  }, []);

  useEffect(() => {
    const data = {
      companyName,
      clientName,
      bankName,
      accountNumber,
      invoiceNumber,
      invoiceDate,
      lineItems,
      letterhead,
      showFields,
    };
    localStorage.setItem("invoiceData", JSON.stringify(data));
    onUpdateInvoice(data);
  }, [
    companyName,
    clientName,
    bankName,
    accountNumber,
    invoiceNumber,
    invoiceDate,
    lineItems,
    letterhead,
    showFields,
    onUpdateInvoice,
  ]);

  const updateLetterhead = (field: string, value: any) => {
    setLetterhead((prev) => ({ ...prev, [field]: value }));
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: "", quantity: 1, unitPrice: 0, taxRate: 6 },
    ]);
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...lineItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setLineItems(newItems);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove last item",
        description: "At least one line item is required",
      });
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName" className="text-[#1e3a8a] font-semibold">
            Company Name
          </Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Your Company Name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="clientName" className="text-[#1e3a8a] font-semibold">
            Client Name
          </Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client Name"
            className="mt-1"
          />
        </div>

        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold text-[#1e3a8a]">Letterhead Settings</h3>
          <LetterheadSettings letterhead={letterhead} onUpdate={updateLetterhead} />
        </div>

        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold text-[#1e3a8a]">Optional Fields</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="showBankInfo">Show Bank Information</Label>
              <Switch
                id="showBankInfo"
                checked={showFields.bankInfo}
                onCheckedChange={(checked) =>
                  setShowFields((prev) => ({ ...prev, bankInfo: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showInvoiceNumber">Show Invoice Number</Label>
              <Switch
                id="showInvoiceNumber"
                checked={showFields.invoiceNumber}
                onCheckedChange={(checked) =>
                  setShowFields((prev) => ({ ...prev, invoiceNumber: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showInvoiceDate">Show Invoice Date</Label>
              <Switch
                id="showInvoiceDate"
                checked={showFields.invoiceDate}
                onCheckedChange={(checked) =>
                  setShowFields((prev) => ({ ...prev, invoiceDate: checked }))
                }
              />
            </div>
          </div>
        </div>

        {showFields.bankInfo && (
          <>
            <div>
              <Label htmlFor="bankName" className="text-[#1e3a8a] font-semibold">
                Bank Name
              </Label>
              <Input
                id="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Bank Name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="accountNumber" className="text-[#1e3a8a] font-semibold">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Account Number"
                className="mt-1"
              />
            </div>
          </>
        )}

        {showFields.invoiceNumber && (
          <div>
            <Label htmlFor="invoiceNumber" className="text-[#1e3a8a] font-semibold">
              Invoice Number
            </Label>
            <Input
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="INV-00001"
              className="mt-1"
            />
          </div>
        )}

        {showFields.invoiceDate && (
          <div>
            <Label htmlFor="invoiceDate" className="text-[#1e3a8a] font-semibold">
              Invoice Date
            </Label>
            <Input
              id="invoiceDate"
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="mt-1"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-[#1e3a8a]">Line Items</h3>
        {lineItems.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
            <div className="md:col-span-2">
              <Input
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  updateLineItem(index, "description", e.target.value)
                }
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  updateLineItem(index, "quantity", Number(e.target.value))
                }
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) =>
                  updateLineItem(index, "unitPrice", Number(e.target.value))
                }
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Tax Rate %"
                value={item.taxRate}
                onChange={(e) =>
                  updateLineItem(index, "taxRate", Number(e.target.value))
                }
              />
            </div>
            <div className="flex items-center">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeLineItem(index)}
                className="ml-auto"
              >
                ×
              </Button>
            </div>
          </div>
        ))}
        <Button 
          onClick={addLineItem}
          className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
        >
          Add Line Item
        </Button>
      </div>
    </div>
  );
};
