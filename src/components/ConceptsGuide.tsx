import React, { useState } from 'react';
import {
  Terminal,
  Calculator,
  GitBranch,
  ShieldAlert,
  Boxes,
  Sparkles,
  CheckCircle,
  AlertOctagon,
  Copy,
  Check
} from 'lucide-react';
import { CONCEPTS } from '../data/explanations';
import { ConceptBlock } from '../types';

export const ConceptsGuide: React.FC = () => {
  const [selectedConceptId, setSelectedConceptId] = useState<string>(CONCEPTS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedConcept = CONCEPTS.find(c => c.id === selectedConceptId) || CONCEPTS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-4 h-4 text-amber-400" />;
      case 'Calculator': return <Calculator className="w-4 h-4 text-cyan-400" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4 text-purple-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'Boxes': return <Boxes className="w-4 h-4 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-300" />;
      default: return <Terminal className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleCopySnippet = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Explicação dos Principais Componentes do Código
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Para quem está começando a programar, cada linha de código tem um propósito bem definido.
          Explore abaixo cada um dos blocos essenciais que fazem a calculadora funcionar:
        </p>
      </div>

      {/* Concept Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {CONCEPTS.map((concept) => {
          const isSelected = concept.id === selectedConceptId;
          return (
            <button
              key={concept.id}
              onClick={() => setSelectedConceptId(concept.id)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                isSelected
                  ? 'bg-slate-800 border-amber-400/80 shadow-sm ring-1 ring-amber-400/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                {getIcon(concept.iconName)}
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </div>
              <span className={`text-xs font-semibold leading-tight line-clamp-2 ${
                isSelected ? 'text-white' : 'text-slate-300'
              }`}>
                {concept.title.replace(/^\d+\.\s*/, '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Concept In-Depth Detail Card */}
      <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-6 space-y-5">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {getIcon(selectedConcept.iconName)}
              <h3 className="text-lg font-bold text-white">
                {selectedConcept.title}
              </h3>
            </div>
            <p className="text-sm text-amber-400/90 font-medium">
              {selectedConcept.summary}
            </p>
          </div>
        </div>

        {/* Detailed Explanation Text */}
        <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
          {selectedConcept.explanation}
        </div>

        {/* Code Snippet Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px] text-amber-400">Exemplo Prático em Python</span>
            <button
              onClick={() => handleCopySnippet(selectedConcept.id, selectedConcept.codeSnippet)}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedId === selectedConcept.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Exemplo</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
            <code>{selectedConcept.codeSnippet}</code>
          </pre>
        </div>

        {/* Tips & Pitfalls split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Pro tip */}
          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1.5">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Dica de Ouro</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {selectedConcept.tip}
            </p>
          </div>

          {/* Pitfall */}
          <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-semibold mb-1.5">
              <AlertOctagon className="w-4 h-4 shrink-0" />
              <span>Armadilha de Iniciante</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {selectedConcept.pitfall}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
