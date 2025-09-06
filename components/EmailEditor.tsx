import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface EmailEditorProps {
  subject: string;
  onSubjectChange: (value: string) => void;
  body: string;
  onBodyChange: (value: string) => void;
  onGenerate: (prompt: string) => Promise<void>;
  isSending: boolean;
}

const EmailEditor: React.FC<EmailEditorProps> = ({
  subject,
  onSubjectChange,
  body,
  onBodyChange,
  onGenerate,
  isSending,
}) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateClick = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    await onGenerate(aiPrompt);
    setIsGenerating(false);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg shadow-lg flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-2">Compose Email</h2>
        <p className="text-sm text-slate-400">{'Use placeholders like `{{name}}` or `{{product}}` for personalization.'}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            disabled={isSending}
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-200 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-slate-400 mb-1">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
            disabled={isSending}
            rows={10}
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-200 transition-colors"
          />
        </div>
      </div>
      
      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-sky-400" />
            AI Content Generator
        </h3>
        <p className="text-sm text-slate-400 mb-3">Describe the email you want to write, and let AI create a draft for you.</p>
        <div className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., a launch email for our new product"
                disabled={isGenerating || isSending}
                className="flex-grow bg-slate-900 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-200 transition-colors"
            />
            <button
                onClick={handleGenerateClick}
                disabled={!aiPrompt || isGenerating || isSending}
                className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-sky-700 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-200"
            >
                {isGenerating ? 'Generating...' : 'Generate'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default EmailEditor;