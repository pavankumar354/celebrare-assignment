import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ContactsType from '../utils/ContactsType';

interface ContactState {
  contactsList: ContactsType[];
}
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactsList: [],
  } as ContactState,
  reducers: {
    addContact: (state, actions: PayloadAction<ContactsType>) => {
      state.contactsList.push(actions.payload);
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contactsList = state.contactsList.filter(
        (contact, index) => index !== action.payload
      );
    },
    editContact: (state, action: PayloadAction<{ urlId: number; updatedContact: ContactsType; }>) => {
      const { urlId, updatedContact } = action.payload;
      if (urlId) state.contactsList[ urlId ] = updatedContact;
    }
  }
});

export const { addContact, deleteContact, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;