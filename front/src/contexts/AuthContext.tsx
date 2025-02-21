import { ReactNode, createContext, useState } from 'react'
import api from '../services/api'

interface iExtraUserFields {
    created_at?: Date
    updated_at?: Date
}

interface iUser {
    email: string
    id: string
    is_admin: string
    is_allowed: string
    name: string
}

interface iSignInCredentials {
    email: string
    password: string
}

interface iAuthContextType {
    user: iUser
    signIn(credentials: iSignInCredentials): Promise<void>
    signOut(): void
}

interface iAuthProviderProps {
    children: ReactNode
}

interface iAuthState {
    token: string
    user: iUser
}

export const AuthContext = createContext({} as iAuthContextType)

export function AuthProvider({ children }: iAuthProviderProps) {
    const [authData, setAuthData] = useState<iAuthState>(() => {
        const token = localStorage.getItem('@EstoqueLEM:token')
        const user = localStorage.getItem('@EstoqueLEM:user')

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`

            return { token, user: JSON.parse(user) }
        }

        return {} as iAuthState
    })

    async function signIn({ email, password }: iSignInCredentials) {
        const response = await api.post('sessions', {
            email,
            password,
        })

        const {
            token,
            user,
        }: { token: string; user: iUser & iExtraUserFields } = response.data
        delete user.created_at
        delete user.updated_at

        localStorage.setItem('@EstoqueLEM:token', token)
        localStorage.setItem('@EstoqueLEM:user', JSON.stringify(user))

        api.defaults.headers.authorization = `Bearer ${token}`

        setAuthData({ token, user })
    }

    function signOut() {
        localStorage.removeItem('@EstoqueLEM:token')
        localStorage.removeItem('@EstoqueLEM:user')

        setAuthData({} as iAuthState)
    }

    const { user } = authData

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
