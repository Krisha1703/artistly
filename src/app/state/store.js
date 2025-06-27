// Creates a global user store using Zustand

import { create } from "zustand";

const useUserStore = create((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  createdAt: null,
  lastLoginAt: null,

  setUser: ({ firstName, lastName, email, role, createdAt, lastLoginAt }) =>
    set({
      firstName,
      lastName,
      email,
      role,
      createdAt,
      lastLoginAt,
    }),

  resetUser: () =>
    set({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      createdAt: null,
      lastLoginAt: null,
    }),
}));

export default useUserStore;
