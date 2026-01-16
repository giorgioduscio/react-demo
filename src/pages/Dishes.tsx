import React, { useState } from 'react';
import { articles } from '../assets/articles';
import { useCart } from '../contexts/CartContext';

export function Dishes() {
  document.title = 'Piatti'
 
  function getArticles() {
    const ordine =['antipasti', 'primi', 'pizze', 'secondi carne', 'secondi pesce', 'bibite'];
    // Ordina gli articoli in base all'ordine specificato
    const sortedArticles = [...articles].sort((a, b) => {
      const indexA = ordine.indexOf(a.section.toLowerCase());
      const indexB = ordine.indexOf(b.section.toLowerCase());
      return indexA - indexB;
    });
    return sortedArticles;
  }

  return(
    <article id="Dishes" className="container p-0">
      <header className="p-3 mb-3 text-bg-c3 shadow">
        <h1 className="m-0">Menu Ristorante</h1>
      </header>

      <main className="p-2">
        <h2>Il Nostro Menu</h2>
        <p>Scopri tutte le nostre prelibatezze organizzate per categoria</p>
        
        {/* Menu sections */}
        <div className="d-flex flex-wrap gap-2">
          {getArticles().map((article, i, _articles) => (
            <React.Fragment key={i}>
              {/* Mostra l'intestazione se è il primo articolo della categoria o se la categoria cambia */}
              {i === 0 || article.section !== _articles[i - 1].section ? (
                <h3 className='mt-3 p-3 w-100 text-bg-c2 rounded'>{article.section}</h3>
              ) : null}

              <div className="border rounded flex-auto max-w-300px text-bg-c1 position-relative">
                <h4 className='p-3 m-0 d-flex gap-2'>
                  <span>{article.price}€</span>
                  <span>{article.label}</span>
                </h4>

                <figure className='m-0'>
                  <img src={article.imageUrl} alt={article.label} className='w-100 max-h-200px'/>
                </figure>

                <div className='p-3'>
                  <div>{article.description}</div>
                </div>

                <Counter articleId={article.id} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </main>

    </article>
  )
}

  
// Componente Counter per gestire la quantità
function Counter({ articleId }: { articleId: number }) {
  const { add, get } = useCart();

  const [quantity, setQuantity] = useState(() => {
    const cartItem = get(articleId)[0];
    return cartItem ? cartItem.quantity : 0;
  });
  
  function handleClick(isIncrement:boolean) {
    if(isIncrement){
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      add(articleId, 1); // Aggiungi al carrello

    } else if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      add(articleId, -1); // Rimuovi dal carrello (quantità negativa)
    }
  }
  
  return (
    <div className="position-absolute text-bg-c1 rounded me-2" 
         style={{top:'25%', right:'0'}}>
      <div data-counter className='d-flex flex-column align-items-center'>
        <button onClick={()=> handleClick(true)}
                className='h-40px max-w-40px btn btn-primary circle'>
          <i className="bi bi-plus-lg"></i>
        </button>
        <span className='p-2 m-auto'>{quantity}</span>
        <button onClick={()=> handleClick(false)}
                disabled={quantity === 0}
                className='h-40px max-w-40px btn btn-secondary circle '>
          <i className="bi bi-dash"></i>
        </button>
      </div>
    </div>
  );
}