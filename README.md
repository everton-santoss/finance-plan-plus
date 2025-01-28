# Gerenciador de Transações

Um aplicativo simples de controle financeiro para gerenciar receitas e despesas. Este projeto foi desenvolvido com React.js e utiliza o `localStorage` para salvar as transações e manter os dados persistentes mesmo após o recarregamento da página.

## 🚀 Funcionalidades

- Adicionar novas transações, especificando:
  - Tipo: `Recebido` ou `Despesa`
  - Valor
  - Descrição
- Visualizar o saldo total atualizado automaticamente.
- Listar todas as transações, incluindo:
  - Tipo
  - Valor
  - Descrição
  - Data
- Remover transações individualmente.
- Persistir os dados no navegador utilizando `localStorage`.

## 🛠️ Tecnologias Utilizadas

- **React.js**: Biblioteca para construção da interface do usuário.
- **CSS Modules**: Para estilização isolada de componentes.
- **LocalStorage**: Para armazenamento de dados persistentes no navegador.

## 📂 Estrutura do Projeto

📦 src ├── 📂 components │ └── Results.jsx # Componente principal do projeto ├── 📂 styles │ └── Results.module.css # Estilização do componente Results └── index.js # Arquivo principal

bash
Copiar
Editar

## 🖥️ Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**
   ```bash
   git clone https://github.com/everton-santoss/finance-plan-plus.git
   cd finance-plan-plus
Instale as dependências Certifique-se de ter o Node.js instalado. Em seguida, execute:

bash
Copiar
Editar
npm install
Inicie o servidor de desenvolvimento

bash
Copiar
Editar
npm start
Abra no navegador O projeto estará disponível em http://localhost:3000.

📈 Melhorias Futuras
Implementar gráficos para visualização do histórico financeiro.
Adicionar a possibilidade de editar transações existentes.
Criar uma funcionalidade para exportar as transações em formato CSV.
Permitir o filtro de transações por período (ex.: semanal, mensal).
Usar uma biblioteca de gerenciamento de estado como Redux para maior escalabilidade.
🤝 Contribuições
Contribuições são bem-vindas! Se você encontrar um bug ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

📜 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

🌟 Se você gostou deste projeto, não se esqueça de dar uma estrela no repositório!
