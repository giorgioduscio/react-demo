#!/usr/bin/env node

/*
Lo script `generate.js` automatizza la creazione di componenti React e store (Context) in un progetto React.

---
**Utilizzo**:
- **Linux/macOS**:
  Rendi eseguibile lo script con `chmod +x generate.js` e avvialo con:
  `./generate.js [comp|store] [percorso/cartella]`

- **Windows**:
  Esegui lo script direttamente con Node.js:
  `node generate.js [comp|store] [percorso/cartella]`
  Oppure crea un file `generate.bat` con il contenuto `@echo off\nnode generate.js %*` e avvialo con:
  `generate [comp|store] [percorso/cartella]`

---
**Funzionalità**:
- **`comp`**: Genera un componente React funzionale nel percorso specificato (es. `src/pages/Home`).
  Crea un file `.tsx` con una struttura di base.

- **`store`**: Genera uno store (Context) React con Provider e hook personalizzato (es. `src/contexts/User`).
  Crea un file `UserProvider.tsx` con una struttura standard per la gestione dello stato.

---
**Note**:
- Il nome del file generato segue il nome della cartella di destinazione in formato PascalCase.
- Se la cartella non esiste, viene creata automaticamente.
- I file esistenti con lo stesso nome vengono sovrascritti dopo conferma.
*/

import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';

// Oggetto che contiene i template per i vari comandi
const sheet = {
  comp: {
    text: `import React from 'react';

// Definisci le interfacce per le props qui
/*
interface {{name}}Props {
  // Esempio: message: string;
}
*/

export function {{name}}(/* props: {{name}}Props */) {
  // Stato e logica del componente
  
  return (
    <div>
      {/* Contenuto del componente {{name}} */}
    </div>
  );
}
`,
    extension: '.tsx',
  },
  store: {
    text: `import { createContext, useState, useContext, type ReactNode } from 'react';
// import type { YourType } from '../interfaces/your-interface';

const {{name}}Context = createContext<{
  // Definisci qui il tipo del tuo context
  // Esempio:
  // sampleState: string;
  // setSampleState: React.Dispatch<React.SetStateAction<string>>;
} | undefined>(undefined);

export function use{{name}}(){
  const context = useContext({{name}}Context);
  if (!context) {
    throw new Error('use{{name}} deve essere usato all'interno di un {{name}}Provider');
  }
  return context;
};

export function {{name}}Provider({ children }: { children: ReactNode }) {
  // const [sampleState, setSampleState] = useState<string>('');

  const value = {
    // Esponi i valori qui
    // sampleState,
    // setSampleState,
  };

  return (
    <{{name}}Context.Provider value={value}>
      {children}
    </{{name}}Context.Provider>
  );
}
`,
    extension: '.tsx',
  },
};

// Ottieni gli argomenti dalla riga di comando
const args = process.argv.slice(2);
const command = args[0]; // 'comp' o 'store'
const targetPath = args[1]; // Percorso della cartella di destinazione

// Funzione per generare il nome in formato PascalCase
function generatePascalCaseName(basePath) {
  const camelCase = basePath.replace(/[-_\s]+(.)?/g, function(match, chr) { 
    return chr ? chr.toUpperCase() : '';
  });
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

// Funzione per creare la cartella se non esiste
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Funzione per chiedere conferma di sovrascrittura
function confirmOverwrite(filePath) {
  if (fs.existsSync(filePath)) {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise(function(resolve) {
      readline.question(
        `Il file "${filePath}" esiste già. Sovrascriverlo? (s/n) `,
        function(answer) {
          readline.close();
          resolve(answer.toLowerCase() === 's');
        }
      );
    });
  }
  return Promise.resolve(true);
}

// Funzione per verificare se un percorso è valido
function isValidPath(filePath) {
  try {
    fs.accessSync(path.dirname(filePath), fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

// Funzione principale
async function generateFile() {
  if (!command || !targetPath) {
    console.error('Utilizzo: node generate.js [comp|store] [percorso/del/file]');
    process.exit(1);
  }

  try {
    // Verifica se il comando esiste nell'oggetto sheet
    if (!sheet[command]) {
      console.error(`Comando "${command}" non valido. Comandi disponibili: ${Object.keys(sheet).join(', ')}.`);
      process.exit(1);
    }

            const pathWithSrc = targetPath.startsWith('src/') || targetPath.startsWith('src\\') ? targetPath : path.join('src', targetPath);

            const fullPath = path.join(process.cwd(), pathWithSrc);

            const dirPath = path.dirname(fullPath);

            const baseName = path.basename(fullPath);

            const name = generatePascalCaseName(baseName);

    // Recupera le informazioni dal comando specificato
    const { text, extension } = sheet[command];
    
    let finalFileName = name;
    if (command === 'store') {
        finalFileName = `${name}Provider`;
    }
    const fileNameWithExtension = `${finalFileName}${extension}`;
    const filePath = path.join(dirPath, fileNameWithExtension);

    // Sostituisci il placeholder {{name}} nel template
    const fileContent = text.replace(/{{name}}/g, name);

    // Verifica se il percorso è valido
    if (!isValidPath(filePath)) {
      console.error(`Impossibile scrivere nel percorso: ${filePath}`);
      process.exit(1);
    }

    // Chiedi conferma per la sovrascrittura
    const shouldOverwrite = await confirmOverwrite(filePath);
    if (!shouldOverwrite) {
      console.log('Operazione annullata.');
      process.exit(0);
    }

    // Crea la cartella se non esiste
    ensureDirectoryExistence(filePath);

    // Scrivi il file
    fs.writeFileSync(filePath, fileContent);
    console.log(`File creato con successo: ${filePath}`);
  } catch (err) {
    console.error('Errore durante la creazione del file:', err);
    process.exit(1);
  }
}

// Esegui la funzione principale
generateFile();
