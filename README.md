# Brazilian City and State Recognition

## Description

This project contains a Node.js script for recognizing and extracting names of Brazilian cities and states from Portuguese texts. It uses the `node-nlp` library to process the text and compare the names found with lists of municipalities and states extracted from CSV files.

## Features

- **CSV File Reading:** Loads data of Brazilian municipalities and states from CSV files.
- **Geographical Entity Extraction:** Identifies and extracts city and state names from Portuguese text.
- **Regular Expression Matching:** Uses regular expressions to find and list geographical entities in the text.

## Dependencies

- `node-nlp`: Library for natural language processing.
- `csv-parser`: Library for parsing CSV files.
- `fs` and `path`: Built-in Node.js modules for file and path manipulation.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/your-username/brazilian-city-state-recognition.git
    cd brazilian-city-state-recognition
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Add the CSV files containing municipality and state data to the same folder as the script. The expected file is:

    - `Municipios_e_estados_do_Brasil.csv`

2. Edit the `index.js` file to adjust the text to be processed, if necessary.

3. Run the script:

    ```bash
    node index.js
    ```

4. The script will display a list of cities and states found in the provided text.

## Example Usage

```javascript
const portugueseText = "Possui graduação em Ciência da Computação pela Universidade Regional Integrada do Alto Uruguai e das Missões (2008), mestrado em Computação pela Universidade Federal de Santa Maria (2012) e doutorado em Computação pela Universidade Federal do Rio Grande do Sul (2016). Atualmente é pesquisador e Professor Adjunto no Colégio Politécnico da Universidade Federal de Santa Maria. Tem experiência na área de Ciência da Computação, com ênfase em Computação Ubíqua, Sensibilidade ao Contexto, Banco de Dados e Computação Móvel.";
