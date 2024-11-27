import { theme } from 'antd';
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
  theme: typeof theme
  setUserData: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthInitialState>()(
  devtools((set) => ({
    user: null,
    isLogged: false,
    theme: theme,
    setUserData: (user) => set({ user, isLogged: true }),
    logout: () => set({ user: null, isLogged: false }),
  }))
)
