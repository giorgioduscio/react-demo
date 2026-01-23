import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Aggiorna lo stato in modo che il prossimo render mostri l'interfaccia di fallback
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Puoi anche registrare l'errore in un servizio di reporting degli errori
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Qui potresti inviare l'errore a un servizio come Sentry, LogRocket, ecc.
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Puoi renderizzare qualsiasi interfaccia di fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="container p-4 text-center" role="alert">
          <div className="alert alert-danger" role="alert">
            <h2 className="text-danger">⚠️ Qualcosa è andato storto</h2>
            <p className="mb-3">Si è verificato un errore nell'applicazione.</p>
            <p className="text-muted small">
              {this.state.error?.message || 'Errore sconosciuto'}
            </p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => window.location.reload()}
              aria-label="Ricarca la pagina"
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Ricarica la pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}