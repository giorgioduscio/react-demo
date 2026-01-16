import { type JSX, type ReactNode } from 'react';
import { TablesProvider } from './TablesContext';
import { CartProvider } from './CartContext';
import { HistoryProvider } from './HistoryContext';
import { AuthProvider } from './AuthContext';

type Provider = ({ children }: { children: ReactNode }) => JSX.Element;

interface ComposeProvidersProps {
  providers: Provider[];
  children: ReactNode;
}

const providers = [TablesProvider, CartProvider, HistoryProvider, AuthProvider];
function ComposeProviders({ providers, children }: ComposeProvidersProps) {
  return (
    <>
      {providers.reduceRight((acc, Provider) => {
        return <Provider>{acc}</Provider>;
      }, children)}
    </>
  );
};

export { ComposeProviders, providers };
