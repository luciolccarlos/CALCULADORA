import { CodeVariantId, TerminalLog } from '../types';

export interface ExecutionContext {
  variant: CodeVariantId;
  step: 'idle' | 'waiting_input' | 'running' | 'completed';
  currentPrompt: string;
  expectedField: 'num1' | 'operator' | 'num2' | 'menu_choice' | 'loop_choice' | null;
  state: {
    num1?: number;
    operator?: string;
    num2?: number;
    result?: number | string;
    loopActive?: boolean;
    activeCodeLine?: number;
  };
}

export function createInitialContext(variant: CodeVariantId): ExecutionContext {
  return {
    variant,
    step: 'idle',
    currentPrompt: '',
    expectedField: null,
    state: {
      loopActive: variant === 'loop',
      activeCodeLine: undefined
    }
  };
}

export interface StepResult {
  nextContext: ExecutionContext;
  logs: TerminalLog[];
  completed: boolean;
}

export function startScript(variant: CodeVariantId): StepResult {
  const logs: TerminalLog[] = [];
  const addLog = (type: TerminalLog['type'], text: string) => {
    logs.push({ id: Math.random().toString(36).substring(2, 9), type, text });
  };

  addLog('system', `python3 calculadora_${variant}.py`);

  if (variant === 'basic') {
    addLog('output', '===================================');
    addLog('output', '     CALCULADORA BÁSICA EM PYTHON    ');
    addLog('output', '===================================');
    addLog('prompt', 'Digite o primeiro número: ');

    return {
      nextContext: {
        variant,
        step: 'waiting_input',
        currentPrompt: 'Digite o primeiro número: ',
        expectedField: 'num1',
        state: { activeCodeLine: 12 }
      },
      logs,
      completed: false
    };
  }

  if (variant === 'functions') {
    addLog('output', '========================================');
    addLog('output', '    CALCULADORA MODULAR EM PYTHON');
    addLog('output', '========================================');
    addLog('prompt', 'Digite o 1º número: ');

    return {
      nextContext: {
        variant,
        step: 'waiting_input',
        currentPrompt: 'Digite o 1º número: ',
        expectedField: 'num1',
        state: { activeCodeLine: 28 }
      },
      logs,
      completed: false
    };
  }

  // Variant 'loop'
  addLog('output', '=== BEM-VINDO À CALCULADORA CONTÍNUA ===');
  addLog('output', "Faça quantas contas desejar. Para encerrar, digite 'sair'.");
  addLog('output', '----------------------------------------');
  addLog('prompt', "Pressione ENTER para calcular ou digite 's' para sair: ");

  return {
    nextContext: {
      variant,
      step: 'waiting_input',
      currentPrompt: "Pressione ENTER para calcular ou digite 's' para sair: ",
      expectedField: 'loop_choice',
      state: { loopActive: true, activeCodeLine: 24 }
    },
    logs,
    completed: false
  };
}

export function processUserInput(input: string, context: ExecutionContext): StepResult {
  const trimmed = input.trim();
  const logs: TerminalLog[] = [];
  const addLog = (type: TerminalLog['type'], text: string) => {
    logs.push({ id: Math.random().toString(36).substring(2, 9), type, text });
  };

  // Log user typed input
  addLog('input', trimmed === '' && context.expectedField === 'loop_choice' ? '[ENTER]' : trimmed);

  const { variant, expectedField, state } = context;

  // -------------------------------------------------------------
  // VARIANT: BASIC
  // -------------------------------------------------------------
  if (variant === 'basic') {
    if (expectedField === 'num1') {
      const val = parseFloat(trimmed.replace(',', '.'));
      if (isNaN(val)) {
        addLog('error', `ValueError: could not convert string to float: '${trimmed}'`);
        addLog('prompt', 'Digite o primeiro número: ');
        return {
          nextContext: context,
          logs,
          completed: false
        };
      }

      addLog('output', '\nOperações disponíveis:');
      addLog('output', '  +  -> Adição');
      addLog('output', '  -  -> Subtração');
      addLog('output', '  *  -> Multiplicação');
      addLog('output', '  /  -> Divisão');
      addLog('prompt', '\nEscolha a operação (+, -, *, /): ');

      return {
        nextContext: {
          ...context,
          expectedField: 'operator',
          currentPrompt: 'Escolha a operação (+, -, *, /): ',
          state: { ...state, num1: val, activeCodeLine: 21 }
        },
        logs,
        completed: false
      };
    }

    if (expectedField === 'operator') {
      const op = trimmed;
      if (!['+', '-', '*', '/'].includes(op)) {
        addLog('error', `Operação inválida: '${op}'. Por favor, escolha +, -, * ou /. Escolha a operação (+, -, *, /): `);
        return {
          nextContext: context,
          logs,
          completed: false
        };
      }

      addLog('prompt', 'Digite o segundo número: ');
      return {
        nextContext: {
          ...context,
          expectedField: 'num2',
          currentPrompt: 'Digite o segundo número: ',
          state: { ...state, operator: op, activeCodeLine: 23 }
        },
        logs,
        completed: false
      };
    }

    if (expectedField === 'num2') {
      const val2 = parseFloat(trimmed.replace(',', '.'));
      if (isNaN(val2)) {
        addLog('error', `ValueError: could not convert string to float: '${trimmed}'`);
        addLog('prompt', 'Digite o segundo número: ');
        return {
          nextContext: context,
          logs,
          completed: false
        };
      }

      const num1 = state.num1 ?? 0;
      const op = state.operator ?? '+';
      const num2 = val2;

      addLog('output', '-----------------------------------');

      let res: number | string;
      if (op === '+') {
        res = num1 + num2;
        addLog('success', `Resultado: ${num1} + ${num2} = ${res}`);
      } else if (op === '-') {
        res = num1 - num2;
        addLog('success', `Resultado: ${num1} - ${num2} = ${res}`);
      } else if (op === '*') {
        res = num1 * num2;
        addLog('success', `Resultado: ${num1} * ${num2} = ${res}`);
      } else if (op === '/') {
        if (num2 === 0) {
          res = 'Divisão por Zero';
          addLog('error', 'Erro matemático: Não é possível dividir um número por zero!');
        } else {
          res = num1 / num2;
          addLog('success', `Resultado: ${num1} / ${num2} = ${res}`);
        }
      } else {
        res = 'Inválido';
      }

      addLog('output', '===================================');
      addLog('system', 'Programa finalizado. Bons estudos em Python!');

      return {
        nextContext: {
          ...context,
          step: 'completed',
          currentPrompt: '',
          expectedField: null,
          state: { ...state, num2, result: res, activeCodeLine: 48 }
        },
        logs,
        completed: true
      };
    }
  }

  // -------------------------------------------------------------
  // VARIANT: FUNCTIONS (def)
  // -------------------------------------------------------------
  if (variant === 'functions') {
    if (expectedField === 'num1') {
      const val = parseFloat(trimmed.replace(',', '.'));
      if (isNaN(val)) {
        addLog('error', `ValueError: could not convert string to float: '${trimmed}'`);
        addLog('prompt', 'Digite o 1º número: ');
        return { nextContext: context, logs, completed: false };
      }

      addLog('prompt', 'Digite o 2º número: ');
      return {
        nextContext: {
          ...context,
          expectedField: 'num2',
          currentPrompt: 'Digite o 2º número: ',
          state: { ...state, num1: val, activeCodeLine: 29 }
        },
        logs,
        completed: false
      };
    }

    if (expectedField === 'num2') {
      const val2 = parseFloat(trimmed.replace(',', '.'));
      if (isNaN(val2)) {
        addLog('error', `ValueError: could not convert string to float: '${trimmed}'`);
        addLog('prompt', 'Digite o 2º número: ');
        return { nextContext: context, logs, completed: false };
      }

      addLog('output', '\nEscolha a operação:');
      addLog('output', '1. Somar (+)');
      addLog('output', '2. Subtrair (-)');
      addLog('output', '3. Multiplicar (*)');
      addLog('output', '4. Dividir (/)');
      addLog('prompt', 'Digite a opção desejada (1, 2, 3 ou 4): ');

      return {
        nextContext: {
          ...context,
          expectedField: 'menu_choice',
          currentPrompt: 'Digite a opção desejada (1, 2, 3 ou 4): ',
          state: { ...state, num2: val2, activeCodeLine: 36 }
        },
        logs,
        completed: false
      };
    }

    if (expectedField === 'menu_choice') {
      const choice = trimmed;
      const n1 = state.num1 ?? 0;
      const n2 = state.num2 ?? 0;
      addLog('output', '----------------------------------------');

      let res: number | string;
      let opSymbol = '';

      if (choice === '1' || choice === '+') {
        opSymbol = '+';
        res = n1 + n2;
        addLog('success', `Resultado: ${n1} + ${n2} = ${res}`);
      } else if (choice === '2' || choice === '-') {
        opSymbol = '-';
        res = n1 - n2;
        addLog('success', `Resultado: ${n1} - ${n2} = ${res}`);
      } else if (choice === '3' || choice === '*') {
        opSymbol = '*';
        res = n1 * n2;
        addLog('success', `Resultado: ${n1} * ${n2} = ${res}`);
      } else if (choice === '4' || choice === '/') {
        opSymbol = '/';
        if (n2 === 0) {
          res = 'Erro: Divisão por zero não é permitida!';
          addLog('error', res);
        } else {
          res = n1 / n2;
          addLog('success', `Resultado: ${n1} / ${n2} = ${res}`);
        }
      } else {
        addLog('error', 'Opção inválida! Escolha entre 1, 2, 3 ou 4.');
        res = 'Inválido';
      }

      addLog('output', '========================================');
      addLog('system', 'Função executar_calculadora() finalizada.');

      return {
        nextContext: {
          ...context,
          step: 'completed',
          currentPrompt: '',
          expectedField: null,
          state: { ...state, operator: opSymbol, result: res, activeCodeLine: 55 }
        },
        logs,
        completed: true
      };
    }
  }

  // -------------------------------------------------------------
  // VARIANT: LOOP (while True)
  // -------------------------------------------------------------
  if (variant === 'loop') {
    if (expectedField === 'loop_choice') {
      if (['s', 'sair', 'exit', 'q'].includes(trimmed.toLowerCase())) {
        addLog('system', '\nObrigado por utilizar a calculadora! Até logo!');
        return {
          nextContext: {
            ...context,
            step: 'completed',
            currentPrompt: '',
            expectedField: null,
            state: { ...state, loopActive: false, activeCodeLine: 28 }
          },
          logs,
          completed: true
        };
      }

      addLog('prompt', 'Digite o 1º número: ');
      return {
        nextContext: {
          ...context,
          expectedField: 'num1',
          currentPrompt: 'Digite o 1º número: ',
          state: { ...state, activeCodeLine: 32 }
        },
        logs,
        completed: false
      };
    }

    if (expectedField === 'num1') {
      const val = parseFloat(trimmed.replace(',', '.'));
      if (isNaN(val)) {
        addLog('error', 'Atenção: Por favor, digite apenas números válidos (use ponto para decimais, ex: 3.5).');
        addLog('prompt', 'Digite o 1º número: ');
        return { nextContext: context, logs, completed: false };
      }

      addLog('prompt', 'Operação (+, -, *, /): ');
      return {
        nextContext: {
          ...context,
          expectedField: 'operator',
          currentPrompt: 'Operação (+, -, *, /): ',
          state: { ...state, num1: val, activeCodeLine: 33 }
        },
        logs,
        completed: false
      };
    }

    if (expectedField === 'operator') {
      const op = trimmed;
      if (!['+', '-', '*', '/'].includes(op)) {
        addLog('error', 'Operador inválido! Escolha +, -, * ou /.');
        addLog('output', '----------------------------------------');
        addLog('prompt', "Pressione ENTER para calcular ou digite 's' para sair: ");
        return {
          nextContext: {
            ...context,
            expectedField: 'loop_choice',
            currentPrompt: "Pressione ENTER para calcular ou digite 's' para sair: ",
            state: { ...state, activeCodeLine: 24 }
          },
          logs,
          completed: false
        };
      }

      addLog('prompt', 'Digite o 2º número: ');
      return {
        nextContext: {
          ...context,
          expectedField: 'num2',
          currentPrompt: 'Digite o 2º número: ',
          state: { ...state, operator: op, activeCodeLine: 38 }
        },
        logs,
        completed: false
      };
    }

    if (expectedField === 'num2') {
      const val2 = parseFloat(trimmed.replace(',', '.'));
      if (isNaN(val2)) {
        addLog('error', 'Atenção: Por favor, digite apenas números válidos (use ponto para decimais, ex: 3.5).');
        addLog('output', '----------------------------------------');
        addLog('prompt', "Pressione ENTER para calcular ou digite 's' para sair: ");
        return {
          nextContext: {
            ...context,
            expectedField: 'loop_choice',
            currentPrompt: "Pressione ENTER para calcular ou digite 's' para sair: ",
            state: { ...state, activeCodeLine: 24 }
          },
          logs,
          completed: false
        };
      }

      const num1 = state.num1 ?? 0;
      const op = state.operator ?? '+';
      const num2 = val2;

      let res: number | string;
      if (op === '+') res = num1 + num2;
      else if (op === '-') res = num1 - num2;
      else if (op === '*') res = num1 * num2;
      else {
        if (num2 === 0) {
          res = 'Erro: Divisão por zero não é permitida!';
          addLog('error', res);
        } else {
          res = num1 / num2;
        }
      }

      if (typeof res === 'number') {
        addLog('success', `✓ Resposta: ${num1} ${op} ${num2} = ${res}`);
      }

      // Continue the loop!
      addLog('output', '----------------------------------------');
      addLog('prompt', "Pressione ENTER para calcular novamente ou 's' para sair: ");

      return {
        nextContext: {
          ...context,
          expectedField: 'loop_choice',
          currentPrompt: "Pressione ENTER para calcular novamente ou 's' para sair: ",
          state: { ...state, num2, result: res, activeCodeLine: 24 }
        },
        logs,
        completed: false
      };
    }
  }

  return { nextContext: context, logs, completed: false };
}
