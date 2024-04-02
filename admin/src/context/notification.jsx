import { createContext, useState } from "react";

const initialState = []
export const context = createContext(initialState)

export default function ({ children }) {

    const [notification, setNotification] = useState(initialState)

    return <context.Provider value={{ notification, setNotification }}>
        {children}
    </context.Provider>

}