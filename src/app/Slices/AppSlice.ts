import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../Utils/Types";
import { pokemonTabs } from "../../Utils/Constants";

const initialState: AppTypeInitialState = {
  isLoading: true,
  toasts: [],
  userInfo: undefined,
  currentPokemonTab: pokemonTabs.description
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToast: (state, action) => {
      const toasts = [...state.toasts];
      toasts.push(action.payload);
      state.toasts = toasts;
    },
    clearToast: (state) => {
      state.toasts = [];
    },
    setUserStatus: (state, action) => {
      state.userInfo = action.payload;
    },
    setPokemonTab: (state, action) => {
      state.currentPokemonTab = action.payload
    }
  },
});

export const { setToast, clearToast, setUserStatus, setPokemonTab, setLoading } = AppSlice.actions;
