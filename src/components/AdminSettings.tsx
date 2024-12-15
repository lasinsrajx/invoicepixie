import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getAdminSettings, saveAdminSettings } from "@/utils/adminSettings";

export const AdminSettings = () => {
  const { toast } = useToast();
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [topAdCode, setTopAdCode] = useState("");
  const [bottomAdCode, setBottomAdCode] = useState("");

  useEffect(() => {
    const settings = getAdminSettings();
    setBankName(settings.bankName);
    setAccountNumber(settings.accountNumber);
    setTopAdCode(settings.topAdCode);
    setBottomAdCode(settings.bottomAdCode);
  }, []);

  const saveSettings = () => {
    saveAdminSettings({
      bankName,
      accountNumber,
      topAdCode,
      bottomAdCode,
    });
    
    toast({
      title: "Settings saved",
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
          <div className="space-y-2">
            <Label htmlFor="topAdCode">Top Ad Code</Label>
            <Textarea
              id="topAdCode"
              value={topAdCode}
              onChange={(e) => setTopAdCode(e.target.value)}
              placeholder="Enter top ad code"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bottomAdCode">Bottom Ad Code</Label>
            <Textarea
              id="bottomAdCode"
              value={bottomAdCode}
              onChange={(e) => setBottomAdCode(e.target.value)}
              placeholder="Enter bottom ad code"
              className="min-h-[100px]"
            />
          </div>
          <Button onClick={saveSettings} className="w-full">Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};