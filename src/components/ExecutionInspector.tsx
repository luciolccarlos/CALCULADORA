import React from 'react';
import { Cpu, ArrowRight, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface ExecutionInspectorProps {
  num1?: number;
  operator?: string;
  num2?: number;
  result?: number | string;
  activeLine?: number;
  onSetSimulationValues: (n1: number, op: string, n2: number) => void;
}

export const ExecutionInspector: React.FC<ExecutionInspectorProps> = ({
  num1,
  operator,
  num2,
  result,
  activeLine,
  onSetSimulationValues,
}) => {
  const operations = [
    { symbol: '+', label: 'Adição', codeCondition: 'operacao == "+"', active: operator === '+' },
    { symbol: '-', label: 'Subtração', codeCondition: 'operacao == "-"', active: operator === '-' },
    { symbol: '*', label: 'Multiplicação', codeCondition: 'operacao == "*"', active: operator === '*' },
    { symbol: '/', label: 'Divisão', codeCondition: 'operacao == "/"', active: operator === '/' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-6">
      {/* Title & info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Raio-X da Memória e Fluxo de Execução
            </h3>
            <p className="text-xs text-slate-400">
              Veja em tempo real como o interpretador Python armazena variáveis e avalia as condições.
            </p>
          </div>
        </div>

        {/* Quick presets for inspector */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 text-[11px]">Exemplos:</span>
          <button
            onClick={() => onSetSimulationValues(20, '+', 15)}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 font-mono text-[11px] cursor-pointer"
          >
            20 + 15
          </button>
          <button
            onClick={() => onSetSimulationValues(50, '/', 2)}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 font-mono text-[11px] cursor-pointer"
          >
            50 / 2
          </button>
          <button
            onClick={() => onSetSimulationValues(10, '/', 0)}
            className="px-2 py-1 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded border border-rose-800/40 font-mono text-[11px] cursor-pointer"
          >
            10 / 0
          </button>
        </div>
      </div>

      {/* Grid of memory slots */}
      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Variáveis Armazenadas na Memória RAM</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Slot num1 */}
          <div className={`p-3.5 rounded-lg border transition-all ${
            num1 !== undefined
              ? 'bg-slate-950 border-amber-500/40 shadow-sm shadow-amber-500/5'
              : 'bg-slate-950/50 border-slate-800/80 opacity-60'
          }`}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-mono text-amber-400 font-bold">num1</span>
              <span className="text-[11px] text-slate-500 font-mono">tipo float</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {num1 !== undefined ? num1 : <span className="text-slate-600 text-sm">Não definido</span>}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {num1 !== undefined ? 'Convertido de string via float()' : 'Aguardando input()'}
            </div>
          </div>

          {/* Slot operacao */}
          <div className={`p-3.5 rounded-lg border transition-all ${
            operator !== undefined
              ? 'bg-slate-950 border-cyan-500/40 shadow-sm shadow-cyan-500/5'
              : 'bg-slate-950/50 border-slate-800/80 opacity-60'
          }`}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-mono text-cyan-400 font-bold">operacao</span>
              <span className="text-[11px] text-slate-500 font-mono">tipo str</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {operator !== undefined ? (
                <span className="text-cyan-300 font-mono">'{operator}'</span>
              ) : (
                <span className="text-slate-600 text-sm">Não definido</span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {operator !== undefined ? 'Símbolo matemático' : 'Aguardando input()'}
            </div>
          </div>

          {/* Slot num2 */}
          <div className={`p-3.5 rounded-lg border transition-all ${
            num2 !== undefined
              ? 'bg-slate-950 border-purple-500/40 shadow-sm shadow-purple-500/5'
              : 'bg-slate-950/50 border-slate-800/80 opacity-60'
          }`}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-mono text-purple-400 font-bold">num2</span>
              <span className="text-[11px] text-slate-500 font-mono">tipo float</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {num2 !== undefined ? num2 : <span className="text-slate-600 text-sm">Não definido</span>}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {num2 !== undefined ? (
                num2 === 0 ? (
                  <span className="text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Divisor zero!
                  </span>
                ) : (
                  'Divisor / Segundo valor'
                )
              ) : (
                'Aguardando input()'
              )}
            </div>
          </div>

          {/* Slot resultado */}
          <div className={`p-3.5 rounded-lg border transition-all ${
            result !== undefined
              ? 'bg-slate-950 border-emerald-500/40 shadow-sm shadow-emerald-500/5'
              : 'bg-slate-950/50 border-slate-800/80 opacity-60'
          }`}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-mono text-emerald-400 font-bold">resultado</span>
              <span className="text-[11px] text-slate-500 font-mono">
                {typeof result === 'number' ? 'tipo float' : 'saída'}
              </span>
            </div>
            <div className="text-lg font-mono font-bold text-white truncate">
              {result !== undefined ? (
                typeof result === 'number' ? (
                  <span className="text-emerald-400">{result}</span>
                ) : (
                  <span className="text-rose-400 text-sm">{result}</span>
                )
              ) : (
                <span className="text-slate-600 text-sm">Aguardando cálculo</span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {result !== undefined ? 'Pronto para exibição' : 'Avaliado na condicional'}
            </div>
          </div>
        </div>
      </div>

      {/* Decision branching visualization */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Decisão Lógica Condicional (Qual caminho foi executado?)</span>
          {activeLine && (
            <span className="text-amber-400 font-mono text-[11px]">
              Linha em execução no script: #{activeLine}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {operations.map((op) => {
            const isChosen = op.active;
            return (
              <div
                key={op.symbol}
                className={`p-3 rounded-lg border text-xs transition-all ${
                  isChosen
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-xs">
                      {op.symbol}
                    </span>
                    <span className="font-semibold text-slate-200">{op.label}</span>
                  </div>
                  {isChosen && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>

                <div className="font-mono text-[11px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded">
                  {op.codeCondition}
                </div>

                <div className="mt-2 text-[11px] text-slate-400">
                  {isChosen ? (
                    <span className="text-emerald-400 font-medium">Condição Verdadeira (True)</span>
                  ) : (
                    <span>Ignorado (False)</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
