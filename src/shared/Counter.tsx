import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from '../tools/feedbacksUI';

interface CounterProps {
  articleId: number;
  positionClass?: string;
  style?: React.CSSProperties;
}

export function Counter({ articleId, positionClass = 'position-absolute text-bg-c1 rounded me-2', style = {top:'25%', right:'0'} }: CounterProps) {
  const { add, get } = useCart();

  const [quantity, setQuantity] = useState(() => {
    const cartItem = get(articleId)[0];
    return cartItem ? cartItem.quantity : 0;
  });
  
  function handleClick(isIncrement: boolean) {
    if (isIncrement) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      add(articleId, 1); // Aggiungi al carrello
      toast("Piatto aggiunto al carrello", "success");

    } else if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      add(articleId, -1); // Rimuovi dal carrello (quantità negativa)
      toast("Piatto rimosso dal carrello", "danger");
    }
  }
  
  return (
    <div className={positionClass} style={style}>
      <div data-counter className='d-flex flex-column align-items-center'>
        <button onClick={() => handleClick(true)}
                className='h-40px max-w-40px btn btn-primary circle'
                aria-label="Aumenta quantità">
          <i className="bi bi-plus-lg" aria-hidden="true"></i>
        </button>
        <span className='p-2 m-auto' aria-live="polite">{quantity}</span>
        <button onClick={() => handleClick(false)}
                disabled={quantity === 0}
                className='h-40px max-w-40px btn btn-secondary circle '
                aria-label="Diminuisci quantità">
          <i className="bi bi-dash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}