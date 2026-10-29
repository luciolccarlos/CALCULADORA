import { ConceptBlock } from '../types';

export const CONCEPTS: ConceptBlock[] = [
  {
    id: 'input-float',
    title: '1. Entrada de Dados: input() e float()',
    iconName: 'Terminal',
    summary: 'Como receber dados do teclado e convertê-los em números reais.',
    explanation: `No Python, a função nativa \`input()\` lê tudo o que o usuário digita no teclado como uma **string** (texto puro).
Se você somar duas strings com \`+\`, o Python fará concatenação de texto: \`"10" + "5"\` resulta em \`"105"\` e não \`15\`.
Por isso, envolvemos a leitura com \`float(input(...))\`:
• \`int()\`: converte para número inteiro (ex: 1, 2, -10).
• \`float()\`: converte para número decimal/ponto flutuante (ex: 5.0, 3.14, 0.5).
Optar por \`float\` é a melhor prática para calculadoras, pois aceita tanto números inteiros quanto com vírgula/ponto!`,
    codeSnippet: `# O erro comum do iniciante:
x = input("Digite um número: ")  # Se digitar 10, x vira "10" (texto)
y = input("Digite outro: ")      # Se digitar 5, y vira "5" (texto)
print(x + y)                     # Imprime "105" (grudou os textos!)

# A forma correta para cálculos:
num1 = float(input("Digite o 1º número: "))  # Vira 10.0 (número real)
num2 = float(input("Digite o 2º número: "))  # Vira 5.0 (número real)
print(num1 + num2)                          # Imprime 15.0`,
    tip: 'Lembre-se sempre: em Python, para decimais utilizamos o ponto "." (ex: 10.5) e não a vírgula ",".',
    pitfall: 'Se o usuário digitar uma letra como "abc", o comando float("abc") gera um erro chamado ValueError. Mais tarde veremos como proteger com try/except!'
  },
  {
    id: 'operators',
    title: '2. Os 4 Operadores Matemáticos Básicos',
    iconName: 'Calculator',
    summary: 'Os símbolos essenciais da aritmética no Python.',
    explanation: `O Python possui operadores aritméticos nativos muito intuitivos:
• **Adição (\`+\`)**: soma dois valores (\`7 + 3 = 10\`).
• **Subtração (\`-\`)**: diminui o segundo valor do primeiro (\`10 - 4 = 6\`).
• **Multiplicação (\`*\`)**: multiplica valores (\`6 * 7 = 42\`). Em programação, usa-se o asterisco e não o 'x'.
• **Divisão (\`/\`)**: divide valores (\`15 / 3 = 5.0\`). O Python 3 sempre retorna um número decimal (\`float\`) na divisão simples.`,
    codeSnippet: `a = 20
b = 5

soma = a + b            # 25
subtracao = a - b       # 15
multiplicacao = a * b   # 100
divisao = a / b         # 4.0 (repare que sempre tem ponto flutuante)`,
    tip: 'Dica extra: o Python também tem `//` para divisão inteira (sem casas decimais) e `%` para o resto da divisão (módulo).',
    pitfall: 'Nunca use a letra "x" para multiplicar ou ":" para dividir no Python, o interpretador dará erro de sintaxe.'
  },
  {
    id: 'conditionals',
    title: '3. Estruturas Condicionais: if, elif e else',
    iconName: 'GitBranch',
    summary: 'Como o programa toma decisões baseado na escolha do usuário.',
    explanation: `Estruturas condicionais permitem que o programa execute blocos diferentes de código dependendo de uma condição ser Verdadeira (\`True\`) ou Falsa (\`False\`):
• \`if\` ("se"): testa a primeira condição (ex: \`operacao == "+"\`).
• \`elif\` ("senão, se"): atalho de "else if", testa novas condições se a anterior não foi atendida.
• \`else\` ("senão"): executa quando nenhuma das condições anteriores for verdadeira (ótimo para capturar entradas inválidas).
Note a indentação (espaço à esquerda): no Python, 4 espaços definem o que pertence a cada bloco!`,
    codeSnippet: `if operacao == "+":
    resultado = num1 + num2
elif operacao == "-":
    resultado = num1 - num2
elif operacao == "*":
    resultado = num1 * num2
elif operacao == "/":
    resultado = num1 / num2
else:
    print("Operação inválida!")`,
    tip: 'No teste de igualdade em Python, use sempre dois sinais de igual "==". Um único sinal "=" é usado para atribuir valor a uma variável.',
    pitfall: 'Esquecer os dois pontos ":" no final da linha do if/elif/else é um dos erros mais frequentes de quem está começando.'
  },
  {
    id: 'zero-division',
    title: '4. Proteção contra Divisão por Zero',
    iconName: 'ShieldAlert',
    summary: 'Evitando que o programa trave com o erro ZeroDivisionError.',
    explanation: `Na matemática, a divisão por zero é indefinida. Em programação, tentar dividir qualquer número por \`0\` faz com que o interpretador Python lance uma exceção fatal: \`ZeroDivisionError: float division by zero\`.
Se você não tratar essa situação antes de fazer a conta, seu programa será interrompido abruptamente!
Uma calculadora profissional sempre verifica se o divisor é igual a zero antes de tentar a divisão:`,
    codeSnippet: `# Se o usuário tentar dividir 10 por 0:
if operacao == "/":
    if num2 == 0:
        print("Erro: Não é possível dividir por zero!")
    else:
        resultado = num1 / num2
        print(f"Resultado: {resultado}")`,
    tip: 'Tratar erros com antecedência chama-se "validação defensiva" e é um hábito fundamental de bons desenvolvedores.',
    pitfall: 'Nunca execute `num1 / num2` sem antes checar se `num2 == 0`.'
  },
  {
    id: 'functions-def',
    title: '5. Organização com Funções: def e return',
    iconName: 'Boxes',
    summary: 'Agrupando instruções em blocos reutilizáveis com nomes claros.',
    explanation: `Conforme os programas crescem, colocar tudo em um arquivo sequencial fica confuso. Com a palavra-chave \`def\`, criamos funções:
• Uma função recebe parâmetros (entradas) entre parênteses: \`def somar(a, b):\`.
• Faz o cálculo interno.
• Devolve a resposta com a instrução \`return\`.
Benefícios:
1. Reutilização: você pode chamar \`somar(10, 5)\` quantas vezes quiser no código.
2. Legibilidade: quem lê o código entende imediatamente o que cada parte faz.
3. Facilidade de teste e manutenção.`,
    codeSnippet: `# Definindo a função:
def multiplicar(a, b):
    return a * b

# Usando a função em diferentes lugares:
resultado1 = multiplicar(4, 5)   # 20
resultado2 = multiplicar(2.5, 2) # 5.0
print(resultado1, resultado2)`,
    tip: 'Funções devem ter nomes claros e verbais, como somar, calcular_media ou validar_entrada.',
    pitfall: 'Não confunda print() com return: print() apenas mostra na tela para humanos lerem; return devolve o valor para que o programa possa guardá-lo ou usá-lo em outros cálculos.'
  },
  {
    id: 'f-strings',
    title: '6. Exibição Formatada: f-strings',
    iconName: 'Sparkles',
    summary: 'A forma mais moderna e legível de juntar variáveis com texto.',
    explanation: `Para exibir mensagens amigáveis contendo texto e variáveis no Python 3.6+, usamos as **f-strings** (format strings).
Basta colocar a letra \`f\` antes das aspas da string e inserir as variáveis ou expressões matemáticas dentro de chaves \`{...}\`.
Isso substitui o antigo e confuso método de concatenar com \`+\` e converter com \`str()\`.`,
    codeSnippet: `nome = "Maria"
n1 = 8.5
n2 = 4.0
soma = n1 + n2

# Modo moderno com f-string (limpo e elegante):
print(f"Olá {nome}, a soma entre {n1} e {n2} é igual a {soma:.2f}")
# A notação :.2f formata o número com 2 casas decimais!`,
    tip: 'Você pode até fazer cálculos direto dentro das chaves: f"Dobro: {numero * 2}".',
    pitfall: 'Não se esqueça da letra f antes da aspa! Sem ela, o Python imprimirá o texto literal "{num1}" em vez do valor da variável.'
  }
];
