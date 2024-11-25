import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  roles: string
}

interface AuthInitialState {
  user: User | null
  isLogged: boolean
  setUserData: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthInitialState>()(
  devtools((set) => ({
    user: null,
    isLogged: false,
    setUserData: (user) => set({ user, isLogged: true }),
    logout: () => set({ user: null, isLogged: false }),
  }))
)
