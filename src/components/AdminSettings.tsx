import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getAdminSettings, saveAdminSettings } from "@/utils/adminSettings";

export const AdminSettings = () => {
  const { toast } = useToast();
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    // Load settings using the utility function
    const settings = getAdminSettings();
    setBankName(settings.bankName);
    setAccountNumber(settings.accountNumber);
  }, []);

  const saveSettings = () => {
    // Save settings using the utility function
    saveAdminSettings({
      bankName,
      accountNumber,
    });
    
    toast({
      title: "Settings saved globally",
      description: "Your settings have been saved and will be applied across all sessions",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-4">Admin Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Admin Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter bank name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
            />
          </div>
          <Button onClick={saveSettings} className="w-full">Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};