# Carteira de Investimento

## Descrição
Este projeto é uma aplicação web desenvolvida com **VueJS** para gerenciar uma carteira de investimentos, permitindo ao usuário realizar operações de CRUD (Create, Read, Update e Delete) sobre ativos financeiros. A aplicação apresenta um **sumário de dados** e gráficos que facilitam a análise dos investimentos.

## Tecnologias Utilizadas
- **VueJS**: Framework JavaScript para construção da interface.
- **Vuex**: Gerenciamento de estado global da aplicação.
- **Chart.js**: Biblioteca de gráficos utilizada para visualização de dados financeiros.
- **Mitt**: Event Emitter para comunicação entre componentes.
- **Vite**: Ferramenta de build e desenvolvimento.

## Funcionalidades
- **CRUD de Ativos**: Adicione, visualize, edite e exclua ativos financeiros.
- **Sumário de Ativos**: Exibe informações agregadas dos investimentos, como o total investido e resumo por tipo.
- **Gráficos**: Visualizações gráficas dos dados, categorizadas por tipo ou classe de ativo.
## Como Executar o Projeto
### Pré-requisitos
Certifique-se de ter o **Node.js** e **npm** instalados em sua máquina.

### Instalação
1. Clone o repositório:
   ```bash
   git clone [<URL_DO_REPOSITORIO>](https://github.com/flplz/AAWZ_Test.git)
   cd carteira-investimento
2. Instale as dependências:
   ```bash
   npm install

## Execução
- **Para rodar a aplicação localmente, use o comando:**
   ```bash
   npm run dev

## Como Usar
- **Adicionar Ativos**: Utilize o formulário disponível na página principal para adicionar um novo ativo financeiro.
- **Editar/Excluir Ativos**: Use as opções disponíveis na lista de ativos para modificar ou remover.
- **Visualizar Resumo**: Acesse o sumário para uma visão geral dos seus investimentos.
- **Gráficos**: Explore os gráficos para analisar a distribuição dos ativos.

## Desafios Encontrados
- **Atualização do Gráfico**: O gráfico de investimentos não atualiza automaticamente quando um ativo é editado ou deletado na lista de ativos. Ele só atualiza ao trocar de página e voltar para o Sumário.
- **Fechar o Menu de Edição**: Ao editar um ativo e clicar em "Salvar", o menu de edição não fecha automaticamente; ele só fecha ao clicar em "Cancelar".
- **Redirecionamento ao Clicar no Logo**: Atualmente, o clique na logo não redireciona para a página "Home", mas essa é uma funcionalidade desejada.
- **Testes Automatizados**: Não foram implementados testes automatizados para a aplicação.

## Melhorias Futuras
- **Atualização Dinâmica do Gráfico**: Implementar a atualização em tempo real do gráfico após a edição ou deleção de um ativo.
- **Fechamento Automático do Menu de Edição**: Fechar o menu de edição automaticamente ao clicar em "Salvar".
- **Redirecionamento ao Clicar na Logo**: Implementar a funcionalidade para redirecionar o usuário à página "Home" ao clicar na logo.
- **Testes Automatizados**: Adicionar testes para garantir a qualidade e a estabilidade da aplicação.

## Autor
- **Felipe Fagundes Pacheco**
