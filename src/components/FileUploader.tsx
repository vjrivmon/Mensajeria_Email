import React from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { EmailContact } from '../types';

interface FileUploaderProps {
  onEmailsFound: (emails: EmailContact[]) => void;
}

export function FileUploader({ onEmailsFound }: FileUploaderProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      Papa.parse(file, {
        complete: (results) => {
          const emails = new Set<string>();
          
          results.data.forEach((row: any) => {
            Object.values(row).forEach((value) => {
              const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
              const matches = String(value).match(emailRegex);
              if (matches) {
                matches.forEach((email) => emails.add(email));
              }
            });
          });

          const emailContacts: EmailContact[] = Array.from(emails).map((email) => ({
            email,
            selected: true,
          }));

          onEmailsFound(emailContacts);
        },
      });
    });
  };

  return (
    <div className="w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">CSV files</p>
        </div>
        <input
          type="file"
          className="hidden"
          multiple
          accept=".csv"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}