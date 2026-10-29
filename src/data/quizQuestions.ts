import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'O que acontece se somarmos duas variáveis obtidas diretamente de input() sem usar float() ou int()?',
    options: [
      'O Python gera um erro de sintaxe imediatamente.',
      'O Python concatena os dois textos (ex: "5" + "5" = "55").',
      'O Python calcula a média aritmética automaticamente.',
      'O Python converte sozinho para número se ambos forem dígitos.'
    ],
    correctIndex: 1,
    explanation: 'A função input() sempre retorna uma string (texto). No Python, o operador "+" entre dois textos junta-os (concatenação). Para somar numericamente, é obrigatório converter com float() ou int().'
  },
  {
    id: 2,
    question: 'Por que é fundamental verificar se o segundo número é zero antes de efetuar uma divisão?',
    options: [
      'Porque a memória do computador é apagada ao dividir por zero.',
      'Porque o resultado seria sempre negativo.',
      'Porque divisão por zero é matematicamente indefinida e o Python trava lançando ZeroDivisionError.',
      'Não é necessário, pois o Python retorna o valor "0" por padrão.'
    ],
    correctIndex: 2,
    explanation: 'A divisão por zero não é permitida matematicamente. Se você tentar dividir por 0 sem validação, o interpretador Python interrompe o programa emitindo a exceção ZeroDivisionError.'
  },
  {
    id: 3,
    question: 'Qual é a diferença entre a instrução return e a função print() dentro de uma função em Python?',
    options: [
      'Não há diferença, ambas fazem exatamente o mesmo papel.',
      'print() envia o valor para o console/tela; return devolve o dado para quem chamou a função continuar o processamento.',
      'return só funciona para números e print() só funciona para textos.',
      'print() fecha o programa enquanto return repete a função.'
    ],
    correctIndex: 1,
    explanation: 'print() serve apenas para exibir texto na tela para um ser humano ler. Já return entrega o valor resultante de volta para o código, permitindo armazenar em variáveis ou encadear em novas operações.'
  },
  {
    id: 4,
    question: 'Qual das opções abaixo representa a sintaxe correta para criar uma f-string moderna em Python?',
    options: [
      'print("Resultado: " & num1 + num2)',
      'print(f"Resultado: {num1} + {num2} = {resultado}")',
      'print("Resultado: [num1] + [num2] = [resultado]")',
      'print(format("Resultado: %d + %d", num1, num2))'
    ],
    correctIndex: 1,
    explanation: 'A sintaxe de f-strings consiste em prefixar a string com a letra "f" minúscula ou maiúscula e envolver variáveis ou expressões entre chaves {}.'
  }
];
