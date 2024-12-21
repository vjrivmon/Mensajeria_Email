import React from 'react';
import Editor from '@monaco-editor/react';

interface EmailEditorProps {
  htmlContent: string;
  onContentChange: (content: string) => void;
}

export function EmailEditor({ htmlContent, onContentChange }: EmailEditorProps) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Email Content</h2>
      <div className="border rounded-lg overflow-hidden">
        <Editor
          height="400px"
          defaultLanguage="html"
          value={htmlContent}
          onChange={(value) => onContentChange(value || '')}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>
    </div>
  );
}