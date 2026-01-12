import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useHistory } from '../contexts/HistoryContext';
import { articles } from '../assets/articles';
import type { CartItem } from '../interfaces/datas';
import type { Article } from '../interfaces/datas';
import type { Order } from '../interfaces/datas';

export function Cart() {
  document.title = 'Carrello';
  const Cart = useCart();
  const { get: getHistory, add: addToHistory } = useHistory();
  const [cartItems, setCartItems] = React.useState<CartItem[]>(() => Cart.get() as CartItem[]);
  const [historyItems, setHistoryItems] = React.useState<Order[]>(() => getHistory() as Order[]);  
  
  // Ritorna un array di oggetti che uniscono l'item del carrello con il rispettivo articolo
  function mergeCartArticles(cartParam: CartItem[]): (Article & CartItem)[] {
    return cartParam.map(item => {
      const articleMatch = articles.find(article => article.id === item.articleId);
      if (!articleMatch) return null;
      return { ...item, ...articleMatch };
    }).filter((item): item is Article & CartItem => item !== null);
  }

  // Calcola il totale del carrello
  function calculateTotal(){
    return cartItems.reduce((total, item) => {
      const article = articles.find(a => a.id === item.articleId);
      return total + (article ? article.price * item.quantity : 0);
    }, 0);
  };

  // Gestione della quantità
  function handleQuantityChange(itemId: number, newQuantity: number){
    if (newQuantity <= 0) {
      Cart.remove(itemId);
      setCartItems(Cart.get() as CartItem[]);
    } else {
      Cart.update(itemId, newQuantity);
      setCartItems(Cart.get() as CartItem[]);
    }
  };

  // Aggiorna lo stato locale quando il carrello cambia
  React.useEffect(() => {
    setCartItems(Cart.get() as CartItem[]);
  }, [Cart.get]);

  // Aggiorna lo stato locale quando lo storico cambia
  React.useEffect(() => {
    setHistoryItems(getHistory() as Order[]);
  }, [getHistory]);

  // Funzione per confermare l'ordine e aggiungerlo allo storico
  function handleConfirmOrder() {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: historyItems.length + 1,
      date: new Date().toISOString(),
      items: cartItems,
      total: calculateTotal(),
    };

    addToHistory(newOrder);
    Cart.clear();
    setCartItems([]);
  }

  return (
    <article id="Cart" className="container p-0">
      <header className="p-3 mb-3 text-bg-c3 shadow">
        <h1 className="m-0">Carrello</h1>
      </header>


      <section className="m-2 p-2 border rounded text-bg-st">
        {cartItems.length === 0 ? 
          <div className="text-bg-c3 rounded p-3 m-4 text-center">
            <h3>Il carrello è vuoto</h3>
            <p className='text-bg-c3'>Aggiungi articoli dal menu per iniziare a ordinare.</p>
          </div>
        :
          <main>
            <h2>Il Tuo Ordine</h2>
            <p>Riepilogo degli articoli selezionati</p>

            

            {/* Riepilogo totale */}
            <h3 className="p-3 d-grid cols-1fr-auto text-bg-c2 rounded">
              <span>Totale:</span>
              <span>{calculateTotal().toFixed(2)}€</span>
            </h3>

            {/* Pulsanti azione */}
            <div className="my-3 d-grid gap-2 cols-auto-auto">
              <button onClick={Cart.clear}
                      className="btn btn-danger">
                Svuota Carrello
              </button>

              <button className="btn btn-success"
                      disabled={cartItems.length === 0}
                      onClick={handleConfirmOrder}>
                Conferma Ordine
              </button>
            </div>

            <div className="d-grid cols-auto-1fr gap-2 align-items-start">
              {mergeCartArticles(cartItems).map((item, i) =>  <React.Fragment key={i}>
                <button onClick={() => Cart.remove(item.id)}
                        className="btn btn-danger">
                  <i className="bi bi-trash"></i>
                </button>

                <div data-card className="min-w-200px text-bg-c1 p-2 rounded">
                  <h4 className="d-grid cols-1fr-auto">
                    <span className='text-truncate'>{item.label}</span>
                    <span>{(item.price * item.quantity).toFixed(2)}€</span>
                  </h4>
                  
                  <div className="small">Prezzo unitario: {item.price}€</div>

                  <div className="d-flex align-items-center mt-2">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="btn btn-secondary circle h-40px max-w-40px"
                            disabled={item.quantity <= 1}>
                      <i className="bi bi-dash"></i>
                    </button>

                    <span className="px-3">{item.quantity}</span>

                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="btn btn-primary circle h-40px max-w-40px">
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>

                </div>
              </React.Fragment>)}
            </div>

          </main>
        }
      </section>


      {/* STORICO */}
      <section className='p-2 m-2 border rounded text-bg-st'>
        {historyItems.length === 0 ? 
          <div className="text-bg-c3 rounded p-3 m-4 text-center">
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
  );
}