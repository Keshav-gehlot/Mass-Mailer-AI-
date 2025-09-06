
export interface Recipient {
  id: string;
  email: string;
  name: string;
  [key: string]: string; // For additional dynamic columns
}

export enum Status {
  QUEUED = 'QUEUED',
  SENDING = 'SENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

export interface EmailStatus {
  status: Status;
  error?: string;
  personalizedContent?: {
    subject: string;
    body: string;
  };
}
