import jwt from 'jsonwebtoken'

export const generateRefreshToken = async (userId: string) => {
    const token = jwt.sign({id: userId}, process.env.JWT_PASSWORD, {
        expiresIn: '30d'
    })

    return token
}

export const generateAccessToken = async (userId: string) => {
    const token = jwt.sign({id: userId}, process.env.JWT_PASSWORD, {
        expiresIn: '1h'
    })

    return token
}

export const verifyToken = async (token: string) => {
    try {
        jwt.verify(token, process.env.JWT_PASSWORD)
        return true
        
    } catch {
        return false
    }
}
