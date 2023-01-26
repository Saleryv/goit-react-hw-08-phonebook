import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ContactsAPI } from 'services/userAPI';
import { addContactsThunk, deleteContactsThunk, getContactsThunk } from '../thunks/contactsThunk';

export const getContactsRequest = createAsyncThunk(
  'contacts/get',
  async (_, thunkAPI) => {
    try {
      const response = await ContactsAPI.getContactsRequest();

      console.log('response', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactRequest = createAsyncThunk(
  'contacts/add',
  async (contactData, thunkAPI) => {
    try {
      const response = await ContactsAPI.addContactRequest(contactData);

      console.log('response', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteContactRequest = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkApi) => {
    try {
      const response = await ContactsAPI.deleteContactRequest(contactId);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  filter: '',
  error: null,
  isLoading: false,
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getContactsThunk.rejected, (state, action) => {
        state.contacts = [];
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContactsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContactsThunk.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContactsThunk.rejected, (state, action) => {
        state.contacts = [];
        state.isLoading = false;
        state.error = action.error.message;
      }).addCase(addContactsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [action.payload, ...state.contacts];
      })
      .addCase(addContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addContact, setFilter, contactDelete } = contactsSlice.actions;
export default contactsSlice.reducer;
