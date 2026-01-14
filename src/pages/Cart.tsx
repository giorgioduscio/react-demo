import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useHistory } from '../contexts/HistoryContext';
import { articles } from '../assets/articles';
import { toast } from "../tools/feedbacksUI";
import type { CartItem } from '../interfaces/datas';
import type { Article } from '../interfaces/datas';
import { useNavigate } from 'react-router-dom';

export function Cart() {
  document.title = 'Carrello';
  const navigate = useNavigate();
  const cartContext = useCart();
  const historyContext = useHistory();
  const [cartItems, setCartItems] = React.useState<CartItem[]>(() => cartContext.get() as CartItem[]);  

  // Aggiorna lo stato locale quando il carrello cambia
  React.useEffect(() => {
    setCartItems(cartContext.get() as CartItem[]);
  }, [cartContext.get]);



  // Ritorna un array di oggetti che uniscono l'item del carrello con il rispettivo articolo
  function mergeCartArticles(cartParam: CartItem[]): (Article & CartItem)[] {
    return cartParam.map(item => {
      const articleMatch = articles.find(article => article.id === item.articleId);
      if (!articleMatch) return null;
      // Preserve the cart item's ID and add article data
      return { 
        ...articleMatch, 
        id: item.id,        // Keep the cart item's unique ID
        articleId: item.articleId,  // Keep the articleId reference
        quantity: item.quantity     // Keep the quantity
      };
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
      cartContext.remove(itemId);
      toast("Elemento rimosso", "danger")
    } else {
      cartContext.update(itemId, newQuantity);
      toast("Elemento modificato", "success")
    }
    setCartItems(cartContext.get() as CartItem[]);
  };

  function doPayment(){
    // Crea un nuovo ordine con gli articoli del carrello
    const newOrder = {
      id: 0, // L'ID verrà assegnato automaticamente dal context
      date: new Date().toISOString(),
      items: [...cartItems],
      total: calculateTotal()
    };
    cartContext.number_set(`${Math.floor(Math.random() *100)}`)

    // Aggiungi l'ordine allo storico
    historyContext.add(newOrder);
    
    // Svuota il carrello
    cartContext.clear();
    
    // Aggiorna lo stato locale
    setCartItems([]);
    
    // Mostra un messaggio di successo
    toast("Ordine effettuato!", "success");
    
    // Naviga alla pagina di pagamento
    navigate('/payment?method=takeAway')
  }

  return (
    <article id="Cart" className="container p-0">
      <header className="p-3 mb-3 text-bg-c3 shadow">
        <h1 className="m-0">Carrello</h1>
      </header>

      {/* CARRELLO */}
      <section className="p-2">
        {cartItems.length === 0 ? 
          <div className="text-bg-c3 rounded p-3 text-center">
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

            <div className="d-grid cols-auto-1fr gap-2 align-items-start">
              {mergeCartArticles(cartItems).map((item, i) =>  <React.Fragment key={i}>
                <button onClick={() => cartContext.remove(item.id)}
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
                    {item.quantity==1 ?
                      <button onClick={() => cartContext.remove(item.id)}
                              className="btn btn-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    : /*item.quantity==1*/
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="btn btn-secondary circle h-40px max-w-40px"
                              disabled={item.quantity <= 1}>
                        <i className="bi bi-dash"></i>
                      </button>
                    }

                    <span className="px-3">{item.quantity}</span>

                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="btn btn-primary circle h-40px max-w-40px">
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>

                </div>
              </React.Fragment>)}
            </div>

            <div data-btn-wrapper className='py-2 d-grid gap-2'>
              {/* <button className="btn btn-primary" 
                      onClick={() => navigate('/payment?method=table')}
                      >Ordinare al tavolo</button>
              <button className="btn btn-primary" 
                      onClick={() => navigate('/payment?method=takeaway')}
                      >Ordinare da asporto</button> */}
              <button className="btn btn-primary" 
                      onClick={doPayment}
                      >Ordinare da portare via</button>
            </div>
          </main>
        }
      </section>

    </article>
  );
}
