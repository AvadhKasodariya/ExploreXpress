import bcrypt from 'bcrypt'
import userModel from '../model/Users.js'
import jwt from 'jsonwebtoken'

export default class {
    static async login(req, res) {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) return res.status(401).json('invalid email or password')

        const matched = bcrypt.compareSync(password, user.password)

        if (!matched) return res.status(401).json('invalid email or password')

        const { password: _, ...rest } = user.toObject()
        const token = jwt.sign(rest, process.env.JWT_SECRET)

        return res.json({ user: rest, status: 'authenticated', token })

    }
    static async register(req, res) {
        const { fname, lname, email, password, phone } = req.body
        const user = await userModel.findOne({ email })
        if (user) return res.status(401).json('user already exists')
        const hash = bcrypt.hashSync(password,10)
        
        await userModel.create({
            fname,
            lname,
            email,
            phone,
            password:hash
        })

        return res.json('account created')

    }
}


