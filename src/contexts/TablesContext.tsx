import { createContext, useState, useContext, type ReactNode } from 'react';
import type { Table } from '../interfaces/apis';

const TablesContext = createContext<{
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  selectedTable: Table | undefined;
  setSelectedTable: React.Dispatch<React.SetStateAction<Table |undefined>>;
} | undefined>(undefined);

export function useTables(){
  const context = useContext(TablesContext);
  if (!context) {
    throw new Error('useTables must be used within a TablesProvider');
  }
  return context;
};

export function TablesProvider({ children }: { children: ReactNode }) {
  const [selectedTable, setSelectedTable] =useState<Table | undefined>(undefined);
  const [tables, setTables] = useState<Table[]>([
    { id: 1, key: 'procione', avaiable: true },
    { id: 2, key: 'bufalo', avaiable: false },
    { id: 3, key: 'anatra', avaiable: true },
    { id: 4, key: 'papera', avaiable: false },
    { id: 5, key: 'gatto', avaiable: true },
    { id: 6, key: 'alpaca', avaiable: false },
    { id: 7, key: 'cane', avaiable: true },
    { id: 8, key: 'leone', avaiable: false },
    { id: 9, key: 'tigre', avaiable: true },
    { id: 10, key: 'elefante', avaiable: false },
    { id: 11, key: 'giraffa', avaiable: true },
    { id: 12, key: 'zebra', avaiable: false },
    { id: 13, key: 'scimmia', avaiable: true },
    { id: 14, key: 'pinguino', avaiable: false },
    { id: 15, key: 'coccodrillo', avaiable: true },
    { id: 16, key: 'serpente', avaiable: false },
    { id: 17, key: 'aquila', avaiable: true },
    { id: 18, key: 'falco', avaiable: false },
    { id: 19, key: 'delfino', avaiable: true },
    { id: 20, key: 'squalo', avaiable: false },
  ]);

  return (
    <TablesContext.Provider value={{ tables, setTables, selectedTable, setSelectedTable }}>
      {children}
    </TablesContext.Provider>
  );
}