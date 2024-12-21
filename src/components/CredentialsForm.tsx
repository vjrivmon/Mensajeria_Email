import React from 'react';
import { EmailCredentials } from '../types';

interface CredentialsFormProps {
  credentials: EmailCredentials;
  onCredentialsChange: (credentials: EmailCredentials) => void;
}

export function CredentialsForm({ credentials, onCredentialsChange }: CredentialsFormProps) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Sender Credentials</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Gmail Address</label>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) =>
              onCredentialsChange({ ...credentials, email: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            App Password
            <a
              href="https://support.google.com/accounts/answer/185833?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
            >
              (How to get an App Password?)
            </a>
          </label>
          <input
            type="password"
            value={credentials.appPassword}
            onChange={(e) =>
              onCredentialsChange({ ...credentials, appPassword: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}