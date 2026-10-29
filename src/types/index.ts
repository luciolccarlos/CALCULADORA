export type CodeVariantId = 'basic' | 'functions' | 'loop';

export interface CodeVariant {
  id: CodeVariantId;
  title: string;
  badge: string;
  description: string;
  code: string;
  features: string[];
}

export interface ConceptBlock {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  explanation: string;
  codeSnippet: string;
  tip: string;
  pitfall: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TerminalLog {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'error' | 'success';
  text: string;
}

export type StepState = {
  stepIndex: number;
  num1?: number;
  operator?: string;
  num2?: number;
  result?: number | string;
  activeLine?: number;
};
