import React, { useState } from 'react';
import { Copy, Check, Terminal, HelpCircle, Code2, Play } from 'lucide-react';
import { CodeVariant, CodeVariantId } from '../types';

interface CodeViewerProps {
  variants: CodeVariant[];
  currentVariantId: CodeVariantId;
  onSelectVariant: (id: CodeVariantId) => void;
  activeLine?: number;
  onOpenHowToRun: () => void;
  onRunScript: () => void;
  isRunning: boolean;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  variants,
  currentVariantId,
  onSelectVariant,
  activeLine,
  onOpenHowToRun,
  onRunScript,
  isRunning,
}) => {
  const [copied, setCopied] = useState(false);
  const currentVariant = variants.find(v => v.id === currentVariantId) || variants[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentVariant.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const lines = currentVariant.code.split('\n');

  // Simple token highlighter for beginner Python code
  const renderHighlightedLine = (line: string) => {
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }

    // Split comments from code
    const commentIndex = line.indexOf('#');
    let codePart = commentIndex !== -1 ? line.substring(0, commentIndex) : line;
    const commentPart = commentIndex !== -1 ? line.substring(commentIndex) : '';

    // Token substitutions using regex for syntax glow
    const tokens = codePart.split(/(\b(?:def|return|if|elif|else|while|True|False|try|except|isinstance|float|input|print|None|in|or|and)\b|f"[^"]*"|"[^"]*"|'[^']*'|\d+\.?\d*|[+\-*/=<>!]+|[()[\],:])/g);

    return (
      <>
        {tokens.map((token, i) => {
          if (!token) return null;

          if (['def', 'return', 'if', 'elif', 'else', 'while', 'try', 'except'].includes(token)) {
            return <span key={i} className="text-purple-400 font-semibold">{token}</span>;
          }
          if (['float', 'input', 'print', 'isinstance'].includes(token)) {
            return <span key={i} className="text-amber-300">{token}</span>;
          }
          if (['True', 'False', 'None'].includes(token)) {
            return <span key={i} className="text-emerald-400 font-semibold">{token}</span>;
          }
          if (['or', 'and', 'in'].includes(token)) {
            return <span key={i} className="text-purple-300 font-medium">{token}</span>;
          }
          if (token.startsWith('"') || token.startsWith("'") || token.startsWith('f"')) {
            return <span key={i} className="text-emerald-300">{token}</span>;
          }
          if (/^\d+\.?\d*$/.test(token)) {
            return <span key={i} className="text-amber-200 tabular-nums">{token}</span>;
          }
          if (['+', '-', '*', '/', '==', '!=', '='].includes(token)) {
            return <span key={i} className="text-cyan-400 font-medium">{token}</span>;
          }
          return <span key={i} className="text-slate-200">{token}</span>;
        })}
        {commentPart && <span className="text-slate-500 italic">{commentPart}</span>}
      </>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Top toolbar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Variant selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          {variants.map((variant) => {
            const isSelected = variant.id === currentVariantId;
            return (
              <button
                key={variant.id}
                onClick={() => onSelectVariant(variant.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {variant.title}
              </button>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRunScript}
            disabled={isRunning}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              isRunning
                ? 'bg-emerald-600/50 text-emerald-100 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm active:scale-95'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Em Execução...' : 'Rodar no Terminal'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700/80 transition-colors cursor-pointer whitespace-nowrap"
            title="Copiar código Python"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenHowToRun}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            title="Como rodar no terminal do seu computador"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Como rodar local</span>
          </button>
        </div>
      </div>

      {/* Description header */}
      <div className="px-5 py-3 bg-slate-950/40 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-amber-400" />
          <span className="font-medium text-slate-200">{currentVariant.badge}</span>
          <span aria-hidden="true">·</span>
          <span>{currentVariant.description}</span>
        </div>
        <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">
          {lines.length} linhas de código
        </span>
      </div>

      {/* Code Editor Body */}
      <div className="flex-1 overflow-auto bg-slate-950 font-mono text-xs sm:text-[13px] leading-6 p-4">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isCurrentActive = activeLine === lineNum;
              return (
                <tr
                  key={idx}
                  className={`group transition-colors ${
                    isCurrentActive
                      ? 'bg-amber-500/15 border-l-2 border-amber-400'
                      : 'hover:bg-slate-900/40'
                  }`}
                >
                  <td className="w-10 pr-4 text-right text-slate-600 select-none group-hover:text-slate-400 tabular-nums text-[11px]">
                    {lineNum}
                  </td>
                  <td className="pl-2 whitespace-pre font-mono">
                    {renderHighlightedLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
