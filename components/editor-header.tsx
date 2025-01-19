"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languageConfigs } from "@/utils/languages";

interface EditorHeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export function EditorHeader({ language, onLanguageChange }: EditorHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b p-2 bg-background">
      <div className="flex items-center gap-2">
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(languageConfigs).map((lang) => (
              <SelectItem key={lang.id} value={lang.id}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 