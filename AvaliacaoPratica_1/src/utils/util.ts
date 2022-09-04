export const generateCodeNumber = () => {
    const number = Math.floor(Math.random() * (99999 - 10000) + 10000)
    return number
}