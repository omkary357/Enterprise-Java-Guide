import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PracticalDetail from './components/PracticalDetail';
import UniversalFormulas from './components/UniversalFormulas';
import NetBeansSetupGuide from './components/NetBeansSetupGuide';
import TroubleshootingView from './components/TroubleshootingView';
import QuizView from './components/QuizView';
import { practicalsData } from './data/practicalsData';
import { BookOpen, Layers, Sparkles, ChevronRight, Filter } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('practicals');
  const [selectedPracticalId, setSelectedPracticalId] = useState('1A');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Servlets', 'JDBC', 'JSP', 'EJB', 'JPA', 'Hibernate'];

  // Filter practicals by search query and category
  const filteredPracticals = practicalsData.filter((p) => {
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.aim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedPractical =
    practicalsData.find((p) => p.id === selectedPracticalId) || filteredPracticals[0] || practicalsData[0];

  const categoryBadgeColors = {
    Servlets: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    JDBC: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    JSP: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    EJB: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    JPA: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    Hibernate: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: PRACTICALS EXPLORER */}
        {activeTab === 'practicals' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Sidebar: Practicals Directory */}
            <aside className="lg:col-span-4 xl:col-span-4 space-y-4">
              
              {/* Category Filter Pills */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2 px-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter by Technology:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        categoryFilter === cat
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Practicals List */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 shadow-lg max-h-[calc(100vh-250px)] overflow-y-auto space-y-1">
                {filteredPracticals.map((p) => {
                  const isSelected = p.id === selectedPractical.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPracticalId(p.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-indigo-600/20 border border-indigo-500/40 text-white shadow-md'
                          : 'hover:bg-slate-800/60 border border-transparent text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-9 h-9 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700 group-hover:border-slate-600'
                        }`}>
                          {p.id}
                        </span>
                        <div className="truncate">
                          <div className="text-xs sm:text-sm font-semibold truncate group-hover:text-white">
                            {p.title}
                          </div>
                          <span className={`inline-block mt-0.5 text-[10px] font-medium px-1.5 py-0.2 rounded border ${categoryBadgeColors[p.category] || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                            {p.category}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                      }`} />
                    </button>
                  );
                })}

                {filteredPracticals.length === 0 && (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No practicals matching "{searchQuery}".
                  </div>
                )}
              </div>

            </aside>

            {/* Right Pane: Selected Practical Blueprint */}
            <section className="lg:col-span-8 xl:col-span-8">
              <PracticalDetail practical={selectedPractical} />
            </section>

          </div>
        )}

        {/* TAB 2: ZERO-MEMORY FORMULAS */}
        {activeTab === 'formulas' && <UniversalFormulas />}

        {/* TAB 3: NETBEANS & JAVA DB SETUP */}
        {activeTab === 'netbeans' && <NetBeansSetupGuide />}

        {/* TAB 4: TROUBLESHOOTING MATRIX */}
        {activeTab === 'troubleshooting' && <TroubleshootingView />}

        {/* TAB 5: VIVA & CONCEPT QUIZ */}
        {activeTab === 'quiz' && <QuizView />}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        Enterprise Java Guide &bull; NetBeans 8.2 &amp; Java DB Reference &bull; Built for Rapid Exam &amp; Lab Execution
      </footer>

    </div>
  );
}
