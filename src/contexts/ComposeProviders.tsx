import { type JSX, type ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { TablesProvider } from './TablesContext';
import { CartProvider } from './CartContext';

type Provider = ({ children }: { children: ReactNode }) => JSX.Element;

interface ComposeProvidersProps {
  providers: Provider[];
  children: ReactNode;
}

const providers = [ThemeProvider, TablesProvider, CartProvider];
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
