import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: !!localStorage.getItem("currentUser"),
  selectedPersona: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.selectedPersona = null;
      localStorage.removeItem("currentUser");
    },
    setSelectedPersona: (state, action) => {
      state.selectedPersona = action.payload;
    },
    addOrUpdatePersona: (state, action) => {
      const newPersona = action.payload;
      if (!state.user) return;

      let updatedPersonas = state.user.personas || [];
      const personaIndex = updatedPersonas.findIndex((p) => p.id === newPersona.id);

      if (personaIndex !== -1) {
        updatedPersonas[personaIndex] = newPersona; // Update existing
      } else {
        updatedPersonas.push(newPersona); // Add new
      }

      state.user.personas = updatedPersonas;
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
    deletePersona: (state, action) => {
      if (!state.user) return;
      state.user.personas = state.user.personas.filter((p) => p.id !== action.payload);
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
  },
});

export const { login, logout, setSelectedPersona, addOrUpdatePersona, deletePersona } =
  authSlice.actions;
export default authSlice.reducer;

