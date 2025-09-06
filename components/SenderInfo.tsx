import React from 'react';

interface SenderInfoProps {
  senderName: string;
  onSenderNameChange: (value: string) => void;
  senderEmail: string;
  onSenderEmailChange: (value: string) => void;
  isSending: boolean;
}

const SenderInfo: React.FC<SenderInfoProps> = ({
  senderName,
  onSenderNameChange,
  senderEmail,
  onSenderEmailChange,
  isSending,
}) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4">Sender Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="sender-name" className="block text-sm font-medium text-slate-400 mb-1">
            From Name
          </label>
          <input
            type="text"
            id="sender-name"
            value={senderName}
            onChange={(e) => onSenderNameChange(e.target.value)}
            disabled={isSending}
            placeholder="Your Name"
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-200 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="sender-email" className="block text-sm font-medium text-slate-400 mb-1">
            From Email
          </label>
          <input
            type="email"
            id="sender-email"
            value={senderEmail}
            onChange={(e) => onSenderEmailChange(e.target.value)}
            disabled={isSending}
            placeholder="you@example.com"
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-200 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default SenderInfo;