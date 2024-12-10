import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const AdminSettings = () => {
  const { toast } = useToast();
  const [headerScript, setHeaderScript] = useState("");
  const [topAdCode, setTopAdCode] = useState("");
  const [bottomAdCode, setBottomAdCode] = useState("");
  const [bankName, setBankName] = useState("First National Bank");
  const [accountNumber, setAccountNumber] = useState("XXXX-XXXX-XXXX");

  useEffect(() => {
    const savedHeaderScript = localStorage.getItem("headerScript") || "";
    const savedTopAdCode = localStorage.getItem("topAdCode") || "";
    const savedBottomAdCode = localStorage.getItem("bottomAdCode") || "";
    const savedBankName = localStorage.getItem("bankName") || "First National Bank";
    const savedAccountNumber = localStorage.getItem("accountNumber") || "XXXX-XXXX-XXXX";
    
    setHeaderScript(savedHeaderScript);
    setTopAdCode(savedTopAdCode);
    setBottomAdCode(savedBottomAdCode);
    setBankName(savedBankName);
    setAccountNumber(savedAccountNumber);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("headerScript", headerScript);
    localStorage.setItem("topAdCode", topAdCode);
    localStorage.setItem("bottomAdCode", bottomAdCode);
    localStorage.setItem("bankName", bankName);
    localStorage.setItem("accountNumber", accountNumber);
    
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully",
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
            <Label htmlFor="headerScript">Header Script</Label>
            <Textarea
              id="headerScript"
              value={headerScript}
              onChange={(e) => setHeaderScript(e.target.value)}
              placeholder="Enter custom header scripts (meta tags, analytics, etc.)"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topAdCode">Top Ad Slot Code</Label>
            <Textarea
              id="topAdCode"
              value={topAdCode}
              onChange={(e) => setTopAdCode(e.target.value)}
              placeholder="Enter Google AdSense code for top ad slot"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bottomAdCode">Bottom Ad Slot Code</Label>
            <Textarea
              id="bottomAdCode"
              value={bottomAdCode}
              onChange={(e) => setBottomAdCode(e.target.value)}
              placeholder="Enter Google AdSense code for bottom ad slot"
              className="min-h-[100px]"
            />
          </div>
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