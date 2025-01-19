/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
  onChange: (value: string | undefined) => void;
  language: string;
  code: string;
  editorOptions?: {
    fontSize?: number;
    fontFamily?: string;
  };
  isFullscreen?: boolean;
  theme?: string;
}

export function CodeEditor({ 
  onChange, 
  language, 
  code,
  editorOptions = {},
  isFullscreen = false,
  theme = 'vs-dark',
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);
  const { theme: systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const monaco = (window as any).monaco;
    if (monaco) {
      defineThemes(monaco);
    }
  }, [mounted]);

  const defineThemes = (monaco: any) => {
    // Define custom themes
    monaco.editor.defineTheme('monokai', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '88846f', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'f92672' },
        { token: 'string', foreground: 'e6db74' },
        { token: 'number', foreground: 'ae81ff' },
        { token: 'type', foreground: '66d9ef', fontStyle: 'italic' },
      ],
      colors: {
        'editor.background': '#272822',
        'editor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#3e3d32',
        'editorCursor.foreground': '#f8f8f0',
        'editorWhitespace.foreground': '#3b3a32',
        'editorIndentGuide.background': '#3b3a32',
        'editor.selectionBackground': '#49483e',
      },
    });

    monaco.editor.defineTheme('dracula', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff79c6' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'type', foreground: '8be9fd', fontStyle: 'italic' },
      ],
      colors: {
        'editor.background': '#282a36',
        'editor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#44475a',
        'editorCursor.foreground': '#f8f8f0',
        'editorWhitespace.foreground': '#44475a',
        'editorIndentGuide.background': '#44475a',
        'editor.selectionBackground': '#44475a',
      },
    });

    monaco.editor.defineTheme('nord', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '616e88', fontStyle: 'italic' },
        { token: 'keyword', foreground: '81a1c1' },
        { token: 'string', foreground: 'a3be8c' },
        { token: 'number', foreground: 'b48ead' },
        { token: 'type', foreground: '88c0d0' },
      ],
      colors: {
        'editor.background': '#2e3440',
        'editor.foreground': '#d8dee9',
        'editor.lineHighlightBackground': '#3b4252',
        'editorCursor.foreground': '#d8dee9',
        'editorWhitespace.foreground': '#434c5e',
        'editorIndentGuide.background': '#434c5e',
        'editor.selectionBackground': '#434c5e',
      },
    });

    monaco.editor.defineTheme('github-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'f97583' },
        { token: 'string', foreground: '9ecbff' },
        { token: 'number', foreground: 'b392f0' },
        { token: 'type', foreground: '79b8ff' },
      ],
      colors: {
        'editor.background': '#24292e',
        'editor.foreground': '#e1e4e8',
        'editor.lineHighlightBackground': '#2b3036',
        'editorCursor.foreground': '#e1e4e8',
        'editorWhitespace.foreground': '#2b3036',
        'editorIndentGuide.background': '#2b3036',
        'editor.selectionBackground': '#3392FF44',
      },
    });

    monaco.editor.defineTheme('github-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'd73a49' },
        { token: 'string', foreground: '032f62' },
        { token: 'number', foreground: '005cc5' },
        { token: 'type', foreground: '005cc5' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#24292e',
        'editor.lineHighlightBackground': '#f6f8fa',
        'editorCursor.foreground': '#24292e',
        'editorWhitespace.foreground': '#f6f8fa',
        'editorIndentGuide.background': '#f6f8fa',
        'editor.selectionBackground': '#0366d625',
      },
    });

    monaco.editor.defineTheme('aura', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '7c7c7c', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff757f' },
        { token: 'string', foreground: 'c3e88d' },
        { token: 'number', foreground: 'ff98a4' },
        { token: 'type', foreground: '82aaff' },
      ],
      colors: {
        'editor.background': '#15141b',
        'editor.foreground': '#edecee',
        'editor.lineHighlightBackground': '#1c1b24',
        'editorCursor.foreground': '#edecee',
        'editorWhitespace.foreground': '#1c1b24',
        'editorIndentGuide.background': '#1c1b24',
        'editor.selectionBackground': '#3d375e7f',
      },
    });

    monaco.editor.defineTheme('tokyo-night', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '565f89', fontStyle: 'italic' },
        { token: 'keyword', foreground: '9d7cd8' },
        { token: 'string', foreground: '9ece6a' },
        { token: 'number', foreground: 'ff9e64' },
        { token: 'type', foreground: '7aa2f7' },
      ],
      colors: {
        'editor.background': '#1a1b26',
        'editor.foreground': '#a9b1d6',
        'editor.lineHighlightBackground': '#1f202e',
        'editorCursor.foreground': '#a9b1d6',
        'editorWhitespace.foreground': '#1f202e',
        'editorIndentGuide.background': '#1f202e',
        'editor.selectionBackground': '#515c7e40',
      },
    });
  };

  const defaultOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: "'Fira Code', monospace",
    scrollBeyondLastLine: false,
    roundedSelection: false,
    padding: { top: 10 },
    lineNumbers: "on",
    glyphMargin: false,
    folding: true,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    smoothScrolling: true,
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnCommitCharacter: true,
    wordBasedSuggestions: true,
    parameterHints: {
      enabled: true
    },
    suggestSelection: "first",
    formatOnPaste: true,
    formatOnType: true,
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    autoSurround: "languageDefined",
    bracketPairColorization: {
      enabled: true
    },
    guides: {
      bracketPairs: true,
      indentation: true
    }
  };

  // Get the correct Monaco language ID
  const getMonacoLanguage = (lang: string) => {
    switch (lang) {
      case 'cpp':
        return 'cpp';
      case 'python':
        return 'python';
      case 'java':
        return 'java';
      default:
        return 'plaintext';
    }
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    // Add language-specific suggestions
    const compilerSuggestions = {
      cpp: [
        {
          label: 'cout',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'cout << ',
          detail: 'Output stream',
          documentation: 'Writes to the standard output stream'
        },
        {
          label: 'cin',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'cin >> ',
          detail: 'Input stream',
          documentation: 'Reads from the standard input stream'
        },
        {
          label: 'for',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'for (${1:int} ${2:i} = ${3:0}; ${2:i} < ${4:n}; ${2:i}++) {',
            '\t$0',
            '}'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'For Loop',
          documentation: 'Creates a for loop'
        },
      ],
      python: [
        {
          label: 'print',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'print($0)',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'Print function',
          documentation: 'Prints to the standard output'
        },
        {
          label: 'input',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'input($0)',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'Input function',
          documentation: 'Reads from the standard input'
        },
        {
          label: 'for',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'for ${1:item} in ${2:items}:',
            '\t$0'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'For Loop',
          documentation: 'Creates a for loop'
        },
      ],
      java: [
        {
          label: 'sout',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'System.out.println($0);',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'Print to console',
          documentation: 'System.out.println()'
        },
        {
          label: 'psvm',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'public static void main(String[] args) {',
            '\t$0',
            '}'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'Main method',
          documentation: 'Public static void main method'
        },
      ]
    };

    // Register completions for each language
    Object.entries(compilerSuggestions).forEach(([lang, suggestions]) => {
      monaco.languages.registerCompletionItemProvider(lang, {
        provideCompletionItems: () => {
          return {
            suggestions: suggestions.map(s => ({
              ...s,
              kind: s.kind,
              insertTextRules: s.insertTextRules
            }))
          };
        }
      });
    });
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full transition-all duration-300">
      <Editor
        height={isFullscreen ? "calc(100vh - 8rem)" : "calc(100vh - 10rem)"}
        defaultLanguage={getMonacoLanguage(language)}
        language={getMonacoLanguage(language)}
        value={code}
        theme={theme}
        onChange={onChange}
        beforeMount={defineThemes}
        onMount={handleEditorDidMount}
        options={{
          ...defaultOptions,
          ...editorOptions,
        }}
      />
    </div>
  );
} 