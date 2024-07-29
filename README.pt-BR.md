# Brazilian City and State Recognition

## Descrição

Este projeto contém um script Node.js para reconhecer e extrair nomes de cidades e estados brasileiros de textos em português. Utiliza a biblioteca `node-nlp` para processar o texto e comparar os nomes encontrados com listas de municípios e estados extraídos de arquivos CSV.

## Funcionalidades

- **Leitura de Arquivos CSV:** Carrega dados de municípios e estados brasileiros a partir de arquivos CSV.
- **Extração de Entidades Geográficas:** Identifica e extrai nomes de cidades e estados de um texto em português.
- **Verificação com Expressões Regulares:** Usa expressões regulares para encontrar e listar entidades geográficas no texto.

## Dependências

- `node-nlp`: Biblioteca para processamento de linguagem natural.
- `csv-parser`: Biblioteca para análise de arquivos CSV.
- `fs` e `path`: Módulos integrados do Node.js para manipulação de arquivos e caminhos.

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/brazilian-city-state-recognition.git
    cd brazilian-city-state-recognition
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

## Uso

1. Adicione os arquivos CSV contendo os dados de municípios e estados na mesma pasta que o script. Os arquivos esperados são:

    - `Municipios_e_estados_do_Brasil.csv`

2. Edite o arquivo `index.js` para ajustar o texto a ser processado, se necessário.

3. Execute o script:

    ```bash
    node index.js
    ```

4. O script exibirá uma lista de cidades e estados encontrados no texto fornecido.

## Exemplo de Uso

```javascript
const textoPortugues = "Possui graduação em Ciência da Computação pela Universidade Regional Integrada do Alto Uruguai e das Missões (2008), mestrado em Computação pela Universidade Federal de Santa Maria (2012) e doutorado em Computação pela Universidade Federal do Rio Grande do Sul (2016). Atualmente é pesquisador e Professor Adjunto no Colégio Politécnico da Universidade Federal de Santa Maria. Tem experiência na área de Ciência da Computação, com ênfase em Computação Ubíqua, Sensibilidade ao Contexto, Banco de Dados e Computação Móvel.";
