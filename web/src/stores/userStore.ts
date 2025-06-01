import { GetProfile } from '@/actions/auth.action'
import { create, StateCreator } from 'zustand'

type State = {
    profile: GetProfile | null
    setProfile: (profile: State["profile"]) => void
}

export const useUserStore = create(((set) => ({
    profile: null,
    setProfile: (profile) => {
        set({
            profile
        })
    }
})) as StateCreator<State>)