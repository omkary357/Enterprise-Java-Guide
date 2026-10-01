import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';

export default function CodeViewer({ files }) {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) return null;
  const currentFile = files[selectedFileIndex] || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentFile.code.split('\n');

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* File Tabs & Copy Header */}
      <div className="flex items-center justify-between bg-slate-900/90 border-b border-slate-800 px-4 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {files.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFileIndex(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedFileIndex === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              {file.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60 ml-2 shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code with Line Numbers */}
      <div className="overflow-x-auto max-h-[520px] text-xs sm:text-sm font-mono p-4">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-slate-900/50">
                <td className="w-8 select-none text-right pr-4 text-slate-600 align-top">
                  {i + 1}
                </td>
                <td className="text-slate-200 whitespace-pre align-top font-mono">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
