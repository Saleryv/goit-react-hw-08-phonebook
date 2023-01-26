import { createAsyncThunk } from "@reduxjs/toolkit";
import { addContacts, allContacts, deleteContacts } from "services/API";


export const getContactsThunk = createAsyncThunk('contacts/getAllContacts', async(_,thunkAPI) => {
    try{
     const data = await allContacts();
     return data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const deleteContactsThunk = createAsyncThunk(
    'contacts/deleteContacts',
    async(id,thunkAPI) => {
        try {
            const data = await deleteContacts(id);
            return data.id;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message);
    }
});

export const addContactsThunk = createAsyncThunk(
    'contacts/addContacts',
    async(contact,thunkAPI) => {
        try {
            const data = await addContacts(contact);
            return data;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message);
    }
});