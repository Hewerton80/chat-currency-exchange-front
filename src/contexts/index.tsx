import { ReactNode } from 'react';
import { AuthContexrProvider } from './authContext';
import { ThemeContextProvider } from './themeContext';

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <AuthContexrProvider>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </AuthContexrProvider>
  );
}

export default Providers;
