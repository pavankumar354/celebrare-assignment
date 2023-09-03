import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/router.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.ts';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>
);