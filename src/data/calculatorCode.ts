import { CodeVariant } from '../types';

export const CODE_VARIANTS: CodeVariant[] = [
  {
    id: 'basic',
    title: '1. Passo a Passo Direto',
    badge: 'Iniciante Recomendado',
    description: 'A forma mais simples e direta. Lê os valores do usuário, verifica a operação com if/elif/else e exibe o resultado.',
    features: [
      'Entrada de dados com input()',
      'Conversão para número decimal com float()',
      'Estruturas condicionais if, elif e else',
      'Validação para evitar divisão por zero',
      'Impressão elegante com f-strings'
    ],
    code: `# ============================================
# CALCULADORA SIMPLES EM PYTHON
# Operações: Adição, Subtração, Multiplicação e Divisão
# ============================================

print("=" * 35)
print("     CALCULADORA BÁSICA EM PYTHON    ")
print("=" * 35)

# 1. Entrada de dados do usuário
# Usamos float() para permitir tanto números inteiros (5) quanto decimais (3.14)
num1 = float(input("Digite o primeiro número: "))

# Exibe as opções de operação disponíveis
print("\\nOperações disponíveis:")
print("  +  -> Adição")
print("  -  -> Subtração")
print("  *  -> Multiplicação")
print("  /  -> Divisão")

operacao = input("\\nEscolha a operação (+, -, *, /): ")

num2 = float(input("Digite o segundo número: "))

print("-" * 35)

# 2. Processamento: tomada de decisão com if/elif/else
if operacao == "+":
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # 3. Tratamento especial: não é possível dividir por zero!
    if num2 == 0:
        print("Erro matemático: Não é possível dividir um número por zero!")
    else:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")

else:
    # Caso o usuário digite algo que não seja +, -, * ou /
    print(f"Operação inválida: '{operacao}'. Por favor, escolha +, -, * ou /.")

print("=" * 35)
print("Programa finalizado. Bons estudos em Python!")
`
  },
  {
    id: 'functions',
    title: '2. Modular com Funções (def)',
    badge: 'Boas Práticas',
    description: 'Divide cada operação em uma função específica com `def`. Esse é o padrão recomendado em projetos reais para reutilização e clareza.',
    features: [
      'Criação de funções reutilizáveis com def',
      'Retorno de valores com return',
      'Código limpo e fácil de testar isoladamente',
      'Separação entre lógica matemática e interface'
    ],
    code: `# ============================================
# CALCULADORA COM FUNÇÕES EM PYTHON
# Modular, limpa e reutilizável
# ============================================

# 1. Definição das funções matemáticas básicas
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração do primeiro pelo segundo número."""
    return a - b

def multiplicar(a, b):
    """Retorna a multiplicação de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão ou uma mensagem de erro caso b seja zero."""
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b

# 2. Função principal que coordena o programa
def executar_calculadora():
    print("=" * 40)
    print("    CALCULADORA MODULAR EM PYTHON")
    print("=" * 40)
    
    n1 = float(input("Digite o 1º número: "))
    n2 = float(input("Digite o 2º número: "))
    
    print("\\nEscolha a operação:")
    print("1. Somar (+)")
    print("2. Subtrair (-)")
    print("3. Multiplicar (*)")
    print("4. Dividir (/)")
    
    opcao = input("Digite a opção desejada (1, 2, 3 ou 4): ").strip()
    
    print("-" * 40)
    
    # Chamando a função correta de acordo com a escolha
    if opcao == "1" or opcao == "+":
        print(f"Resultado: {n1} + {n2} = {somar(n1, n2)}")
    elif opcao == "2" or opcao == "-":
        print(f"Resultado: {n1} - {n2} = {subtrair(n1, n2)}")
    elif opcao == "3" or opcao == "*":
        print(f"Resultado: {n1} * {n2} = {multiplicar(n1, n2)}")
    elif opcao == "4" or opcao == "/":
        resultado = dividir(n1, n2)
        if isinstance(resultado, str):
            print(resultado)
        else:
            print(f"Resultado: {n1} / {n2} = {resultado}")
    else:
        print("Opção inválida! Escolha entre 1, 2, 3 ou 4.")
    
    print("=" * 40)

# Executa o programa
if __name__ == "__main__":
    executar_calculadora()
`
  },
  {
    id: 'loop',
    title: '3. Contínua com Laço (while True)',
    badge: 'Avançado & Robusto',
    description: 'Inclui repetição contínua para fazer várias contas sem fechar o programa, além de tratamento de erro com try/except.',
    features: [
      'Laço infinito controlado com while True',
      'Proteção contra letras com try / except ValueError',
      'Opção amigável de sair digitando "s" ou "sair"',
      'Resistente a falhas e digitação incorreta'
    ],
    code: `# ============================================
# CALCULADORA CONTÍNUA COM TRATAMENTO DE ERROS
# Utiliza while True e try/except
# ============================================

def calcular(n1, n2, op):
    if op == '+':
        return n1 + n2
    elif op == '-':
        return n1 - n2
    elif op == '*':
        return n1 * n2
    elif op == '/':
        if n2 == 0:
            return "Erro: Divisão por zero não é permitida!"
        return n1 / n2
    return None

print("=== BEM-VINDO À CALCULADORA CONTÍNUA ===")
print("Faça quantas contas desejar. Para encerrar, digite 'sair'.")

# Laço contínuo: o programa roda até o usuário escolher sair
while True:
    print("\\n" + "-" * 40)
    entrada = input("Pressione ENTER para calcular ou digite 's' para sair: ").strip().lower()
    
    if entrada in ['s', 'sair', 'exit', 'q']:
        print("\\nObrigado por utilizar a calculadora! Até logo!")
        break

    # Tratamento de erro com try/except para capturar digitação incorreta
    try:
        num1 = float(input("Digite o 1º número: "))
        operador = input("Operação (+, -, *, /): ").strip()
        
        if operador not in ['+', '-', '*', '/']:
            print("Operador inválido! Escolha +, -, * ou /.")
            continue
            
        num2 = float(input("Digite o 2º número: "))
        
        resultado = calcular(num1, num2, operador)
        
        if isinstance(resultado, str):
            print(resultado)
        else:
            print(f"✓ Resposta: {num1} {operador} {num2} = {resultado}")
            
    except ValueError:
        print("Atenção: Por favor, digite apenas números válidos (use ponto para decimais, ex: 3.5).")
`
  }
];
