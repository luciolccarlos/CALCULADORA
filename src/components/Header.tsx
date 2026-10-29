import React from 'react';
import { Download, Terminal } from 'lucide-react';

interface HeaderProps {
  onDownload: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownload, activeSection, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => onNavigate('code-runner')}
            className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              Python CalcLab
            </span>
          </button>

          {/* Zone 2: 4 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <button
              onClick={() => onNavigate('code-runner')}
              className={`whitespace-nowrap transition-colors hover:text-white ${
                activeSection === 'code-runner' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Código & Terminal
            </button>
            <button
              onClick={() => onNavigate('concepts')}
              className={`whitespace-nowrap transition-colors hover:text-white ${
                activeSection === 'concepts' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Explicações dos Componentes
            </button>
            <button
              onClick={() => onNavigate('inspector')}
              className={`whitespace-nowrap transition-colors hover:text-white ${
                activeSection === 'inspector' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Raio-X da Memória
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              className={`whitespace-nowrap transition-colors hover:text-white ${
                activeSection === 'quiz' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Desafio do Iniciante
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar calculadora.py</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
