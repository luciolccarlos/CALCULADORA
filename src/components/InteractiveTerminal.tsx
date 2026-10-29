import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, RotateCcw, Trash2, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { TerminalLog } from '../types';

interface InteractiveTerminalProps {
  logs: TerminalLog[];
  currentPrompt: string;
  isWaitingInput: boolean;
  onSendInput: (input: string) => void;
  onRestart: () => void;
  onClear: () => void;
  onQuickRun: (num1: string, op: string, num2: string) => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  logs,
  currentPrompt,
  isWaitingInput,
  onSendInput,
  onRestart,
  onClear,
  onQuickRun,
}) => {
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, currentPrompt]);

  // Focus input when waiting for user entry
  useEffect(() => {
    if (isWaitingInput) {
      inputRef.current?.focus();
    }
  }, [isWaitingInput, currentPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWaitingInput) return;
    onSendInput(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* OS-like colored window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono font-medium text-slate-300 ml-2">
            Terminal Python 3.12 (Interativo)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
            title="Reiniciar execução do script"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reiniciar</span>
          </button>
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
            title="Limpar saídas do console"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Limpar</span>
          </button>
        </div>
      </div>

      {/* Quick Test Bar for Beginners */}
      <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs text-slate-400">
        <span className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-400" /> Testes Rápidos:
        </span>
        <button
          onClick={() => onQuickRun('15', '+', '25')}
          className="shrink-0 px-2 py-1 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700/60 transition-colors cursor-pointer font-mono text-[11px]"
        >
          15 + 25
        </button>
        <button
          onClick={() => onQuickRun('7.5', '*', '4')}
          className="shrink-0 px-2 py-1 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700/60 transition-colors cursor-pointer font-mono text-[11px]"
        >
          7.5 * 4
        </button>
        <button
          onClick={() => onQuickRun('100', '/', '4')}
          className="shrink-0 px-2 py-1 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700/60 transition-colors cursor-pointer font-mono text-[11px]"
        >
          100 / 4
        </button>
        <button
          onClick={() => onQuickRun('10', '/', '0')}
          className="shrink-0 px-2 py-1 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded border border-rose-800/40 transition-colors cursor-pointer font-mono text-[11px]"
          title="Testar como o código trata divisão por zero!"
        >
          10 / 0 (Zero)
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="flex-1 p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-y-auto space-y-1">
        {logs.length === 0 ? (
          <div className="text-slate-500 italic py-8 text-center flex flex-col items-center gap-2">
            <TerminalIcon className="w-8 h-8 text-slate-600" />
            <p>O terminal está pronto.</p>
            <p className="text-xs">Clique em &ldquo;Rodar no Terminal&rdquo; ou use os botões de Testes Rápidos acima.</p>
          </div>
        ) : (
          logs.map((log) => {
            if (log.type === 'system') {
              return (
                <div key={log.id} className="text-amber-400 font-medium flex items-center gap-1.5 py-0.5">
                  <span className="text-slate-500">$</span>
                  <span>{log.text}</span>
                </div>
              );
            }
            if (log.type === 'prompt') {
              return (
                <div key={log.id} className="text-slate-300 font-semibold py-0.5">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'input') {
              return (
                <div key={log.id} className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <span className="text-slate-500">&gt;</span>
                  <span>{log.text}</span>
                </div>
              );
            }
            if (log.type === 'error') {
              return (
                <div key={log.id} className="text-rose-400 font-medium bg-rose-950/20 px-2 py-1 rounded border border-rose-900/30 my-1">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'success') {
              return (
                <div key={log.id} className="text-emerald-400 font-semibold bg-emerald-950/20 px-2 py-1 rounded border border-emerald-900/30 my-1">
                  {log.text}
                </div>
              );
            }
            return (
              <div key={log.id} className="text-slate-300">
                {log.text}
              </div>
            );
          })
        )}

        {/* Active prompt indicator */}
        {isWaitingInput && currentPrompt && (
          <div className="flex items-center gap-1 text-amber-300 font-semibold pt-1">
            <span className="animate-pulse">&gt;</span>
            <span>{currentPrompt}</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Input Form at bottom */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
      >
        <span className="text-amber-400 font-mono font-bold text-sm select-none">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!isWaitingInput}
          placeholder={
            isWaitingInput
              ? 'Digite o valor e pressione Enter...'
              : 'Clique em "Rodar no Terminal" para iniciar uma sessão...'
          }
          className="flex-1 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs sm:text-sm font-mono px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!isWaitingInput}
          className="px-3 py-2 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed shrink-0"
        >
          <span className="hidden sm:inline">Enviar</span>
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
