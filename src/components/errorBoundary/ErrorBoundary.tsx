import { Layout, Typography } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { LayoutStyles } from '../../pages/login/styles/Login.styles';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState<string | boolean>(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setHasError(event.error?.message);
      console.error('Error caught by ErrorBoundary:', event.error);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return <Layout style={LayoutStyles}>
      <Typography style={{
        textAlign: 'center',

        fontSize: '1.5rem',
        color: 'red',
      }}>We're in maintenance mode. Please stay tuned - {hasError}</Typography>
    </Layout>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;