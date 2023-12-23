import { create } from 'zustand'

interface IUser {
  token: string
  setLogin: (v: string) => void
  setLogout: () => void
}

export const useUserStore = create<IUser>()(set => ({
  token: localStorage.getItem('user-token') || '',
  setLogin: (token: string) => {
    localStorage.setItem('user-token', token)
    set(() => ({ token: token }))
  },
  setLogout: () => {
    localStorage.removeItem('user-token')
    set(() => ({ token: '' }))
  },
}))

export const useIsLogin = () => useUserStore(state => !!state.token)
