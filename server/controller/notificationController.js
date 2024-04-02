import {io} from '../server.js'
import Notification from '../model/Notification.js'

export default class {

    static async getNotifications(req, res) {
        const notifications = await Notification.find({ seen: false })
        res.json(notifications)
    }
    static async readNotifications(req, res) {
        const notifications = await Notification.updateMany({ seen: false }, { seen: true })
        res.json('notifications seen')
    }
    static async createNotifications(type, title, description) {
        const notification = await Notification.create({
            title,
            type,
            description
        })
        io.emit('notification', JSON.stringify(notification))
    }
}