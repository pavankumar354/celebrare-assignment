import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import Contacts from '../components/Contacts.tsx';
import Charts from '../components/Charts.tsx';
import AddNewContacts from '../components/AddNewContacts.tsx';
import EditContact from '../components/EditContact.tsx';
import MapView from '../components/MapView';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Contacts />,
        children: [
          {
            path: 'contacts',
            element: <Contacts />,
          },
        ]
      },
      {
        path: '/contacts/new',
        element: <AddNewContacts />
      },
      {
        path: '/contacts/:id',
        element: <EditContact />
      },
      {
        path: '/charts',
        element: <Charts />
      },
      {
        path: '/maps',
        element: <MapView />
      }
    ]
  },
]);

export default routes;