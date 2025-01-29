import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeAddEmployeeCard: false, // "org" or "user" or null
};

const addEmployeeCardSlice = createSlice({
  name: "addEmployeeCard",
  initialState,
  reducers: {
    openAddEmployeeCard(state) {
      state.activeAddEmployeeCard = true;
    },
    closeAddEmployeeCard(state) {
      state.activeCard = false;
    },
  },
});

export const { openAddEmployeeCard, closeAddEmployeeCard } =
  addEmployeeCardSlice.actions;
export default addEmployeeCardSlice.reducer;
