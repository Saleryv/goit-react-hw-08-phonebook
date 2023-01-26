import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from 'services/userAPI';

export const signUp = createAsyncThunk(
  'userData/signUp',
  async (data, { rejectWithValue }) => {
    try {
      const result = await UserAPI.userSignUpRequest(data);
      return result;
    } catch ({message}) {
        return rejectWithValue(message);
    }
  }
);

export const logIn = createAsyncThunk(
  'userData/login',
  async (data, { rejectWithValue }) => {
    try {
      const result = await UserAPI.userSignInRequest(data);
      return result;
    } catch ({message}) {
      return rejectWithValue(message);
    }
  }
);

export const logOut = createAsyncThunk(
  'userData/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const result = await UserAPI.userLogOutRequest();
      return result;
    } catch ({message}) {
        return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'userData/current',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { userData } = getState();
      const result = await UserAPI.getUserDetailsRequest(userData.token);
      return result;
    } catch ({message}) {
        return rejectWithValue(message);
    }
  }
);