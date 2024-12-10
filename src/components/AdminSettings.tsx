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
  const [adsenseCode, setAdsenseCode] = useState("");

  useEffect(() => {
    const savedHeaderScript = localStorage.getItem("headerScript") || "";
    const savedAdsenseCode = localStorage.getItem("adsenseCode") || "";
    setHeaderScript(savedHeaderScript);
    setAdsenseCode(savedAdsenseCode);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("headerScript", headerScript);
    localStorage.setItem("adsenseCode", adsenseCode);
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
            <Label htmlFor="adsenseCode">AdSense Code</Label>
            <Textarea
              id="adsenseCode"
              value={adsenseCode}
              onChange={(e) => setAdsenseCode(e.target.value)}
              placeholder="Enter Google AdSense code"
              className="min-h-[100px]"
            />
          </div>
          <Button onClick={saveSettings} className="w-full">Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};