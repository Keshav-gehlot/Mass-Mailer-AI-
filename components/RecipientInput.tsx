import React, { useState, useCallback } from 'react';
import type { Recipient } from '../types';
import * as XLSX from 'xlsx';
import { UploadIcon } from './icons/UploadIcon';

interface RecipientInputProps {
  onRecipientsChange: (recipients: Recipient[]) => void;
}

const RecipientInput: React.FC<RecipientInputProps> = ({ onRecipientsChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [recipientCount, setRecipientCount] = useState<number>(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any[] = XLSX.utils.sheet_to_json(worksheet);

        if (json.length > 0 && !json[0].hasOwnProperty('email')) {
          setError('File must contain an "email" column.');
          onRecipientsChange([]);
          setRecipientCount(0);
          setFileName(null);
          return;
        }

        const recipients: Recipient[] = json
          .map((row, index) => ({
            id: `${row.email}-${index}`,
            ...row,
          }))
          .filter(r => r.email && r.email.includes('@'));

        if (recipients.length === 0 && json.length > 0) {
            setError('No valid rows with an email address found.');
        } else {
            setError(null);
        }
        onRecipientsChange(recipients);
        setRecipientCount(recipients.length);
        setFileName(file.name);
      } catch (err) {
        setError('Failed to parse the file. Please ensure it is a valid .xlsx, .xls, or .csv file.');
        onRecipientsChange([]);
        setRecipientCount(0);
        setFileName(null);
      }
    };
    reader.readAsBinaryString(file);
  }, [onRecipientsChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-2">
        Recipients
      </h2>
      <p className="text-sm text-slate-400 mb-4">
        Upload a .xlsx, .xls, or .csv file. It must include 'email' and 'name' columns.
      </p>
      <label
        htmlFor="file-upload"
        className={`flex justify-center w-full h-32 px-4 transition bg-slate-900 border-2 ${isDragging ? 'border-sky-400' : 'border-slate-600'} border-dashed rounded-md appearance-none cursor-pointer hover:border-slate-400 focus:outline-none`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <span className="flex flex-col items-center justify-center space-x-2">
          <UploadIcon className="w-8 h-8 text-slate-500" />
          <span className="font-medium text-slate-400 text-center">
            {fileName || 'Drop files to attach, or'}
            <span className="text-sky-400 underline ml-1">browse</span>
          </span>
        </span>
        <input id="file-upload" type="file" name="file_upload" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
      </label>

      <div className="mt-3 flex justify-between items-center">
        {error ? (
          <p className="text-red-400 text-sm">{error}</p>
        ) : (
          <p className="text-emerald-400 text-sm">{recipientCount > 0 ? `${recipientCount} valid recipients found.` : 'Ready for upload.'}</p>
        )}
      </div>
    </div>
  );
};

export default RecipientInput;