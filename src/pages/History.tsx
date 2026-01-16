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

  // Ritorna un array di oggetti che uniscono l'item del carrello con il rispettivo articolo
  function mergeCartArticles(cartParam: CartItem[]): (Article & CartItem)[] {
    return cartParam.map(item => {
      const articleMatch = articles.find(article => article.id === item.articleId);
      if (!articleMatch) return null;
      return { ...item, ...articleMatch };
    }).filter((item): item is Article & CartItem => item !== null);
  }

  // Aggiorna lo stato locale quando lo storico cambia
  React.useEffect(() => {
    setHistoryItems(Hystory.get() as Order[]);
  }, [Hystory.get]);
  
  return <article id="History" className="container p-0">
    <header className="p-3 mb-3 text-bg-c3 shadow">
      <h1 className="m-0">Storico</h1>
    </header>

    {/* STORICO */}
    <section className='p-2'>
      {historyItems.length === 0 ? 
        <div className="text-bg-c3 rounded p-3 text-center">
          <h3>Lo storico è vuoto</h3>
          <p className='text-bg-c3'>Non è stato ancora effettuato ancora nessun ordine</p>
        </div>

      : /*lenght>0*/
        <main className=''>
          <h3>Storico ordinazioni</h3>
          {historyItems.reverse().map((order) => (
            <div key={order.id} className="p-3 my-3 rounded text-bg-c1">
              <div className="d-flex justify-content-between mb-2">
                <strong>Ordine #{order.id}</strong>
                <span>{new Date(order.date).toLocaleString()}</span>
              </div>

              <div className="mb-2">
                <strong>Totale:</strong> {order.total.toFixed(2)}€
              </div>

              <div className="d-grid gap-1 cols-auto-1fr-auto">
                {mergeCartArticles(order.items).map((item) => <React.Fragment key={item.id}>
                  <i className="bi bi-dot"></i>
                  <b>{item.label} {item.quantity>1 ? '×'+item.quantity : ''}</b>
                  <span>{(item.price * item.quantity).toFixed(2)}€</span>
                </React.Fragment>)}
              </div>
            </div>
          ))}
        </main>
      }
    </section>

  </article>
}