import { configureStore } from "@reduxjs/toolkit";
import authCardSlice from "./slices/authCardSlice.js";
import addEmployeeSlice from "./slices/addEmployeeSlice.js";
const store = configureStore({
  reducer: {
    authCard: authCardSlice, // Register the authCardSlice slice
    addEmployee: addEmployeeSlice,
  },
});

export default store;
