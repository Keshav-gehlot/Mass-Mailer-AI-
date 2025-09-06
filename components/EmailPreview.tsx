import React, { useMemo } from 'react';
import type { Recipient } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface EmailPreviewProps {
  recipient: Recipient | null;
  recipients: Recipient[];
  onRecipientChange: (recipientId: string) => void;
  subjectTemplate: string;
  bodyTemplate: string;
  senderName: string;
  senderEmail: string;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  recipient,
  recipients,
  onRecipientChange,
  subjectTemplate,
  bodyTemplate,
  senderName,
  senderEmail,
}) => {

  const { personalizedSubject, personalizedBody } = useMemo(() => {
    if (!recipient) {
      return { personalizedSubject: subjectTemplate, personalizedBody: bodyTemplate };
    }
    
    let subject = subjectTemplate;
    let body = bodyTemplate;

    Object.keys(recipient).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(regex, recipient[key]);
      body = body.replace(regex, recipient[key]);
    });

    return { personalizedSubject: subject, personalizedBody: body };
  }, [recipient, subjectTemplate, bodyTemplate]);

  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Email Preview</h2>
        {recipients.length > 0 && (
          <select
            value={recipient?.id || ''}
            onChange={(e) => onRecipientChange(e.target.value)}
            className="bg-slate-900 border border-slate-600 rounded-md p-2 text-sm text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            {recipients.map((r) => (
              <option key={r.id} value={r.id}>
                {r.email}
              </option>
            ))}
          </select>
        )}
      </div>

      {!recipient ? (
        <div className="text-center py-10 text-slate-500">
          <p>Add recipients to see a preview.</p>
        </div>
      ) : (
        <>
            <div className="bg-slate-900 rounded-md border border-slate-700 p-4 space-y-4">
                <div className="flex items-baseline">
                    <span className="text-sm font-medium text-slate-400 w-20 flex-shrink-0">From: </span>
                    <span className="text-sm text-slate-200">{`${senderName} <${senderEmail}>`}</span>
                </div>
                <div className="flex items-baseline">
                    <span className="text-sm font-medium text-slate-400 w-20 flex-shrink-0">To: </span>
                    <span className="text-sm text-slate-200">{recipient.email}</span>
                </div>
                <div className="flex items-baseline">
                    <span className="text-sm font-medium text-slate-400 w-20 flex-shrink-0">Subject: </span>
                    <span className="text-sm text-white font-bold">{personalizedSubject}</span>
                </div>
                <div className="border-t border-slate-700 pt-4 mt-4">
                    <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{personalizedBody}</p>
                </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-500 mt-4 bg-slate-800 p-2 rounded-md">
                <SparklesIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-sky-500" />
                <span><strong>Note:</strong> This is a template preview. The final sent email will be further personalized by AI.</span>
            </div>
        </>
      )}
    </div>
  );
};

export default EmailPreview;