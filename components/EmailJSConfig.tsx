import React from 'react';

interface EmailJSConfigProps {
  serviceId: string;
  onServiceIdChange: (value: string) => void;
  templateId: string;
  onTemplateIdChange: (value: string) => void;
  publicKey: string;
  onPublicKeyChange: (value: string) => void;
  isSending: boolean;
}

const EmailJSConfig: React.FC<EmailJSConfigProps> = ({
  serviceId,
  onServiceIdChange,
  templateId,
  onTemplateIdChange,
  publicKey,
  onPublicKeyChange,
  isSending,
}) => {
  return (
    <div className="bg-slate-800/50 border border-sky-500/30 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-2">Email Service Configuration</h2>
      <div className="text-sm text-slate-400 mb-4 space-y-3">
        <p>
          To send emails, this app uses{' '}
          <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline font-semibold">
            EmailJS
          </a>{' '}
          as a secure gateway. Follow these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 bg-slate-900/70 p-4 rounded-md border border-slate-700">
          <li>
            In EmailJS, connect your email service (e.g., Gmail) and get your <strong>Service ID</strong>.
          </li>
          <li>
            Create an Email Template and get its <strong>Template ID</strong>.
          </li>
          <li>
            <strong className="text-sky-300">Crucial:</strong> In the template's Settings tab, set "To Email" to{' '}
            <code className="bg-slate-700 text-amber-300 px-1 py-0.5 rounded text-xs">{`{{to_email}}`}</code>.
          </li>
          <li>
            Use{' '}
            <code className="bg-slate-700 text-amber-300 px-1 py-0.5 rounded text-xs">{`{{subject}}`}</code>,{' '}
            <code className="bg-slate-700 text-amber-300 px-1 py-0.5 rounded text-xs">{`{{body}}`}</code>, and{' '}
            <code className="bg-slate-700 text-amber-300 px-1 py-0.5 rounded text-xs">{`{{from_name}}`}</code> in the template.
          </li>
          <li>
            Find your <strong>Public Key</strong> in your EmailJS account settings.
          </li>
          <li>
            Paste the three values below.
          </li>
        </ol>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="emailjs-service-id" className="block text-sm font-medium text-slate-400 mb-1">
            Service ID
          </label>
          <input
            type="text"
            id="emailjs-service-id"
            value={serviceId}
            onChange={(e) => onServiceIdChange(e.target.value)}
            disabled={isSending}
            placeholder="Your EmailJS Service ID"
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-200 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="emailjs-template-id" className="block text-sm font-medium text-slate-400 mb-1">
            Template ID
          </label>
          <input
            type="text"
            id="emailjs-template-id"
            value={templateId}
            onChange={(e) => onTemplateIdChange(e.target.value)}
            disabled={isSending}
            placeholder="Your EmailJS Template ID"
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-200 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="emailjs-public-key" className="block text-sm font-medium text-slate-400 mb-1">
            Public Key
          </label>
          <input
            type="text"
            id="emailjs-public-key"
            value={publicKey}
            onChange={(e) => onPublicKeyChange(e.target.value)}
            disabled={isSending}
            placeholder="Your EmailJS Public Key"
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-200 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailJSConfig;