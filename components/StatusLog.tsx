import React from 'react';
import type { Recipient, EmailStatus } from '../types';
import { Status } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { ClockIcon } from './icons/ClockIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { EyeIcon } from './icons/EyeIcon';

interface StatusLogProps {
  statuses: Map<string, EmailStatus>;
  recipients: Recipient[];
  onViewEmail: (recipientId: string) => void;
}

const StatusIcon: React.FC<{ status: Status }> = ({ status }) => {
  switch (status) {
    case Status.QUEUED:
      return <ClockIcon className="w-5 h-5 text-slate-500" />;
    case Status.SENDING:
      return (
        <div role="status">
          <PaperAirplaneIcon className="w-5 h-5 text-sky-400 animate-pulse" />
          <span className="sr-only">Sending...</span>
        </div>
      );
    case Status.SENT:
      return <CheckCircleIcon className="w-5 h-5 text-emerald-400" />;
    case Status.FAILED:
      return <XCircleIcon className="w-5 h-5 text-red-400" />;
    default:
      return null;
  }
};

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
    const baseClasses = "text-xs font-medium w-20 text-center px-2.5 py-1 rounded-full capitalize";
    switch (status) {
        case Status.QUEUED:
            return <p className={`${baseClasses} bg-slate-700 text-slate-300`}>{status.toLowerCase()}</p>;
        case Status.SENDING:
            return <p className={`${baseClasses} bg-sky-500/20 text-sky-400`}>{status.toLowerCase()}</p>;
        case Status.SENT:
            return <p className={`${baseClasses} bg-emerald-500/20 text-emerald-400`}>{status.toLowerCase()}</p>;
        case Status.FAILED:
            return <p className={`${baseClasses} bg-red-500/20 text-red-400`}>{status.toLowerCase()}</p>;
        default:
            return <p className={`${baseClasses} bg-slate-800 text-slate-400`}>Pending</p>;
    }
};

const StatusLog: React.FC<StatusLogProps> = ({ statuses, recipients, onViewEmail }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4">Processing Status</h2>
      <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
        {recipients.length === 0 ? (
          <p className="text-center text-slate-500 py-4">No emails to process yet.</p>
        ) : (
          recipients.map(recipient => {
            const statusInfo = statuses.get(recipient.id);
            return (
              <div key={recipient.id} className="flex items-center justify-between bg-slate-800 p-3 rounded-md hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  {statusInfo ? <StatusIcon status={statusInfo.status} /> : <ClockIcon className="w-5 h-5 text-slate-600" />}
                  <div className="truncate">
                    <p className="text-sm font-medium text-slate-200 truncate">{recipient.email}</p>
                    {statusInfo?.status === Status.FAILED && (
                       <p className="text-xs text-red-400 truncate" title={statusInfo.error}>{statusInfo.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {statusInfo?.status === Status.SENT && statusInfo.personalizedContent && (
                        <button
                            onClick={() => onViewEmail(recipient.id)}
                            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-600 hover:text-white transition-colors"
                            aria-label={`View email for ${recipient.email}`}
                            title="View Email"
                        >
                            <EyeIcon className="w-5 h-5" />
                        </button>
                    )}
                    <StatusBadge status={statusInfo?.status || Status.QUEUED} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StatusLog;