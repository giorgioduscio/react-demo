import { type JSX, type ReactNode } from 'react';
import { TablesProvider } from './TablesContext';
import { CartProvider } from './CartContext';
import { HistoryProvider } from './HistoryContext';
import { AuthProvider } from './AuthContext';

interface ComposeProvidersProps {
  providers?: (({ children }: { children: ReactNode }) => JSX.Element)[];
  children: ReactNode;
}

const defaultProviders = [TablesProvider, CartProvider, HistoryProvider, AuthProvider];

function ComposeProviders({ providers = defaultProviders, children }: ComposeProvidersProps) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}

export { ComposeProviders, defaultProviders as providers };
