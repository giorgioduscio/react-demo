import { createContext, useState, useContext, type ReactNode } from 'react';
import { type Order } from '../interfaces/datas';

const HistoryContext = createContext<{
  get: (order_id?:number)=> Order | Order[] |undefined;
  add: (order: Order) => void;
  remove: (orderId: number) => void;
  update: (orderId: number, newOrder: Order) => void;
  clear: () => void;
} | undefined>(undefined);

export function useHistory(){
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

export function HistoryProvider({ children }:{ children: ReactNode }){
  const [history, setHistory] = useState<Order[]>([]);

  const actions ={
    get(order_id?:number){
      if(order_id===undefined) return history;

      const orderMatch =history.find(a=> a.id===order_id);
      return orderMatch 
    },
    add(order: Order){
      setHistory((prevHistory) => {
        const existingOrder = prevHistory.find(item => item.id === order.id);
        if (existingOrder) {
          return prevHistory.map(item =>
            item.id === order.id
              ? { ...item, ...order }
              : item
          );
        }
        // Aggiungi il nuovo ordine
        const newId = prevHistory.length > 0 ? Math.max(...prevHistory.map(item => item.id)) + 1 : 1;
        return [...prevHistory, { ...order, id: newId }];
      });
    },

    remove(orderId: number){
      setHistory((prevHistory) => prevHistory.filter(item => item.id !== orderId));
    },

    update(orderId: number, newOrder: Order){
      setHistory((prevHistory) => 
        prevHistory.map(item =>
          item.id === orderId ? { ...item, ...newOrder } : item
        )
      );
    },

    clear(){
      setHistory([]);
    },
  }

  return (
    <HistoryContext.Provider value={{...actions}}>
      {children}
    </HistoryContext.Provider>
  );
};
