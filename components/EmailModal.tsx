import React, { useState } from 'react';
import type { Recipient } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderName: string;
  senderEmail: string;
  recipient: Recipient;
  emailContent: {
    subject: string;
    body: string;
  };
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  senderName,
  senderEmail,
  recipient,
  emailContent,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullEmailText = `From: ${senderName} <${senderEmail}>\nTo: ${recipient.email}\nSubject: ${emailContent.subject}\n\n${emailContent.body}`;
    navigator.clipboard.writeText(fullEmailText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
          <h2 id="email-modal-title" className="text-xl font-bold text-white">Generated Email</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <XCircleIcon className="w-7 h-7" />
          </button>
        </header>

        <main className="p-6 overflow-y-auto text-slate-300">
          <div className="space-y-4">
            <div className="flex items-baseline">
                <span className="font-semibold text-slate-400 w-20 flex-shrink-0">From: </span>
                <span>{`${senderName} <${senderEmail}>`}</span>
            </div>
            <div className="flex items-baseline">
                <span className="font-semibold text-slate-400 w-20 flex-shrink-0">To: </span>
                <span>{recipient.email}</span>
            </div>
            <div className="border-t border-b border-slate-700 py-4 my-4 flex items-baseline">
                <span className="font-semibold text-slate-400 w-20 flex-shrink-0">Subject: </span>
                <span className="font-bold text-white">{emailContent.subject}</span>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-slate-300 text-sm">
              {emailContent.body}
            </div>
          </div>
        </main>

        <footer className="p-4 border-t border-slate-700 flex justify-between items-center bg-slate-800/50 rounded-b-lg">
           <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-md transition-all duration-200 w-36 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-600 hover:bg-slate-500 text-white'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <ClipboardIcon className="w-5 h-5" />
                  Copy Text
                </>
              )}
            </button>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 transition-colors"
            >
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EmailModal;