Ambiente:
 - SO: Windows
 - Python(v3.10.5)
 - Pip(v22.0.4)
 - MySQL(v8.0.33)

Requisitos:
 - Biblioteca mysql-connector-python 
   * Instalar com: pip install mysql-connector-python

Configurando o banco:
- Executar os scripts da pasta "DB":
    - Rodar o arquivo "script.sql" - Cria as tabelas
    - Rodar o arquivo "inserts.sql" - Insere dados iniciais
    - Rodar o arquivo "procedure.sql" - Cria a procedure
    - Rodar o arquivo "view.sql" - Cria a view

Configurando o projeto:
- Na pasta "interface" deve-se alterar o arquivo get_connector.py
- Configurar de acordo com a configuracao do banco local:
    - Alterar usuario e senha cadastrados na instalacao do MySQL

Rodando o programa:
- Executar a interface em terminal da pasta "interface":
    - python main.py