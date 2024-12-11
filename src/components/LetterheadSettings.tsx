import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface LetterheadSettingsProps {
  letterhead: {
    logo: string;
    companyAddress: string;
    showLogo: boolean;
    showAddress: boolean;
  };
  onUpdate: (field: string, value: any) => void;
}

export const LetterheadSettings = ({ letterhead, onUpdate }: LetterheadSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="showLogo">Show Logo</Label>
        <Switch
          id="showLogo"
          checked={letterhead.showLogo}
          onCheckedChange={(checked) => onUpdate("showLogo", checked)}
        />
      </div>
      
      {letterhead.showLogo && (
        <div>
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            value={letterhead.logo}
            onChange={(e) => onUpdate("logo", e.target.value)}
            placeholder="Enter logo URL"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <Label htmlFor="showAddress">Show Company Address</Label>
        <Switch
          id="showAddress"
          checked={letterhead.showAddress}
          onCheckedChange={(checked) => onUpdate("showAddress", checked)}
        />
      </div>
      
      {letterhead.showAddress && (
        <div>
          <Label htmlFor="companyAddress">Company Address</Label>
          <Input
            id="companyAddress"
            value={letterhead.companyAddress}
            onChange={(e) => onUpdate("companyAddress", e.target.value)}
            placeholder="Enter company address"
          />
        </div>
      )}
    </div>
  );
};