import { useTables } from "../contexts/TablesContext";
import { toast } from "../tools/feedbacksUI";

export function Home() {
  document.title ='Home'
  const { tables, setTables, selectedTable, setSelectedTable } = useTables();

  function getTables() {
    return tables 
      .filter(table=> table.avaiable || table.id ==selectedTable?.id)
      .map(table => ({
        ...table,
        btnClass: table.id ==selectedTable?.id ? 'btn-success'
                 : table.avaiable ? 'btn-primary'
                 : 'btn-secondary'
      }));
  }

  function handleClick(id: number) {
    // Se si clicca sul tavolo già selezionato, si deseleziona
    if(id === selectedTable?.id) {
      setSelectedTable(undefined);
      setTables(tables.map(table => 
        table.id === id ? { ...table, avaiable: true } : table
      ));
      return toast('Tavolo deselezionato', 'danger');
    }

    // trova il tavolo nella lista
    const tableMatch =tables.find(t=> t.id==id);
    if(!tableMatch) 
      return console.error('non trovato', tableMatch);
    
    // seleziona e rende non disponibile il tavolo selezionato
    setSelectedTable(tableMatch);
    setTables(tables.map(table => {
      // Il nuovo tavolo selezionato diventa non disponibile
      if(table.id === id) return { ...table, avaiable: false };
      // Il tavolo precedente diventa disponibile
      else if(selectedTable && table.id === selectedTable.id) 
              return { ...table, avaiable: true };
      
      return table;
    }));
    toast('Tavolo selezionato')
  }
  
  return <div id="Home" className="container p-0">
    <header className="p-3 mb-3 text-bg-c3 shadow">
      <h1 className="m-0">Home</h1>
    </header>

    <main className="p-2">
      {selectedTable ?
        <div className="alert alert-success text-center">
          è stato selezionato il <b className="text-dark">tavolo {selectedTable?.id}</b>
        </div>
      :''}

      <h3>Tavoli disponibili</h3>
      <p>Seleziona un tavolo</p>
      <div className="d-grid cols-1fr-1fr-1fr gap-2">
        {getTables() .map((table) => (
          <button key={table.id}
                  className={`btn ${table.btnClass}`}
                  onClick={() => handleClick(table.id)}>
            <small>Tavolo</small> {table.id}
          </button>
        ))}
      </div>
    </main>

  </div>
}