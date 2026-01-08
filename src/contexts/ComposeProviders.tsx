import { type JSX, type ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';

type Provider = ({ children }: { children: ReactNode }) => JSX.Element;

interface ComposeProvidersProps {
  providers: Provider[];
  children: ReactNode;
}

const providers = [ThemeProvider];
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
