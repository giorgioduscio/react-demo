import { useEffect, useState } from 'react';
import { useTables } from '../contexts/TablesContext';
import { agree, toast } from "../tools/feedbacksUI";
import { useCart } from '../contexts/CartContext';
import { useHistory } from '../contexts/HistoryContext';
import { useNavigate } from 'react-router-dom';
import { formInit as authFormInit } from '../contexts/AuthContext';
import type { User } from '../interfaces/structures';

export function Payment() {
  const navigate =useNavigate();
  const [method, setMethod] = useState('');
  const CartContext =useCart()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setMethod(searchParams.get('method') || '');
    
    //todo se la pagina non ha metodo, mostra il carrello
  }, [navigate, window.location.search]);

  async function to(path:string) {
    if(!await agree('Uscire dalla pagina?', 'Esci', 'danger')) return;
    navigate(path);
  }

  return (
    <article id="Payment" className="container p-0">
      <header className="p-3 mb-3 text-bg-c3 shadow d-flex justify-content-between">
        <h1 className="m-0">Pagamento</h1>
        <button className="btn"
                onClick={()=> to('/dishes')}
                ><b className="bi bi-x-lg"></b></button>
      </header>

      <main className="p-2">
        {method=='takeAway'?
          <section id='takeAway'>

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
          </section>
        : method=='table' ?
          <TableComponent />
        : method=='delivery' ?
          <DeliveryComponent />
        : null}
      </main>
    </article>
  );
}


export function TableComponent() {
  const { tables, setTables, selectedTable, setSelectedTable } = useTables();
  const CartContext = useCart();
  const HistoryContext = useHistory();

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

  function calculateTotal(cartItems: any[]) {
    // Calcola il totale basato sulla quantità degli articoli
    // Nota: per un calcolo preciso, sarebbe necessario avere accesso ai prezzi degli articoli
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  async function handleClick(id: number) {
    // Se si clicca sul tavolo già selezionato, si deseleziona
    if(selectedTable?.id) {
      return agree("Non è possibile deselezionare un tavolo", "Capito")
    }

    // trova il tavolo nella lista
    const tableMatch =tables.find(t=> t.id==id);
    if(!tableMatch) 
      return console.error('non trovato', tableMatch);
    
    // Ottieni gli articoli dal carrello
    const cartItems = CartContext.get();
    
    if(cartItems.length === 0) {
      return toast('Il carrello è vuoto. Aggiungi articoli prima di selezionare un tavolo.');
    }
    
    // Aggiungi l'ordine allo storico
    HistoryContext.add({
      id,
      date: new Date().toISOString(),
      items: cartItems,
      total: calculateTotal(cartItems),
      tableId: id,
      method: "table"
    });
    
    // Svuota il carrello
    CartContext.clear();
    
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
    
    toast('Ordine assegnato al tavolo ' + id);
  }
  
  return <article id="TableComponent" className="p-0">
    <main className="p-2">
      {selectedTable ?
        <div className="alert alert-success text-center">
          è stato selezionato il <b className="text-dark">tavolo {selectedTable?.id}</b>
          <div className="text-dark">Il tuo ordine stato trasmesso</div>
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


export function DeliveryComponent() {
  const formFields = authFormInit();
  const [formData, setFormData] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const CartContext = useCart();
  const HistoryContext = useHistory();

  useEffect(() => {
    const initialFormData = formFields.reduce((acc, field) => {
      (acc as any)[field.key] = field.value as string;
      return acc;
    }, {} as Partial<User>);
    setFormData(initialFormData);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Valida il campo corrente solo se il form è stato già inviato
    if (submittedOnce) {
      const field = formFields.find(f => f.key === name);
      if (field) {
        const newErrors = { ...errors };
        if (field.validation && !field.validation(value)) {
          newErrors[name] = field.errorMessage || 'Field is invalid';
        } else if (field.asterisk && !value) {
          newErrors[name] = field.errorMessage || 'Field is required';
        } else {
          delete newErrors[name]; // Rimuovi l'errore se il campo è valido
        }
        setErrors(newErrors);
      }
    }
  }

  function form_isValid(): boolean {
    const newErrors: Record<string, string> = {};
    formFields.forEach(field => {
      const value = formData[field.key as keyof User];
      if (field.validation && !field.validation(value)) {
        newErrors[field.key] = field.errorMessage || 'Field is invalid';
      } else if (field.asterisk && !value) {
        newErrors[field.key] = field.errorMessage || 'Field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function calculateTotal(cartItems: any[]) {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittedOnce(true);
    if (form_isValid()) {
      // Ottieni gli articoli dal carrello
      const cartItems = CartContext.get();
      
      // Aggiungi l'ordine allo storico
      HistoryContext.add({
        id: Math.floor(Math.random() * 1000000),
        date: new Date().toISOString(),
        items: cartItems,
        total: calculateTotal(cartItems),
        method: "delivery",
        // address: formData.address,
        // city: formData.city,
        // country: formData.country
      });
      
      // Svuota il carrello
      CartContext.clear();
      
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-bg-c3 p-4 rounded">
        <h2>Successo!</h2>
        <div>Il tuo ordine è stato preso in carico.</div>
        <div>Verrà spedito a <b>{formData.username}</b></div>
        <div>all'indirizzo: <b>{formData.address}</b> di
          <b className='mx-1'>{formData.city}</b>,
          <b className='mx-1'>{formData.country}</b>
        </div>
      </div>
    );
  }

  return (
    <div className="text-bg-c1 p-4 rounded">
      <h2>Inserisci i dati di consegna</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map(field => (
          <div key={field.key} className="mb-3">
            <label htmlFor={field.key} className="form-label">
              <span>{field.label}</span>
              {field.asterisk && <b className="text-danger mx-2">*</b>}
            </label>
            <input type={field.type}
                  id={field.key}
                  name={field.key}
                  value={formData[field.key as keyof User] || ''}
                  onInput={handleChange}
                  placeholder={field.placeholder}
                  className={`form-control ${(submittedOnce || errors[field.key]) ? (errors[field.key] ? 'is-invalid' : 'is-valid') : ''}`}/>
            {(submittedOnce || errors[field.key]) && errors[field.key] &&
              <div className="invalid-feedback">{errors[field.key]}</div>
            }
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Invia</button>
      </form>
    </div>
  );
}