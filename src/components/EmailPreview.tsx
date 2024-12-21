import React from 'react';

interface EmailPreviewProps {
  htmlContent: string;
}

export function EmailPreview({ htmlContent }: EmailPreviewProps) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Preview</h2>
      <div className="border rounded-lg p-4 bg-white">
        <iframe
          srcDoc={htmlContent}
          title="Email Preview"
          className="w-full min-h-[400px] border-0"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}