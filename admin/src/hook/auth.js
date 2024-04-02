import { useContext, useState } from "react";
import { context } from "../context/auth";
import axios from "axios";

export function useLoadAuthSession() {
    const { loadSession } = useContext(context)
    return loadSession
}

export function useAuthSession() {
    const { authSession } = useContext(context)
    return authSession
}

export function useLogin() {

    const { setSession } = useContext(context)
    const [error, setError] = useState(null)

    const login = async (email, password) => {
        try {
            setError(null)
            const response = await axios.post('/auth/login', { email, password })
            const user = response.data
            setSession(user)

        } catch (error) {
            setError(error.response.data)
        }
    }

    return { login, error }

}

export function useLogout() {
    const { clearSession } = useContext(context)
    return () => {
        clearSession()
    }
}

