import jwt from 'jsonwebtoken'
export default function (req, res, next) {

    try {
        const token = req.headers['authorization']?.split(' ')[1]

        if (!token) return res.status(401).json("unauthorized")

        const user = jwt.verify(token, process.env.JWT_SECRET)

        if (!user) return res.status(401).json("unauthorized")
        
        req.user = user
        
        return next()

    } catch (error) {
        return res.status(401).json("unauthorized")
    }



}