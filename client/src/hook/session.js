export function useSession() {

    const sessionFlash = (name, value) => {
        sessionStorage.setItem(name,value)
    }

    const sessionHasMessage = (name) => {
        return sessionStorage.getItem(name)
    }

    const flushSession = () => {
        sessionStorage.clear()
    }
    return { sessionFlash, sessionHasMessage, flushSession }

}

