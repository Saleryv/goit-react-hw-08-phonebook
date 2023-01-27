// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { addContacts, allContacts, deleteContacts } from "services/API";


// export const getContactsRequest = createAsyncThunk('contacts/getAllContacts', async(_,thunkAPI) => {
//     try{
//      const data = await allContacts();
//      return data;
//     }
//     catch(error){
//         return thunkAPI.rejectWithValue(error.message);
//     }
// });


// export const deleteContactsRequest = createAsyncThunk(
//     'contacts/deleteContacts',
//     async(contactId,thunkAPI) => {
//         try {
//             const data = await deleteContacts(`/contacts/${contactId}`);
//             return data.id;
//         } catch(error){
//             return thunkAPI.rejectWithValue(error.message);
//     }
// });

// export const addContactsRequest = createAsyncThunk(
//     'contacts/addContacts',
//     async(contact,thunkAPI) => {
//         try {
//             const data = await addContacts(contact);
//             return data;
//         } catch(error){
//             return thunkAPI.rejectWithValue(error.message);
//     }
// });