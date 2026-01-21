import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { agree, toast } from "../tools/feedbacksUI";
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { type FormField, type CreditCard } from "../interfaces/structures";
import type { CartItem } from '../interfaces/apis';

function creditCardFormInit(): FormField[] {
  return [
    {
      key: 'cardNumber',
      type: 'text',
      label: 'Numero della Carta',
      value: '1234 5678 9012 3456',
      placeholder: '1234 5678 9012 3456',
      asterisk: true,
      validation: (value: string) => {
        const cleaned = value.replace(/\s/g, "");
        return cleaned.length === 16;
      },
      errorMessage: 'Il numero della carta deve essere di 16 cifre'
    },
    {
      key: 'cardHolder',
      type: 'text',
      label: 'Nome del Titolare',
      value: 'Mario Rossi',
      placeholder: 'Mario Rossi',
      asterisk: true,
      validation: (value: string) => value.trim().length >= 3,
      errorMessage: 'Il nome deve contenere almeno 3 caratteri'
    },
    {
      key: 'expiryDate',
      type: 'text',
      label: 'Data di Scadenza',
      value: '12/25',
      placeholder: 'MM/YY',
      asterisk: true,
      validation: (value: string) => /^\d{2}\/\d{2}$/.test(value),
      errorMessage: 'La data deve essere nel formato MM/YY'
    },
    {
      key: 'cvv',
      type: 'text',
      label: 'CVV',
      value: '123',
      placeholder: '123',
      asterisk: true,
      validation: (value: string) => /^\d{3,4}$/.test(value),
      errorMessage: 'Il CVV deve essere di 3 o 4 cifre'
    }
  ];
}

export function Payment(){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method') || 'table'; // Default to table if not specified
  const cartContext = useCart();
  const authContext = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => cartContext.get() as CartItem[]);
  const formFields = creditCardFormInit();
  const [formData, setFormData] = useState<CreditCard>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedOnce, setSubmittedOnce] = useState(false);

  // Inizializza gli articoli del carrello
  useEffect(() => {
    setCartItems(cartContext.get() as CartItem[]);
    cartItems
    
    const initialFormData: CreditCard = formFields.reduce((acc, field) => {
      return {
        ...acc,
        [field.key]: field.value as string
      };
    }, {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    } as CreditCard);
    setFormData(initialFormData);
  }, []); // Array vuoto per eseguire solo una volta all'inizio

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;    
    
    // Applica la formattazione specifica per alcuni campi
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, "");
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));

    // Valida il campo corrente solo se il form è stato già inviato
    if (submittedOnce) {
      const field = formFields.find(function(f) {
        return f.key === name;
      });
      if (field) {
        const newErrors = { ...errors };
        if (field.validation && !field.validation(formattedValue)) {
          newErrors[name] = field.errorMessage || 'Campo non valido';
        } else if (field.asterisk && !formattedValue) {
          newErrors[name] = field.errorMessage || 'Campo obbligatorio';
        } else {
          delete newErrors[name]; // Rimuovi l'errore se il campo è valido
        }
        setErrors(newErrors);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittedOnce(true);    

    // Valida tutti i campi
    const newErrors: Record<string, string> = {};
    let isValid = true;

    formFields.forEach(function(field) {
      const value = formData[field.key as keyof CreditCard];
      if (field.validation && !field.validation(value)) {
        newErrors[field.key] = field.errorMessage || 'Campo non valido';
        isValid = false;
      } else if (field.asterisk && !value) {
        newErrors[field.key] = field.errorMessage || 'Campo obbligatorio';
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      // Salva i dati della carta di credito in AuthContext
      authContext.setCard({
        cardNumber: formData.cardNumber,
        cardHolder: formData.cardHolder,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv
      });

      // Se tutto è valido, reindirizza alla pagina di risultato
      toast("Carta di credito aggiunta!");
      to(`/result?method=${method}`, true);
    }
  }

  function formatCardNumber(value: string) {
    // Rimuovi tutti i caratteri non numerici
    const cleanedValue = value.replace(/\D/g, "");

    // Formatta il numero della carta con spazi ogni 4 cifre
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Limita a 16 cifre
    return formattedValue.substring(0, 19);
  }

  function formatExpiryDate(value: string) {
    // Rimuovi tutti i caratteri non numerici
    const cleanedValue = value.replace(/\D/g, "");

    // Aggiungi la barra dopo i primi 2 caratteri
    if (cleanedValue.length > 2) {
      return cleanedValue.substring(0, 2) + "/" + cleanedValue.substring(2, 4);
    }

    return cleanedValue;
  }

  async function to(path: string, skipConfirm?: boolean) {
    if (!skipConfirm && !await agree('Uscire dalla pagina?', 'Esci', 'danger')) return;
    navigate(path);
  }

  async function backToCart() {
    if (!await agree('Tornare al carrello?', 'Torna', 'danger')) return;
    navigate('/cart');
  }

  return (
    <article id="CreditCard" className="container p-0 max-w-400px" lang="it" role="article">
      <header className="p-3 mb-3 text-bg-primary shadow d-flex justify-content-between" role="banner">
        <h1 className="m-0">Pagamento</h1>
        <button className="btn"
                onClick={() => backToCart()}
                aria-label="Chiudi pagina">
          <b className="bi bi-x-lg" aria-hidden="true"></b>
        </button>
      </header>

      <main className="p-2" role="main">
        <div className="text-bg-c1 p-4 rounded">
          <h2>Inserisci i dati della carta per completare l'ordine</h2>
          <form onSubmit={(e)=> handleSubmit(e)} aria-label="Form carta di credito">
            {formFields.map(field => {
              // Determina il maxLength in base al campo
              let maxLength: number | undefined;
              if (field.key === 'cardNumber') maxLength = 19; // 16 cifre + 3 spazi
              else if (field.key === 'expiryDate') maxLength = 5; // MM/YY
              else if (field.key === 'cvv') maxLength = 4; // 3 o 4 cifre

              return (
                <div key={field.key} className="mb-3">
                  <label htmlFor={field.key} className="form-label">
                    <span>{field.label}</span>
                    {field.asterisk && <b className="text-danger mx-2" aria-label="Campo obbligatorio">*</b>}
                  </label>
                  <input type={field.type}
                        id={field.key}
                        name={field.key}
                        value={formData[field.key as keyof CreditCard] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        aria-label={field.label}
                        maxLength={maxLength}
                        className={`form-control ${(submittedOnce || errors[field.key]) ? (errors[field.key] ? 'is-invalid' : 'is-valid') : ''}`}/>
                  {(submittedOnce || errors[field.key]) && errors[field.key] &&
                    <div className="invalid-feedback" role="alert">{errors[field.key]}</div>
                  }
                </div>
              );
            })}

            <button type="submit" className="btn btn-primary" 
                    aria-label="Imposta metodo di pagamento"
              >Imposta metodo di pagamento</button>
          </form>
        </div>
      </main>
    </article>
  );
};
