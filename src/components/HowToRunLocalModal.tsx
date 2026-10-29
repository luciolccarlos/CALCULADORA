import React from 'react';
import { X, Terminal, Copy, Check, ExternalLink, Laptop } from 'lucide-react';

interface HowToRunLocalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToRunLocalModal: React.FC<HowToRunLocalModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(id);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Como Rodar no seu Computador
            </h3>
            <p className="text-xs text-slate-400">
              Guia rápido para executar o arquivo <code className="text-amber-400">calculadora.py</code> na sua máquina.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Step 1 */}
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span>Tenha o Python instalado</span>
            </div>
            <p className="text-slate-400 text-xs">
              Baixe a versão gratuita oficial no site do Python. Durante a instalação no Windows, marque a opção obrigatória: <strong>"Add python.exe to PATH"</strong>.
            </p>
            <div className="pt-1">
              <a
                href="https://www.python.org/downloads/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                <span>Acessar python.org/downloads</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <span>Salve o código em um arquivo</span>
            </div>
            <p className="text-slate-400 text-xs">
              Clique no botão <strong>"Baixar calculadora.py"</strong> no topo desta página, ou crie uma nova pasta e salve um arquivo de texto com o nome <code className="text-amber-400">calculadora.py</code>.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <span>Abra o Terminal / Prompt de Comando e Execute</span>
            </div>
            <p className="text-slate-400 text-xs">
              Navegue até a pasta onde salvou o arquivo e rode o comando:
            </p>
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded p-2.5 font-mono text-xs">
              <span className="text-emerald-400">python calculadora.py</span>
              <button
                onClick={() => handleCopy('cmd1', 'python calculadora.py')}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copiedStep === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-slate-500 text-[11px]">
              * No macOS ou Linux, o comando costuma ser <code className="text-slate-400 font-mono">python3 calculadora.py</code>.
            </p>
          </div>

          {/* Step 4: VS Code tip */}
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                4
              </span>
              <span>Dica de Editor Recomendado (VS Code)</span>
            </div>
            <p className="text-slate-400 text-xs">
              Se estiver usando o <strong>Visual Studio Code</strong>, instale a extensão oficial do Python da Microsoft e aperte o botão de Play (▶) no canto superior direito para rodar direto no terminal integrado!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Entendi, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
