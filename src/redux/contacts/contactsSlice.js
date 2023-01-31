import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ContactsAPI } from 'services/userAPI';

export const getContactsRequest = createAsyncThunk(
  'contacts/get',
  async (_, thunkAPI) => {
    try {
      const response = await ContactsAPI.getContactsRequest();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactsRequest = createAsyncThunk(
  'contacts/add',
  async (contactData, thunkAPI) => {
    try {
      const response = await ContactsAPI.addContactsRequest(contactData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteContactsRequest = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkApi) => {
    try {
      const response = await ContactsAPI.deleteContactsRequest(contactId);

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
      .addCase(getContactsRequest.pending, state => {
        state.isLoading = true;
        // state.error = null;
      })
      .addCase(getContactsRequest.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getContactsRequest.rejected, (state, action) => {
        state.contacts = [];
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(deleteContactsRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactsRequest.fulfilled, (state, action) => {
        const deleteContactId = action.payload.id;
        state.contacts = state.contacts.filter(contact => contact.id !== deleteContactId);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContactsRequest.rejected, (state, action) => {
        state.contacts = [];
        state.isLoading = false;
        state.error = action.error.message;
      })


      .addCase(addContactsRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactsRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(addContactsRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {  setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
