import React, { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { EmailList } from './components/EmailList';
import { EmailEditor } from './components/EmailEditor';
import { EmailPreview } from './components/EmailPreview';
import { CredentialsForm } from './components/CredentialsForm';
import { Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { EmailContact, EmailCredentials } from './types';

const defaultHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { padding: 20px; }
    .header { color: #333; }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="header">Hello!</h1>
    <p>This is your email content.</p>
  </div>
</body>
</html>
`;

function App() {
  const [emails, setEmails] = useState<EmailContact[]>([]);
  const [htmlContent, setHtmlContent] = useState(defaultHtmlContent);
  const [credentials, setCredentials] = useState<EmailCredentials>({
    email: '',
    appPassword: '',
  });
  const [sending, setSending] = useState(false);

  const handleEmailsFound = (newEmails: EmailContact[]) => {
    setEmails((prev) => [...prev, ...newEmails]);
  };

  const toggleEmail = (email: string) => {
    setEmails((prev) =>
      prev.map((contact) =>
        contact.email === email
          ? { ...contact, selected: !contact.selected }
          : contact
      )
    );
  };

  const handleSendEmails = async () => {
    const selectedEmails = emails.filter((contact) => contact.selected);
    
    if (!selectedEmails.length) {
      toast.error('Please select at least one recipient');
      return;
    }

    if (!credentials.email || !credentials.appPassword) {
      toast.error('Please provide sender credentials');
      return;
    }

    setSending(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: selectedEmails.map((contact) => contact.email),
          html: htmlContent,
          credentials,
        }),
      });

      if (!response.ok) throw new Error('Failed to send emails');
      
      toast.success('Emails sent successfully!');
    } catch (error) {
      toast.error('Failed to send emails. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Mail className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Email Campaign Manager
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FileUploader onEmailsFound={handleEmailsFound} />
            <EmailList emails={emails} onToggleEmail={toggleEmail} />
            <CredentialsForm
              credentials={credentials}
              onCredentialsChange={setCredentials}
            />
            <button
              onClick={handleSendEmails}
              disabled={sending}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Emails'}
            </button>
          </div>

          <div>
            <EmailEditor
              htmlContent={htmlContent}
              onContentChange={setHtmlContent}
            />
            <EmailPreview htmlContent={htmlContent} />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;