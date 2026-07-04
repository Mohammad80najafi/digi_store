import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserProfile = {
  name: string
  email: string
  phone: string
  address: string
  image: string
  role?: string
}

type UserState = {
  profile: UserProfile
  updateProfile: (data: Partial<UserProfile>) => void
}

const defaultProfile: UserProfile = {
  name: 'محمد نجفی',
  email: 'najafimohammad2808@gmail.com',
  phone: '',
  address: '',
  image: '',
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      updateProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),
    }),
    { name: 'user-storage' },
  ),
)
