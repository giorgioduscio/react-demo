import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { Order } from '../interfaces/apis';

const HistoryContext = createContext<{
  get: (order_id?:number)=> Order[];
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
  // Carica la cronologia dal localStorage all'inizializzazione
  const [history, setHistory] = useState<Order[]>(() => {
    try {
      const savedHistory = localStorage.getItem('local-history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error('Error loading history from localStorage:', error);
      return [];
    }
  });

  // Salva la cronologia nel localStorage ogni volta che cambia
  useEffect(() => {
    try {
      localStorage.setItem('local-history', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history to localStorage:', error);
    }
  }, [history]);

  const actions ={
    get(order_id?:number){
      if(order_id===undefined) return history;

      const orderMatch =history.filter(a=> a.id===order_id);
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
  };

  return <HistoryContext.Provider value={{...actions}}>{children}</HistoryContext.Provider>
};
