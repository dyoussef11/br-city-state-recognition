const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { NlpManager } = require("node-nlp");

// Initialize the NLP manager for Portuguese
// Inicializa o gerenciador NLP para Português
const manager = new NlpManager({ languages: ["pt"], nlu: { log: false } });

// Text used to select city names
// Texto que será utilizado para seleção dos nomes das cidades
const portugueseText =
  "Possui graduação em Ciência da Computação pela Universidade Regional Integrada do Alto Uruguai e das Missões (2008), mestrado em Computação pela Universidade Federal de Santa Maria (2012) e doutorado em Computação pela Universidade Federal do Rio Grande do Sul (2016). Atualmente é pesquisador e Professor Adjunto no Colégio Politécnico da Universidade Federal de Santa Maria. Tem experiência na área de Ciência da Computação, com ênfase em Computação Ubíqua, Sensibilidade ao Contexto, Banco de Dados e Computação Móvel.";

// List of all Brazilian cities
// Lista de todas as cidades do Brasil
const cityNames = [];
const stateNames = new Set();

// Read the file containing municipalities
// Leitura do arquivo que contém os municípios
const municipalityFileCSV = path.resolve(
  __dirname,
  "Municipios_e_estados_do_Brasil.csv"
);
const stateFileCSV = path.resolve(__dirname, "Municipios_e_estados_do_Brasil.csv");

// Create separate read streams for each file
// Cria streams de leitura separados para cada arquivo
const municipalityStream = fs
  .createReadStream(municipalityFileCSV, { encoding: "utf8" })
  .pipe(csv({ separator: "," }));
const stateStream = fs
  .createReadStream(stateFileCSV, { encoding: "utf8" })
  .pipe(csv({ separator: "," }));

// Handle data events for the municipalities file
// Manipula eventos de dados para o arquivo de Municípios
municipalityStream.on("data", (row) => {
  const cityName = row["Município"];
  if (cityName) {
    cityNames.push(cityName.toLowerCase().trim());
    console.log("Possible matching city names:", cityName); // Debug log
    // Log de depuração
  } else {
    console.log("City name not compatible:", row); // Debug log
    // Log de depuração
  }
});

// Handle data events for the states file
// Manipula eventos de dados para o arquivo de Estados
stateStream.on("data", (row) => {
  const stateName = row["Estado"];
  if (stateName) {
    const stateNameLowerCase = stateName.toLowerCase().trim();
    // Check if the state name is not in the city names list
    // Verifica se o nome do estado não está na lista de nomes de cidades
    if (!cityNames.includes(stateNameLowerCase)) {
      stateNames.add(stateNameLowerCase);
      console.log("Possible matching state names:", stateName); // Debug log
      // Log de depuração
    }
  } else {
    console.log("State name(s) not compatible:", row); // Debug log
    // Log de depuração
  }
});

// Handle end events for both streams
// Manipula eventos de fim para ambos os streams
Promise.all([
  new Promise((resolve) => municipalityStream.on("end", resolve)),
  new Promise((resolve) => stateStream.on("end", resolve)),
]).then(async () => {
  // console.log("All streams have finished processing"); // Debug log
  // console.log("Todos os streams finalizaram o processamento"); // Log de depuração

  // Tokenize and process the Portuguese text using node-nlp
  // Tokeniza e processa o texto em português usando node-nlp
  const processedText = await manager.process("pt", portugueseText);
  // console.log("Processed Text:", processedText);
  // console.log("Texto Processado:", textoProcessado);

  // Create regular expression patterns to match city and state names
  // Cria padrões de expressões regulares para corresponder aos nomes das cidades e estados
  const cityNamePattern = new RegExp(`\\b(${cityNames.join("|")})\\b`, "gi");
  const stateNamePattern = new RegExp(
    `\\b(${Array.from(stateNames).join("|")})\\b`,
    "gi"
  );

  // console.log("City Name Pattern:", cityNamePattern);
  // console.log("Padrão de Nomes de Cidades:", padraoNomesCidades);
  // console.log("State Name Pattern:", stateNamePattern);
  // console.log("Padrão de Nomes de Estados:", padraoNomesEstados);

  // Use regular expressions to find city and state names in the text
  // Usa as expressões regulares para encontrar nomes de cidades e estados no texto
  const foundCityNames = portugueseText.match(cityNamePattern) || [];
  const foundStateNames = portugueseText.match(stateNamePattern) || [];

  // Concatenate and ensure unique names
  // Concatena e garante nomes únicos
  const allFoundNames = [
    ...new Set(foundCityNames.concat(foundStateNames)),
  ];

  // If there are found names, join them into a single string
  // Se houver nomes encontrados, junta-os em uma única string
  const joinedNames = allFoundNames.join(", ");

  // Log the result
  // Loga o resultado
  console.log("Cities and/or states found:", joinedNames);
});
