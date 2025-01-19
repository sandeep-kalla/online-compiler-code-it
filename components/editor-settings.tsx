"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Play, Expand, Minimize, Palette, Type, TextQuote } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { editorThemes } from "@/utils/editor-themes";
import { useState } from "react";

interface EditorSettingsProps {
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (font: string) => void;
  onThemeChange: (theme: string) => void;
  currentTheme: string;
  onRunCode: () => void;
  isRunning: boolean;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export function EditorSettings({
  onFontSizeChange,
  onFontFamilyChange,
  onThemeChange,
  currentTheme,
  onRunCode,
  isRunning,
  onToggleFullscreen,
  isFullscreen,
}: EditorSettingsProps) {
  const [currentFontSize, setCurrentFontSize] = useState("14");
  const [currentFontFamily, setCurrentFontFamily] = useState("'Fira Code', monospace");

  const fontSizes = [12, 14, 16, 18, 20];
  const fontFamilies = [
    { name: "Fira Code", value: "'Fira Code', monospace" },
    { name: "Consolas", value: "Consolas, monospace" },
    { name: "Source Code Pro", value: "'Source Code Pro', monospace" },
  ];

  const handleFontSizeChange = (size: string) => {
    setCurrentFontSize(size);
    onFontSizeChange(Number(size));
  };

  const handleFontFamilyChange = (font: string) => {
    setCurrentFontFamily(font);
    onFontFamilyChange(font);
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-background">
      <ThemeToggle />
      
      {/* Font Size Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" title="Font Size">
            <Type className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Font Size</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={currentFontSize} onValueChange={handleFontSizeChange}>
            {fontSizes.map((size) => (
              <DropdownMenuRadioItem key={size} value={size.toString()}>
                {size}px
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Font Family Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" title="Font Family">
            <TextQuote className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Font Family</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={currentFontFamily} onValueChange={handleFontFamilyChange}>
            {fontFamilies.map((font) => (
              <DropdownMenuRadioItem key={font.name} value={font.value}>
                {font.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" title="Editor Theme">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Editor Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={currentTheme} onValueChange={onThemeChange}>
            {editorThemes.map((theme) => (
              <DropdownMenuRadioItem key={theme.id} value={theme.id}>
                {theme.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Fullscreen Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleFullscreen}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <Minimize className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Expand className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>

      <div className="flex-1" />

      {/* Run Code Button */}
      <Button 
        variant="default" 
        size="sm"
        onClick={onRunCode}
        disabled={isRunning}
        className="gap-2"
      >
        <Play className="h-4 w-4" />
        {isRunning ? "Running..." : "Run Code"}
      </Button>
    </div>
  );
} 