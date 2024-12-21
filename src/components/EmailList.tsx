import React from 'react';
import { EmailContact } from '../types';

interface EmailListProps {
  emails: EmailContact[];
  onToggleEmail: (email: string) => void;
}

export function EmailList({ emails, onToggleEmail }: EmailListProps) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Recipients ({emails.filter(e => e.selected).length} selected)</h2>
      <div className="max-h-60 overflow-y-auto border rounded-lg">
        {emails.map((contact) => (
          <div
            key={contact.email}
            className="flex items-center p-3 hover:bg-gray-50 border-b last:border-b-0"
          >
            <input
              type="checkbox"
              checked={contact.selected}
              onChange={() => onToggleEmail(contact.email)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="ml-3">{contact.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}