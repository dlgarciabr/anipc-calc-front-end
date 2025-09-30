import { Session } from "@/types";
import { create } from "zustand";


const initialState: Session = {
    token: '',
    setToken: ()=>{}
}

export const useSessionStore = create<Session>((set) => ({
  ...initialState,
  setToken: (token: string) => set((state) => ({
    ...state,
    token
  }))
}));