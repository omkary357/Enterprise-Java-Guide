import React, { useState } from 'react';
import CodeViewer from './CodeViewer';
import { Lightbulb, Workflow, CheckCircle, Database, AlertCircle, Copy, Check, ChevronRight } from 'lucide-react';

export default function PracticalDetail({ practical }) {
  const [copiedSql, setCopiedSql] = useState(false);

  if (!practical) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500">
        <AlertCircle className="w-12 h-12 mb-3 text-slate-600" />
        <p>Select a practical from the list to view its details.</p>
      </div>
    );
  }

  const handleCopySql = () => {
    if (practical.sql) {
      navigator.clipboard.writeText(practical.sql);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  const categoryColors = {
    Servlets: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    JDBC: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    JSP: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    EJB: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    JPA: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    Hibernate: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-sm font-mono font-bold px-3 py-1 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg">
            Practical {practical.id}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${categoryColors[practical.category] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
            {practical.category}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {practical.title}
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          <strong className="text-slate-200">Aim: </strong>
          {practical.aim}
        </p>
      </div>

      {/* Mental Model - Zero Memory Formula */}
      <div className="bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-indigo-300 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Core Mental Model (How to solve without memorizing)</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed pl-6">
          {practical.mentalModel}
        </p>
      </div>

      {/* Program Flow Pipeline */}
      {practical.flowSteps && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4 text-slate-200 font-semibold text-sm">
            <Workflow className="w-4 h-4 text-cyan-400" />
            <span>Execution Flow & Architecture</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {practical.flowSteps.map((s, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 relative">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center border border-cyan-500/30">
                    {s.step}
                  </span>
                  <span className="font-semibold text-xs text-white">{s.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NetBeans 8.2 & Java DB Quick Steps */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3 text-slate-200 font-semibold text-sm">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>NetBeans 8.2 Project Setup Checklist</span>
        </div>
        <ul className="space-y-2">
          {practical.netbeansSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* SQL Table & Sample Data (if practical uses database) */}
      {practical.sql && (
        <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <Database className="w-4 h-4" />
              <span>Java DB SQL Script (Run via Right Click Connection -&gt; Execute Command)</span>
            </div>
            <button
              onClick={handleCopySql}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 rounded-lg transition-colors"
            >
              {copiedSql ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto">
            {practical.sql}
          </pre>
        </div>
      )}

      {/* Code Viewer with Tabs */}
      <div>
        <h3 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
          <span>Implementation Files</span>
          <span className="text-xs text-slate-500">({practical.files.length} file{practical.files.length > 1 ? 's' : ''})</span>
        </h3>
        <CodeViewer files={practical.files} />
      </div>

      {/* Key Examination Pitfalls & Tips */}
      {practical.keyPoints && practical.keyPoints.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2 text-amber-300 font-semibold text-sm">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Key Concepts & Common Exam Traps</span>
          </div>
          <ul className="space-y-1.5 pl-6 list-disc text-xs sm:text-sm text-slate-300">
            {practical.keyPoints.map((kp, idx) => (
              <li key={idx}>{kp}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
