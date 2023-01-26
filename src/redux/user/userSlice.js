import { UserAPI } from "services/userAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const registerUser = createAsyncThunk('user/register', async (FormData, thunkApi) => {
    try {
        const response = await UserAPI.register(FormData);
        localStorage.setItem('token', response.token);
        return response;
    }catch (error) { 
        return thunkApi.rejectWithValue(error.message)
    }
})

export const logIn = createAsyncThunk(
    'user/login',
    async (formData, thunkAPI) => {
      try {
        const response = await UserAPI.login(formData);
        localStorage.setItem('token', response.token);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

const initialState = {
    userData: null,
    token: null,
    isLoading: false,
    error: '',
  };
  const userSlice = createSlice({
    name: 'user',
    initialState,
    // reducers: {
    //   setFilter(state, action) {
    //     state.filter = action.payload;
    //   },
    //}
    extraReducers: builder =>
      builder
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});
export const userReducer = userSlice.reducer;
export default userReducer;