import { createSlice } from "@reduxjs/toolkit";
import {getUser, loginGoogle, loginUser, logoutUser, setUserBalance} from './auth-operations';
import { Notify } from "notiflix";
import {ITransaction} from '../transaction/transactionsSlice';

export interface IUser {
  id: string | null;
  email: string | null;
  password?: string | null;
  balance: number;
  transactions: ITransaction[]
}

export interface IInitState {
  user: IUser;
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: null;
}

const authInitialState: IInitState = {
  user: {
    email: "",
    balance: 0,
    id: "",
    transactions: [
      {
        description: "Transaction's description",
        category: "Продукты",
        amount: 0,
        date: "2020-12-31",
        _id: "507f1f77bcf86cd799439013"
      }
    ]
  },
  token: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

const handlePending = (state: IInitState) => {
  state.isLoading = true;
};
const handleRejected = (state: IInitState, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    loginGoogleLocal(state, action) {
  console.log("loginGoogle", state, action);
  state.isLoading = false;
  state.token = action.payload;
  Notify.success(`Welcome back, ${state.user.email}`);
  state.isAuth = true;
}
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.rejected, (state: IInitState, action: any) => {
        state.isLoading = false;
        Notify.failure(`Wrong email or password`);
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userData;
        state.token = action.payload.accessToken;
        Notify.success(`Welcome back, ${state.user.email}`);
        state.isAuth = true;
      })

      // .addCase(loginGoogle.pending, handlePending)
      // .addCase(loginGoogle.rejected, (state: IInitState, action: any) => {
      //   state.isLoading = false;
      //   Notify.failure(`Wrong email or password`);
      //   state.error = action.payload;
      // })
      // .addCase(loginGoogle.fulfilled, (state, action) => {
      //   console.log("loginGoogle", state, action);
      //   state.isLoading = false;
      //   state.token = action.payload.accessToken;
      //   Notify.success(`Welcome back, ${state.user.email}`);
      //   state.isAuth = true;
      // })

      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, (state) => {
        Notify.success(`See ya, ${state.user.email}`);
        state.user = authInitialState.user;
        state.token = null;
        state.isAuth = false;
        state.isLoading = false
      })
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.rejected, handleRejected)
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
    .addCase(setUserBalance.pending, handlePending)
      .addCase(setUserBalance.rejected, handleRejected)
      .addCase(setUserBalance.fulfilled, (state, action) => {
        state.user.balance = action.payload.newBalance;
        state.isLoading = false;
      });
  },
});
export const { loginGoogleLocal } = authSlice.actions;
export const authReducer = authSlice.reducer;
