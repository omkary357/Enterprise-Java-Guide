import React, { useState } from 'react';
import { quizQuestions } from '../data/practicalsData';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

export default function QuizView() {
  const [userAnswers, setUserAnswers] = useState({});

  const handleSelect = (qId, optionIdx) => {
    if (userAnswers[qId] !== undefined) return; // already answered
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const resetQuiz = () => {
    setUserAnswers({});
  };

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(
    ([qId, selectedIdx]) => quizQuestions.find(q => q.id === parseInt(qId)).correct === selectedIdx
  ).length;

  return (
    <div className="space-y-6">
      
      {/* Header & Score Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 to-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-sm font-semibold mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>KNOWLEDGE CHECK &amp; VIVA DRILLS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Concept Verification Quiz
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Test your understanding of core concepts: RequestDispatcher, State Management, EJB types, and ORM.
          </p>
        </div>

        {/* Score Badge */}
        <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-4 flex items-center gap-4 shrink-0">
          <div className="text-center">
            <span className="text-xs text-slate-400 font-semibold uppercase">Score</span>
            <div className="text-2xl font-black text-purple-300 font-mono">
              {correctCount} / {quizQuestions.length}
            </div>
          </div>
          {answeredCount > 0 && (
            <button
              onClick={resetQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {quizQuestions.map((q, qIdx) => {
          const isAnswered = userAnswers[q.id] !== undefined;
          const selectedOption = userAnswers[q.id];
          const isCorrect = isAnswered && selectedOption === q.correct;

          return (
            <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-bold flex items-center justify-center border border-purple-500/30 shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 pl-9">
                {q.options.map((opt, optIdx) => {
                  let optStyle = 'bg-slate-950/80 border-slate-800/80 text-slate-300 hover:bg-slate-800 hover:border-slate-700';

                  if (isAnswered) {
                    if (optIdx === q.correct) {
                      optStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-medium';
                    } else if (optIdx === selectedOption) {
                      optStyle = 'bg-rose-950/40 border-rose-500/50 text-rose-300';
                    } else {
                      optStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={isAnswered}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && optIdx === q.correct && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && optIdx === selectedOption && optIdx !== q.correct && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswered && (
                <div className={`ml-9 p-3.5 rounded-xl border text-xs leading-relaxed ${
                  isCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                    : 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'
                }`}>
                  <strong className="block mb-1 font-semibold">
                    {isCorrect ? '✓ Correct Answer!' : 'Explanation:'}
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
