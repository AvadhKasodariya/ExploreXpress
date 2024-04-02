import Joi from "joi"

export function loginValidation(req, res, next) {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(401).json(error.details[0].message.replace(/"/g,''))
    }

    next()
}