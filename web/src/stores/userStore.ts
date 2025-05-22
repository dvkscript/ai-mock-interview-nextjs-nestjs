import { GetUserProfile } from '@/actions/user.action'
import { create, StateCreator } from 'zustand'

type State = {
    profile: GetUserProfile | null
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