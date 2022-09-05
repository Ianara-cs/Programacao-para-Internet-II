import jwt from 'jsonwebtoken'

type JwtPayload = {
    id: string
    email: string
}

export const generateRefreshToken = async (userId: string) => {
    const token = jwt.sign({id: userId}, process.env.JWT_PASSWORD, {
        expiresIn: '30d'
    })

    return token
}

export const generateToken = async (payload: object, expiresIn: string | number) => {
    return jwt.sign(payload, process.env.JWT_PASSWORD, {expiresIn})
}

export const verifyToken = async (token: string) => {
    try {
        const {id: user_id, email: user_email} = jwt.verify(token, process.env.JWT_PASSWORD) as JwtPayload
        return { payload: {user_id, user_email}, expired: false}
        
    } catch {
        return {paylaod: null, expired: true}
    }
}
