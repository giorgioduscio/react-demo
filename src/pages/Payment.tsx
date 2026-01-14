import { useEffect, useState } from 'react';
import { useTables } from '../contexts/TablesContext';
import { agree, toast } from "../tools/feedbacksUI";
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export function Payment() {
  const navigate =useNavigate();
  const [isTakeAway, setIsTakeAway] =useState(false)
  const CartContext =useCart()

  useEffect(() => {
    // Leggi la query string dall'URL
    const searchParams = new URLSearchParams(window.location.search);
    const method = searchParams.get('method');
    
    // Se il metodo è 'takeAway', imposta isTakeAway a true
    if (method === 'takeAway') {
      setIsTakeAway(true);
    }
  }, []);

  async function to(path:string) {
    if(!await agree('Uscire dalla pagina?', 'Esci', 'danger')) return;
    navigate(path);
  }

  return (
    <article id="Payment" className="container p-0">
      <header className="p-3 mb-3 text-bg-c3 shadow">
        <h1 className="m-0">Pagamento</h1>
      </header>

      <section className="p-2">
        {isTakeAway?
          <div id='main-view'>
            <div className="d-flex justify-content-between">
              <i></i> 
              <button className="btn btn-outline-light"
                      onClick={()=> to('/dishes')}
                      ><i className="bi bi-x-lg"></i></button>
            </div>

            <div className='h1 text-center my-4'>
              Numero ordine:
              <div style={{fontSize:'80px'}}>{CartContext.number_get()}</div>
            </div>

            <div className="alert alert-warning">
              Attenzione: custodisci questo numero fino alla consegna dell'ordine
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-primary d-grid cols-auto-1fr align-items-center"
                      onClick={()=> to('/dishes')}>
                <i className="bi bi-fork-knife"></i> 
                <span>Ordina di nuovo</span>
              </button>
              <button className="btn btn-secondary d-grid cols-auto-1fr align-items-center"
                      onClick={()=> to('/history')}>
                <i className="bi bi-clock-history"></i> 
                <span>Mostra storico</span>
              </button>
            </div>

          </div>
        :null}
      </section>
    </article>
  );
}


export function TableComponent() {
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
  
  return <article id="TableComponent" className="p-0">
    <header className="my-3">
      <h1 className="m-0">Ordinazione</h1>
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
                  className={`text-truncate btn ${table.btnClass}`}
                  onClick={() => handleClick(table.id)}>
            <small>Tav.</small> {table.id}
          </button>
        ))}
      </div>
    </main>

  </article>
}