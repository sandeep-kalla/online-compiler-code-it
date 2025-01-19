'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CodeEditor } from '@/components/code-editor';
import { EditorSettings } from "@/components/editor-settings";
import { EditorHeader } from "@/components/editor-header";
import { OutputPanel } from "@/components/output-panel";
import { toast } from "sonner";
import { languageConfigs } from "@/utils/languages";

export default function Home() {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(languageConfigs.cpp.boilerplate);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [editorOptions, setEditorOptions] = useState({
    fontSize: 14,
    fontFamily: "'Fira Code', monospace",
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);
  const [outputStatus, setOutputStatus] = useState<'success' | 'error' | 'idle'>('idle');
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(languageConfigs[newLanguage].boilerplate);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Compiling...');
    setOutputStatus('idle');

    try {
      console.log('Submitting code...');
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language: languageConfigs[language].pistonId
        }),
      });

      const result = await response.json();
      console.log('Execution result:', result);

      if (!response.ok) {
        throw new Error(result.error || `API error: ${response.status}`);
      }

      if (result.output) {
        setOutput(result.output);
        setOutputStatus('success');
        toast.success('Code executed successfully!');
      } else if (result.error) {
        setOutput(`Error: ${result.error}`);
        setOutputStatus('error');
        toast.error('Failed to execute code');
      } else if (result.statusCode === 429) {
        setOutput('Daily limit exceeded. Please try again tomorrow.');
        setOutputStatus('error');
        toast.error('Daily limit exceeded');
      } else {
        setOutput('No output generated');
        setOutputStatus('idle');
      }

    } catch (error) {
      console.error('Error running code:', error);
      setOutput('Error running code: ' + (error instanceof Error ? error.message : String(error)));
      setOutputStatus('error');
      toast.error('Failed to execute code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for ESC key to exit fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <main className={`container mx-auto p-4 ${isFullscreen ? 'fixed inset-0 w-full h-full p-0 m-0 bg-background' : ''}`}>
      <div className={`grid grid-cols-12 gap-4 relative ${
        isFullscreen ? 'h-screen m-0 gap-0' : 'min-h-[calc(100vh-2rem)]'
      }`}>
        <motion.div
          layout
          className={`${
            isOutputCollapsed ? "col-span-12" : "col-span-8"
          } border rounded-lg overflow-hidden transition-all duration-300 ${
            isOutputCollapsed ? "pr-10" : ""
          } ${isFullscreen ? 'border-0 rounded-none' : ''}`}
        >
          <div className="flex flex-col h-full">
            <div className={`${isFullscreen ? 'bg-background border-b' : ''}`}>
              <EditorHeader 
                language={language} 
                onLanguageChange={handleLanguageChange}
              />
              <EditorSettings
                onFontSizeChange={(size) =>
                  setEditorOptions((prev) => ({ ...prev, fontSize: size }))
                }
                onFontFamilyChange={(font) =>
                  setEditorOptions((prev) => ({ ...prev, fontFamily: font }))
                }
                onThemeChange={setEditorTheme}
                currentTheme={editorTheme}
                onRunCode={runCode}
                isRunning={isRunning}
                onToggleFullscreen={handleFullscreen}
                isFullscreen={isFullscreen}
              />
            </div>
            <div className="flex-1">
              <CodeEditor
                onChange={(value) => setCode(value || "")}
                language={language}
                code={code}
                editorOptions={editorOptions}
                isFullscreen={isFullscreen}
                theme={editorTheme}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          layout
          className={`${
            isOutputCollapsed ? "w-10" : "col-span-4"
          } absolute right-0 top-0 h-full overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'border-l bg-background' : 'border rounded-lg'
          }`}
          style={{
            width: isOutputCollapsed ? "40px" : isFullscreen ? "30%" : "calc(33.33% - 0.5rem)",
            height: isFullscreen ? "100vh" : "100%",
            zIndex: 20,
          }}
        >
          <OutputPanel
            output={output}
            isCollapsed={isOutputCollapsed}
            onToggleCollapse={() => setIsOutputCollapsed(!isOutputCollapsed)}
            isLoading={isRunning}
            status={outputStatus}
          />
        </motion.div>
      </div>
    </main>
  );
} 