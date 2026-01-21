import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import { type CreditCard, type FormField, type User } from '../interfaces/structures';

const AuthContext = createContext<{
  get: () => User | null;
  user: User | null;
  setUser: (userData: Partial<User>) => void;
  reset: () => void;
  card: CreditCard | null;
  setCard: React.Dispatch<React.SetStateAction<CreditCard | null>>;
} | undefined>(undefined);

export function useAuth(){
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }:{ children: ReactNode }){
  // Carica l'utente dal localStorage all'inizializzazione
  const [card, setCard] =useState<CreditCard|null>(null)
  const [user, setUserState] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('local-user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      return null;
    }
  });

  // Salva l'utente nel localStorage ogni volta che cambia
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('local-user', JSON.stringify(user));
      } else {
        localStorage.removeItem('local-user');
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }, [user]);

  const actions ={
    get(){
      return user;
    },
    user,
    setUser(userData: Partial<User>){
      // Verifica che i dati utente siano validi
      if (!userData || typeof userData !== 'object') {
        console.error('Invalid user data');
        return;
      }

      // Crea un nuovo oggetto utente con i dati esistenti e quelli nuovi
      const updatedUser: User = {
        id: userData.id || user?.id || 0,
        username: userData.username || user?.username || '',
        email: userData.email || user?.email || '',
        expiration: userData.expiration || user?.expiration || '',
        city: userData.city || user?.city || '',
        country: userData.country || user?.country || '',
        address: userData.address || user?.address || '',
        creditCard: userData.creditCard || user?.creditCard || undefined
      };

      setUserState(updatedUser);
    },
    reset(){
      setUserState(null);
    },

    card,
    setCard,
  }

  return (
    <AuthContext.Provider value={{...actions}}>
      {children}
    </AuthContext.Provider>
  );
};


export function formInit() :FormField[] {
  return [
    {
      key: 'username',
      type: 'text',
      label: 'Username',
      value: '',
      placeholder: 'Es: Mario Rossi',
      asterisk: true,
      validation: (value: string) => value.trim().length >= 3,
      errorMessage: 'Username deve contenere almeno 3 caratteri'
    },
    // {
    //   key: 'email',
    //   type: 'email',
    //   label: 'Email',
    //   value: '',
    //   placeholder: 'Es: mario.rossi@example.com',
    //   asterisk: true,
    //   validation: (value: string) => /^[^@]+@[^@]+\.[^@]+$/.test(value),
    //   errorMessage: 'Inserisci un indirizzo email valido'
    // },
    {
      key: 'city',
      type: 'text',
      label: 'Città',
      value: '',
      placeholder: 'Es: Roma',
      asterisk: true,
      validation: (value: string) => value.trim().length >= 3,
      errorMessage: 'Città deve contenere almeno 3 caratteri'
    },
    {
      key: 'country',
      type: 'text',
      label: 'Nazione',
      value: '',
      placeholder: 'Es: Italia',
      asterisk: true,
      validation: (value: string) => value.trim().length >= 3,
      errorMessage: 'Nazione deve contenere almeno 3 caratteri'
    },
    {
      key: 'address',
      type: 'text',
      label: 'Indirizzo',
      value: '',
      placeholder: 'Es: Via Roma 123',
      asterisk: true,
      validation: (value: string) => value.trim().length >= 5,
      errorMessage: 'Indirizzo deve contenere almeno 5 caratteri'
    }
  ];
}