/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ExecutionInspector } from './components/ExecutionInspector';
import { ConceptsGuide } from './components/ConceptsGuide';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { HowToRunLocalModal } from './components/HowToRunLocalModal';
import { CODE_VARIANTS } from './data/calculatorCode';
import { CodeVariantId, TerminalLog } from './types';
import {
  ExecutionContext,
  createInitialContext,
  startScript,
  processUserInput
} from './utils/pythonRunner';
import { BookOpen, Terminal, Sparkles, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentVariantId, setCurrentVariantId] = useState<CodeVariantId>('basic');
  const [activeSection, setActiveSection] = useState<string>('code-runner');
  const [isHowToRunOpen, setIsHowToRunOpen] = useState(false);

  // Terminal state
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [context, setContext] = useState<ExecutionContext>(createInitialContext('basic'));
  const [isRunning, setIsRunning] = useState(false);

  // Inspector state
  const [inspectorState, setInspectorState] = useState<{
    num1?: number;
    operator?: string;
    num2?: number;
    result?: number | string;
    activeLine?: number;
  }>({
    num1: 15,
    operator: '+',
    num2: 25,
    result: 40,
    activeLine: 26
  });

  // Refs for section scrolling
  const codeRunnerRef = useRef<HTMLDivElement>(null);
  const conceptsRef = useRef<HTMLDivElement>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  // Auto-init terminal when variant changes
  const handleSelectVariant = (id: CodeVariantId) => {
    setCurrentVariantId(id);
    initSession(id);
  };

  const initSession = (variantId: CodeVariantId) => {
    const res = startScript(variantId);
    setLogs(res.logs);
    setContext(res.nextContext);
    setIsRunning(true);
    setInspectorState({
      num1: res.nextContext.state.num1,
      operator: res.nextContext.state.operator,
      num2: res.nextContext.state.num2,
      result: res.nextContext.state.result,
      activeLine: res.nextContext.state.activeCodeLine
    });
  };

  useEffect(() => {
    initSession('basic');
  }, []);

  const handleSendInput = (userInput: string) => {
    const res = processUserInput(userInput, context);
    setLogs(prev => [...prev, ...res.logs]);
    setContext(res.nextContext);

    if (res.completed) {
      setIsRunning(false);
    }

    setInspectorState({
      num1: res.nextContext.state.num1,
      operator: res.nextContext.state.operator,
      num2: res.nextContext.state.num2,
      result: res.nextContext.state.result,
      activeLine: res.nextContext.state.activeCodeLine
    });
  };

  const handleQuickRun = (n1: string, op: string, n2: string) => {
    // Restart session in basic variant and run through the steps smoothly
    setCurrentVariantId('basic');
    const step1 = startScript('basic');
    let currentCtx = step1.nextContext;
    const accumulatedLogs = [...step1.logs];

    // step 1: input n1
    const step2 = processUserInput(n1, currentCtx);
    currentCtx = step2.nextContext;
    accumulatedLogs.push(...step2.logs);

    // step 2: input op
    const step3 = processUserInput(op, currentCtx);
    currentCtx = step3.nextContext;
    accumulatedLogs.push(...step3.logs);

    // step 3: input n2
    const step4 = processUserInput(n2, currentCtx);
    currentCtx = step4.nextContext;
    accumulatedLogs.push(...step4.logs);

    setLogs(accumulatedLogs);
    setContext(currentCtx);
    setIsRunning(false);

    setInspectorState({
      num1: currentCtx.state.num1,
      operator: currentCtx.state.operator,
      num2: currentCtx.state.num2,
      result: currentCtx.state.result,
      activeLine: currentCtx.state.activeCodeLine
    });
  };

  const handleRestart = () => {
    initSession(currentVariantId);
  };

  const handleClear = () => {
    setLogs([]);
  };

  const handleDownload = () => {
    const currentVariant = CODE_VARIANTS.find(v => v.id === currentVariantId) || CODE_VARIANTS[0];
    const element = document.createElement('a');
    const file = new Blob([currentVariant.code], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'calculadora.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'code-runner') codeRunnerRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (section === 'concepts') conceptsRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (section === 'inspector') inspectorRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (section === 'quiz') quizRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSetSimulationValues = (n1: number, op: string, n2: number) => {
    let res: number | string;
    if (op === '+') res = n1 + n2;
    else if (op === '-') res = n1 - n2;
    else if (op === '*') res = n1 * n2;
    else res = n2 === 0 ? 'Divisão por zero não é permitida' : n1 / n2;

    setInspectorState({
      num1: n1,
      operator: op,
      num2: n2,
      result: res,
      activeLine: op === '+' ? 26 : op === '-' ? 30 : op === '*' ? 34 : 38
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        onDownload={handleDownload}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section with Context and Intent */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guia Passo a Passo para Iniciantes em Programação</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculadora Simples em Python
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Aprenda as quatro operações matemáticas básicas (<code className="text-amber-400 font-mono">+</code>,{' '}
            <code className="text-cyan-400 font-mono">-</code>,{' '}
            <code className="text-purple-400 font-mono">*</code>,{' '}
            <code className="text-emerald-400 font-mono">/</code>) com código limpo,
            execução direta no navegador e explicação detalhada de cada linha.
          </p>
        </div>

        {/* Section 1: Two-Zone Interactive Sandbox (Code Viewer + Live Terminal) */}
        <section ref={codeRunnerRef} id="code-runner" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Zone: Code Editor (7 cols on desktop) */}
            <div className="lg:col-span-7 h-[580px]">
              <CodeViewer
                variants={CODE_VARIANTS}
                currentVariantId={currentVariantId}
                onSelectVariant={handleSelectVariant}
                activeLine={inspectorState.activeLine}
                onOpenHowToRun={() => setIsHowToRunOpen(true)}
                onRunScript={handleRestart}
                isRunning={isRunning}
              />
            </div>

            {/* Right Zone: Interactive Terminal (5 cols on desktop) */}
            <div className="lg:col-span-5 h-[580px]">
              <InteractiveTerminal
                logs={logs}
                currentPrompt={context.currentPrompt}
                isWaitingInput={context.step === 'waiting_input'}
                onSendInput={handleSendInput}
                onRestart={handleRestart}
                onClear={handleClear}
                onQuickRun={handleQuickRun}
              />
            </div>
          </div>
        </section>

        {/* Section 2: In-Depth Component Explanations */}
        <section ref={conceptsRef} id="concepts">
          <ConceptsGuide />
        </section>

        {/* Section 3: Memory & Execution Inspector ("Modo Raio-X") */}
        <section ref={inspectorRef} id="inspector">
          <ExecutionInspector
            num1={inspectorState.num1}
            operator={inspectorState.operator}
            num2={inspectorState.num2}
            result={inspectorState.result}
            activeLine={inspectorState.activeLine}
            onSetSimulationValues={handleSetSimulationValues}
          />
        </section>

        {/* Section 4: Interactive Beginner Quiz */}
        <section ref={quizRef} id="quiz">
          <KnowledgeQuiz />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Python CalcLab · Criado para estudantes e iniciantes em programação.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsHowToRunOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Instruções de Instalação Local
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={handleDownload}
              className="hover:text-amber-400 transition-colors cursor-pointer font-semibold"
            >
              Baixar calculadora.py
            </button>
          </div>
        </div>
      </footer>

      {/* How to run locally modal */}
      <HowToRunLocalModal
        isOpen={isHowToRunOpen}
        onClose={() => setIsHowToRunOpen(false)}
      />
    </div>
  );
}
