import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Async actions
export const loginAct = createAsyncThunk("auth/login", async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
});

export const logoutAct = createAsyncThunk("auth/logout", async (_, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;
  
    const response = await axios.post(`${API_URL}/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

export const profileAct = createAsyncThunk("auth/profile", async (_, { getState }) => {
    const state = getState();
    const token = state.auth.login.token;
  
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

// Initial state
const initialState = {
  login: {},
  loading: false,
  error: null,
  profile: {},
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
    // login
      .addCase(loginAct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAct.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
      })
      .addCase(loginAct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // logout
      .addCase(logoutAct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAct.fulfilled,  (state) => {
        state.loading = false;
        state.login = {};
      })
      .addCase(logoutAct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // profile
      .addCase(profileAct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileAct.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
      })
      .addCase(profileAct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;