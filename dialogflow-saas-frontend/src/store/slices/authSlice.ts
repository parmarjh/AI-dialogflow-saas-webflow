// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;