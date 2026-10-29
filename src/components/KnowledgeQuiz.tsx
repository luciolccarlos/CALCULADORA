import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

export const KnowledgeQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === QUIZ_QUESTIONS.length;

  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Desafio Rápido: Teste seu Conhecimento
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Responda a 4 perguntas práticas sobre como o Python processa a calculadora.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">
            Respondidas: {answeredCount}/{QUIZ_QUESTIONS.length}
          </span>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recomeçar</span>
          </button>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const hasAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <p className="text-sm font-semibold text-slate-100 leading-snug">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2 pl-9">
                {q.options.map((option, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isTheCorrectOne = optIdx === q.correctIndex;

                  let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700';

                  if (showResults) {
                    if (isTheCorrectOne) {
                      optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40';
                    } else if (isSelected && !isTheCorrectOne) {
                      optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/40';
                    } else {
                      optionStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-500';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-amber-500/10 border-amber-400 text-amber-200 ring-1 ring-amber-400/40';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={showResults}
                      className={`px-3.5 py-2.5 rounded-lg border text-xs text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {showResults && isTheCorrectOne && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {showResults && isSelected && !isTheCorrectOne && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation when revealed */}
              {showResults && (
                <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                  isCorrect
                    ? 'bg-emerald-950/30 border border-emerald-900/40 text-emerald-300'
                    : 'bg-rose-950/30 border border-rose-900/40 text-rose-300'
                }`}>
                  <span className="font-bold">{isCorrect ? '✓ Correto! ' : '✕ Resposta explicada: '}</span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action / Result banner */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={!isAllAnswered}
            className={`w-full sm:w-auto px-6 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              isAllAnswered
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isAllAnswered ? 'Verificar Respostas' : `Responda todas as perguntas (${answeredCount}/${QUIZ_QUESTIONS.length})`}
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-between w-full gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white">
                Pontuação final: <span className="font-mono text-amber-400 text-base">{score}/{QUIZ_QUESTIONS.length}</span> acertos!
              </span>
              <span className="text-xs text-slate-400">
                {score === 4
                  ? 'Parabéns! Você dominou todos os fundamentos básicos!'
                  : 'Bom esforço! Revise as explicações acima para fixar os conceitos.'}
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
