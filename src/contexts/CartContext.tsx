import { createContext, useState, useContext, type ReactNode } from 'react';
import { type CartItem } from '../interfaces/datas';

const CartContext = createContext<{
  get: (article_id?:number)=> CartItem | CartItem[] |undefined;
  add: (articleId: number, quantity: number) => void;
  remove: (itemId: number) => void;
  update: (itemId: number, newQuantity: number) => void;
  clear: () => void;
  number_get: ()=>string,
  number_set: (newValue:string) => void,
} | undefined>(undefined);

export function useCart(){
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export function CartProvider({ children }:{ children: ReactNode }){
  const [cart, setCart] = useState<CartItem[]>([]);
  const [_orderNumber, _setOrderNumber] =useState('')
  const actions ={
    get(article_id?:number){
      if(article_id===undefined) return cart;

      const articleMatch =cart.find(a=> a.articleId===article_id);
      return articleMatch 
    },
    add(articleId: number, quantity: number){
      setCart((prevCart) => {
        const existingItem = prevCart.find(item => item.articleId === articleId);
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          if (newQuantity <= 0) {
            // Rimuovi l'elemento se la quantità diventa 0 o negativa
            return prevCart.filter(item => item.articleId !== articleId);
          }
          return prevCart.map(item =>
            item.articleId === articleId
              ? { ...item, quantity: newQuantity }
              : item
          );
        }
        // Aggiungi solo se la quantità è positiva
        if (quantity > 0) {
          const newId = prevCart.length > 0 ? Math.max(...prevCart.map(item => item.id)) + 1 : 1;
          return [...prevCart, { id: newId, articleId, quantity }];
        }
        return prevCart;
      });
    },
  
    remove(itemId: number){
      setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    },
  
    update(itemId: number, newQuantity: number){
      setCart((prevCart) => 
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    },
  
    clear(){
      setCart([]);
    },

    // NUMERO ORDINE
    number_get(){
      return _orderNumber;
    },
    number_set(newValue:string){
      if(newValue && typeof newValue=='string')
        _setOrderNumber(newValue)
    }
  }

  return (
    <CartContext.Provider value={{...actions}}>
      {children}
    </CartContext.Provider>
  );
};
