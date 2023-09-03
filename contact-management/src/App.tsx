import React from 'react';
import Header from './components/Header.tsx';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
    </QueryClientProvider>
  );
};

export default App;