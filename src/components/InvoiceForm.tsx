import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LineItem } from "@/types/invoice";

export const InvoiceForm = ({ onUpdateInvoice }: { onUpdateInvoice: (data: any) => void }) => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unitPrice: 0, taxRate: 6 },
  ]);

  useEffect(() => {
    const savedData = localStorage.getItem("invoiceData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCompanyName(parsed.companyName || "");
      setClientName(parsed.clientName || "");
      setLineItems(parsed.lineItems || []);
    }
  }, []);

  useEffect(() => {
    const data = { companyName, clientName, lineItems };
    localStorage.setItem("invoiceData", JSON.stringify(data));
    onUpdateInvoice(data);
  }, [companyName, clientName, lineItems, onUpdateInvoice]);

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
          <Label htmlFor="companyName" className="text-[#1e3a8a] font-semibold">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Your Company Name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="clientName" className="text-[#1e3a8a] font-semibold">Client Name</Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client Name"
            className="mt-1"
          />
        </div>
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