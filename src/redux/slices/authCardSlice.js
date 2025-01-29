import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCard: null, // "org" or "user" or null
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    openOrgCard(state) {
      state.activeCard = "org";
    },
    openUserCard(state) {
      state.activeCard = "user";
    },
    closeCard(state) {
      state.activeCard = null;
    },
  },
});

export const { openOrgCard, openUserCard, closeCard } = cardSlice.actions;
export default cardSlice.reducer;
