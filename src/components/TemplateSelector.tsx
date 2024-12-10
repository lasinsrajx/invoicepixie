import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TemplateSelectorProps {
  onTemplateChange: (template: string) => void;
  currentTemplate: string;
}

export const TemplateSelector = ({ onTemplateChange, currentTemplate }: TemplateSelectorProps) => {
  return (
    <div className="mb-4">
      <Select value={currentTemplate} onValueChange={onTemplateChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="modern">Modern Blue</SelectItem>
          <SelectItem value="classic">Classic Black</SelectItem>
          <SelectItem value="minimal">Minimal Gray</SelectItem>
          <SelectItem value="professional">Professional Dark</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};