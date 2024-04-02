import axios from "axios";
import { createContext, useState } from "react";

const initialState = {
    user: null,
    status: 'loading'
}
export const context = createContext(initialState)

export default function ({ children }) {

    const [authSession, setAuthSession] = useState(initialState)

    const loadSession = () => {
        let authSession = localStorage.getItem('auth-session')
        authSession = validateSession(authSession)
        if(authSession){
            setAuthSession(authSession)
            axios.defaults.headers.common = {'Authorization': `bearer ${authSession.token}`}
        } else setAuthSession({ user: null, status: 'unauthenticated' })
    }

    const clearSession = () => {
        setAuthSession({ user: null, status: 'unauthenticated' })
        localStorage.removeItem('auth-session')
    }

    const setSession = (session) => {
        setAuthSession(session)
        axios.defaults.headers.common = { 'Authorization': `bearer ${session.token}` }
        localStorage.setItem('auth-session', JSON.stringify(session))
    }

    return <context.Provider value={{ loadSession, clearSession, setSession, authSession }}>
        {children}
    </context.Provider>

}

function validateSession(session) {
    const authSession = JSON.parse(session)
    if (authSession && authSession.token != "") {
        return authSession
    }
    return null
}
