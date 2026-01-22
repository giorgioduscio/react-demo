import React from 'react';
import { useHistory } from '../contexts/HistoryContext';
import { articles } from '../assets/articles';
import type { CartItem } from '../interfaces/apis';
import type { Article } from '../interfaces/apis';
import type { Order } from '../interfaces/apis';

export function History() {
  document.title ='Storico'
  const Hystory = useHistory();
  const [historyItems, setHistoryItems] = React.useState<Order[]>(() => Hystory.get() as Order[]);

  // Aggiorna lo stato locale quando lo storico cambia
  React.useEffect(() => {
    setHistoryItems(Hystory.get() as Order[]);
  }, [Hystory.get]);

  // Ritorna un array di oggetti che uniscono l'item del carrello con il rispettivo articolo
  function mergeCartArticles(cartParam: CartItem[]): (Article & CartItem)[] {   
    return [...cartParam].map(item => {
      const articleMatch = articles.find(article => article.id === item.articleId);
      if (!articleMatch) return null;
      return { ...item, ...articleMatch };
    }).filter((item): item is Article & CartItem => item !== null);
  }

  // Funzione per formattare la data nel formato "Lun 3 ottobre 2004"
  function formatItalianDate(date: Date | string): string {
    const d = new Date(date);
    
    const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
                    'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    
    const dayName = days[d.getDay()];
    const day = d.getDate();
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();
    
    return `${dayName} ${day} ${monthName} ${year}`;
  }

  // Funzione per formattare l'orario nel formato "10:30"
  function formatItalianTime(date: Date | string): string {
    const d = new Date(date);
    
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  }
  
  return <article id="History" className="container p-0 max-w-400px" lang="it" role="article">
    <header className="p-3 mb-3 text-bg-primary shadow" role="banner">
      <h1 className="m-0">Storico</h1>
    </header>

    {/* STORICO */}
    <section className='p-2' role="main">
      {historyItems.length === 0 ? 
        <div className="text-bg-c3 rounded p-3 text-center" role="alert">
          <h3>Lo storico è vuoto</h3>
          <p className='text-bg-c3'>Non è stato ancora effettuato ancora nessun ordine</p>
        </div>

      : /*lenght>0*/
        <main className=''>
          <h3>Storico ordinazioni</h3>
          <div role="list" className='d-flex flex-column-reverse'>
            {historyItems.map((order) => (
              <div key={order.id} role="listitem" className='py-3'>
                <div data-header className="h4 d-grid cols-1fr-auto">
                  <span>{formatItalianDate(order.date)}</span>
                  <span>{formatItalianTime(order.date)}</span>
                </div>

                <main className="p-2 text-bg-c2 border rounded">
                  <h4 className="d-flex justify-content-between mb-2" 
                      aria-label={`Ordine numero ${order.id}`}>
                      Ordine #{order.id}</h4>

                  <div className="mb-2 d-flex gap-2">
                    <span>Totale:</span> 
                    <b aria-live="polite">{order.total ? order.total.toFixed(2) : '0.00'}€</b>
                  </div>

                  <div className="d-grid gap-1 cols-auto-1fr-auto" role="list">
                    {order.items && Array.isArray(order.items) ? mergeCartArticles(order.items).map((item) => <React.Fragment key={item.id}>
                      <i className="bi bi-dot" aria-hidden="true"></i>
                      <b aria-label={`Articolo: ${item.label}`}>
                        {item.label} {item.quantity>1 ? '×'+item.quantity : ''}
                      </b>
                      <span aria-label={`Prezzo: ${(item.price * item.quantity).toFixed(2)} euro`}>
                        {(item.price * item.quantity).toFixed(2)}€
                      </span>
                    </React.Fragment>) : <p>Nessun articolo trovato</p>}
                  </div>
                </main>
              </div>
            ))}
          </div>
        </main>
      }
    </section>

  </article>
}