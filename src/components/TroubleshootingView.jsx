import React, { useState } from 'react';
import { troubleshootingItems } from '../data/practicalsData';
import { AlertTriangle, Wrench, Search, CheckCircle } from 'lucide-react';

export default function TroubleshootingView() {
  const [filter, setFilter] = useState('');

  const filtered = troubleshootingItems.filter(item =>
    item.error.toLowerCase().includes(filter.toLowerCase()) ||
    item.cause.toLowerCase().includes(filter.toLowerCase()) ||
    item.solution.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-950/60 to-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-sm font-semibold mb-1">
          <AlertTriangle className="w-4 h-4" />
          <span>DIAGNOSTICS &amp; ERROR MATRIX</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Practical Troubleshooting &amp; Rapid Fixes
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          The most frequent runtime and compile-time issues encountered in NetBeans 8.2, GlassFish 4.1.1, and Java DB, with instant step-by-step resolution.
        </p>

        {/* Filter input */}
        <div className="mt-4 relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search error keywords (e.g. ClassNotFound, 404, port 1527, JSTL)..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Error Cards */}
      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-mono font-bold text-rose-300 break-words">
                  {item.error}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="font-semibold text-slate-400 block mb-1">Root Cause:</span>
                <p className="text-slate-300 leading-relaxed">{item.cause}</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-1">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>NetBeans 8.2 Fix:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{item.solution}</p>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No matching errors found for "{filter}".
          </div>
        )}
      </div>

    </div>
  );
}
