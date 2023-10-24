import { AuthType } from "@/types/AuthType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  password: string;
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
    password: "",
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (_, action: PayloadAction<AuthType>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload.username,
          password: action.payload.password,
        },
      };
    },
  },
});

export const { logIn } = auth.actions;
export default auth.reducer;
