export default function (req, res, next) {

    const {role} = req.user
    if(role !== 'ADMIN') return res.status(401).json('unauthorized')
    return next()

}