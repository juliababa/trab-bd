Ambiente:

- SO: Windows
- Python(v3.10.5)
- Pip(v22.0.4)
- MySQL(v8.0.33)
- NodeJS (v16.14.0)

Instalação:

- Biblioteca mysql-connector-python
  - Instalar com: pip install mysql-connector-python==8.0.33
- Biblioteca fastapi
  - Instalar com: pip install fastapi[all]==0.100.0

Configurando o banco:

- Executar os scripts da pasta "DB":
  - Rodar o arquivo "script.sql" - Cria as tabelas
  - Rodar o arquivo "inserts.sql" - Insere dados iniciais
  - Rodar o arquivo "procedure.sql" - Cria a procedure
  - Rodar o arquivo "view.sql" - Cria a view

Configurando o projeto:

- Na pasta "backend" deve-se alterar o arquivo connector.py
- Alterar de acordo com a configuracao do banco local:
  - Alterar usuario e senha cadastrados na instalacao do MySQL

Executando o projeto:

- Será necessário a execução em dois terminais separados para o funcionamento da aplicação:

  - Rodando o backend:

    - Entrar na pasta "backend" e rodar o comando:
      uvicorn main:app --reload --port 8080

  - Rodando o frontend:
    - Entrar na pasta "frontend" e rodar os comandos:
      - npm install
      - npm run dev

- Aplicação ficará disponível na URL do navegador: localhost:3000
