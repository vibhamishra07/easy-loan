import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import loanReducer from '../features/Loans/loanSlice';

export const store = configureStore({
  reducer: {
    auth : authReducer,
    loans : loanReducer
  },
});