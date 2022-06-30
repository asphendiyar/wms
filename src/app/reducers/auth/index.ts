import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignInResponse, SignOutResponse } from "../../sagas/auth";
import { AuthEnums } from "./types";

export type FormValues = {
  client_id: string;
  client_secret: string;
};
type AuthInitials = {
  isAuth: boolean;
  data: SignInResponse | null;
  signedOut: SignOutResponse | null;
  tokenDate: boolean;
};
const initialState: AuthInitials = {
  isAuth: !!localStorage.getItem("client_id"),
  tokenDate: false,
  data: null,
  signedOut: null,
};

export const fetchSignInAction = createAction<FormValues>(
  AuthEnums.fetchSignIn
);
export const fetchSignOutAction = createAction(AuthEnums.fetchSignOut);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<SignInResponse>) => {
      state.isAuth = true;
      state.data = action.payload;
      localStorage.setItem("client_id", state.data.client_id);
      localStorage.setItem("scope", JSON.stringify(state.data.scope));
    },
    setDataOnSignOut: (state, action: PayloadAction<SignOutResponse>) => {
      state.data = null;
      state.signedOut = action.payload;
      state.isAuth = false;
    },
  },
});

export const { setUserData, setDataOnSignOut } = auth.actions;

export default auth.reducer;
