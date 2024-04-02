import { useContext } from "react";
import { context } from "../context/notification";
import axios from "axios";

export function getNotification() {
    const { notification } = useContext(context)
    return notification
}


export function useNotification() {
    const { setNotification } = useContext(context)

    const fetchNotification = async () => {
        const repsonse = await axios.get('/notification')
        setNotification(repsonse.data)
    }
    const readNotification = () => {
        setNotification([])
    }
    const pushNotification = (notificationJSON) => {
        const notification = JSON.parse(notificationJSON)
        setNotification(prev => [...prev, notification])

        console.log(notification);
    }
    
    return { pushNotification, fetchNotification, readNotification }
}
