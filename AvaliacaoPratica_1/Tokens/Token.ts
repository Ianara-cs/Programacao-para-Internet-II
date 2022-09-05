import jwt from 'jsonwebtoken'

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
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD)
        return { payload: decoded, expired: false}
        
    } catch {
        return {paylaod: null, expired: true}
    }
}
