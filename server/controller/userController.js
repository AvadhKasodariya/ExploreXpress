import User from '../model/Users.js'

export default class {
    static async getUsers(req, res) {
        const hotels = await User.find()
        res.json(hotels)
    }
    static async removeUser(req, res) {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) return res.status(404).json("User not found");
        user.deleteOne()
        res.json("record deleted")
    }

}