"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Loader2, XCircle, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";

interface OutputPanelProps {
  output: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isLoading?: boolean;
  status?: 'success' | 'error' | 'idle';
}

export function OutputPanel({ 
  output, 
  isCollapsed, 
  onToggleCollapse,
  isLoading = false,
  status = 'idle'
}: OutputPanelProps) {
  // Function to check if output contains compilation error
  const isCompilationError = (text: string) => {
    return text.toLowerCase().includes('compilation error') || 
           text.toLowerCase().includes('error:') ||
           text.toLowerCase().includes('undefined reference');
  };

  // Function to format error output
  const formatOutput = (text: string) => {
    if (isCompilationError(text)) {
      return text.split('\n').map((line, i) => (
        <span key={i} className={cn(
          line.toLowerCase().includes('error') ? 'text-red-500 font-semibold' : 'text-foreground'
        )}>
          {line}
          {i !== text.split('\n').length - 1 && '\n'}
        </span>
      ));
    }
    return text;
  };

  return (
    <div className="relative h-full bg-background">
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-md hover:bg-accent"
        onClick={onToggleCollapse}
      >
        {isCollapsed ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? 0 : "100%",
          opacity: isCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full overflow-hidden"
      >
        <Tabs defaultValue="output" className="h-full">
          <TabsList className="w-full sticky top-0 z-10">
            <TabsTrigger value="output" className="flex-1 relative">
              Output
              {status !== 'idle' && !isLoading && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2">
                  {status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="testcases" className="flex-1">
              Test Cases
            </TabsTrigger>
          </TabsList>
          <TabsContent value="output" className="p-4 h-[calc(100%-40px)]">
            <div className={cn(
              "font-mono rounded-lg h-full overflow-auto p-4",
              status === 'success' ? "bg-emerald-500/10" : 
              status === 'error' || isCompilationError(output) ? "bg-red-500/10" : 
              "bg-muted/50"
            )}>
              {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Compiling and running code...
                </div>
              ) : (
                <pre className={cn(
                  "whitespace-pre-wrap",
                  status === 'success' ? "text-emerald-500" :
                  status === 'error' || isCompilationError(output) ? "text-red-500" :
                  "text-foreground"
                )}>
                  {formatOutput(output) || "Run code to see output"}
                </pre>
              )}
            </div>
          </TabsContent>
          <TabsContent value="testcases" className="p-4">
            Test cases coming soon...
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 